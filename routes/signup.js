const axios = require('axios');
const bcryptjs = require('bcryptjs');
const express = require('express');
const validator = require('validator');
const router = express.Router();

const userModel = require('../models/user')

// GET Request
router.get('/signup', (req, res) => {

    res.send("Sign Up page");

})

// POST Request
router.post('/signup', async (req, res) => {
    try {
        const { email, password, codeforcesHandle } = req.body;

        // Validators
        if (!validator.isEmail(email)) {
            throw new Error("Invalid Email")
        }

        const isUserEmail = await userModel.findOne({ email: email })
        if (isUserEmail) {
            throw new Error("Email already exist");
        }


        const handleVerifyURL = `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`;

        //Password Validation will add later


        // CodeForces Handle Validation
        let ishandleValid = await axios.get(handleVerifyURL);

        ishandleValid = JSON.stringify(ishandleValid.data);
        if (ishandleValid) {
            const encryptedPassword = await bcryptjs.hash(password, 12);
            if (encryptedPassword && !isUserEmail) {
                const newUser = await new userModel({
                    email: email,
                    password: encryptedPassword,
                    codeforcesHandle: codeforcesHandle
                })
                await newUser.save();
                const token = await newUser.generateAuthToken();

                res.redirect('profile')
                //res.send({ newUser, token })
            }
            else {
                res.json({ "msg": "wait" });
            }


        }
        else {
            res.json({ "msg": "Invalid Codeforces Handle" });
        }


    }

    catch (e) {
        console.log(e);
        res.status(400).json({ "msg": "something went wrong" })
    }

})

module.exports = router;