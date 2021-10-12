const { default: axios } = require('axios');
const bcryptjs = require('bcryptjs');
const express = require('express');
const validator = require('validator');
const router = express.Router();

const userModel = require('../models/user')

// GET Request
router.get('/signup', (req, res) => {
    res.send("Welcome to the Sign Up page");
})

// POST Request
router.post('/signup', async (req, res) => {
    const { email, password, codeforcesHandle } = req.body;

    // Validators
    // validator.isEmail(email);
    const isUserEmail = await userModel.findOne({ email: email })
    // const handleVerifyURL = `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`;


    //Password Validation will add later


    // CodeForces Handle Validation
    // let ishandleValid = await axios.get(handleVerifyURL);

    // ishandleValid = JSON.stringify(ishandleValid.data);
    if (true) {
        const encryptedPassword = await bcryptjs.hash(password, 12);
        if (encryptedPassword && !isUserEmail) {
            const newUser = await new userModel({
                email: email,
                password: encryptedPassword,
                codeforcesHandle: codeforcesHandle
            })
            await newUser.save();
            res.send("hi")
        }
        else {
            res.json({ "msg": "Something Went Wrong!.." });
        }


    }
    else {
        res.json({ "msg": "Invalid Codeforces Handle" });
    }


})

module.exports = router;