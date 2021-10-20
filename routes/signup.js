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
        let { email, password, codeforcesHandle } = req.body;

        email = validator.trim(email);
        password = validator.trim(password);
        // Validators
        if (!validator.isEmail(email)) {
            throw new Error("Invalid Email")
        }


        // For Strong Password
        if (!validator.isStrongPassword(password, {
            minLength: 6
        })) {
            throw new Error("Weak Password")
        }

        // Avoid Duplicate
        const isUserEmail = await userModel.findOne({ email, codeforcesHandle })
        if (isUserEmail) {
            throw new Error("Email or CodeForces Handle already exist");
        }


        const handleVerifyURL = `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`;




        // CodeForces Handle Validation
        let ishandleValid = await axios.get(handleVerifyURL);

        ishandleValid = JSON.stringify(ishandleValid.data);
        if (ishandleValid) {
            const encryptedPassword = await bcryptjs.hash(password, 12);
            if (encryptedPassword && !isUserEmail) {


                const newUser = await new userModel({
                    email: email,
                    password: encryptedPassword,
                    codeforcesHandle: codeforcesHandle,


                })
                await newUser.save();
                const token = await newUser.generateAuthToken();

                res.status(201).json(newUser)
                //res.send({ newUser, token })
            }
            else {
                res.json({ "msg": "wait" });
            }


        }
        else {
            res.json({ "msg": `User with handle ${codeforcesHandle} not found ` });
        }


    }

    catch (e) {
        // console.log(e);
        res.status(400).json({ "msg": "something went wrong" })
    }

})

module.exports = router;