const axios = require('axios');
const bcryptjs = require('bcryptjs');
const express = require('express');
const validator = require('validator');
const router = express.Router();

// Email
const { sendWelcomeEmail } = require('../emails/account')

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
            return res.json({
                status: 'ERROR',
                msg: "Invalid Email"
            })
        }


        // For Strong Password
        if (!validator.isStrongPassword(password, {
            minLength: 6
        })) {
            return res.json({
                status: 'ERROR',
                msg: "Weak Password"
            })

        }

        // Avoid Duplicate
        const isUserEmail = await userModel.findOne({ email, codeforcesHandle })
        if (isUserEmail) {
            return res.json({
                status: 'ERROR',
                msg: "Email or CodeForces Handle already exist"
            })

        }


        const handleVerifyURL = `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`;
        // console.log(handleVerifyURL);


        // console.log(handleVerifyURL);

        // CodeForces Handle Validation
        const { data } = await axios.get(handleVerifyURL);
        const ishandleValid = data

        if (ishandleValid['status'] === 'FAILED') {
            return res.json({
                status: 'ERROR',
                msg: `User with handle ${codeforcesHandle} not found`
            })
        }

        if (ishandleValid['status'] === 'OK') {
            const encryptedPassword = await bcryptjs.hash(password, 12);
            if (encryptedPassword && !isUserEmail) {


                const newUser = await new userModel({
                    email: email,
                    password: encryptedPassword,
                    codeforcesHandle: codeforcesHandle,


                })
                await newUser.save();

                // Email Send
                // sendWelcomeEmail(newUser.email, newUser.codeforcesHandle)

                const token = await newUser.generateAuthToken();

                res.status(201).json({
                    status: 'OK',
                    newUser,
                    token
                })
                //res.send({ newUser, token })
            }
            else {
                return res.json({
                    status: 'ERROR',
                    msg: "Something Went Wrong. Please try again"
                })

            }


        }
        else {
            return res.json({
                status: 'ERROR',
                msg: `User with handle ${codeforcesHandle} not found `
            })

        }


    }

    catch (e) {
        // console.log(e);

    }

})

module.exports = router;