const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const validator = require('validator');
const { send } = require('../emails/forgotPassword')

// GET Route for Forgot Password
router.get('/forgot-password', (req, res) => {
    res.status(200).json({
        status: 'OK',
        msg: 'Welcome to the Forgot Password Page'
    })
})


// POST Route for Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        let { email } = req.body;

        // Validations
        // 1. Trim
        email = validator.trim(email)

        if (!validator.isEmail(email)) {
            return res.json({
                status: 'ERROR',
                msg: "Please enter a valid Email"
            })
        }

        // Make sure user exists in the database or not
        const currUser = await userModel.findOne({ email });
        if (currUser === null) {
            return res.json({
                status: 'ERROR',
                msg: 'Email does not exist in the database!..'
            })
        }

        // User exists and now create a One Time Link valid for 15 minutes
        const secret = process.env.jwtSecretKey + currUser.password;
        const payload = {
            email: currUser.email,
            id: currUser.id
        }

        const token = jwt.sign(payload, secret, { expiresIn: '15m' })

        const link = `${process.env.REACT_FRONT_END_URL}/reset-password/${currUser.id}/${token}`;
        // console.log(link);

        // Send Email with the link
        const sendEmailResponse = await send(email, link);
        if (sendEmailResponse.status === 'OK') {
            return res.status(200).json({
                status: 'OK',
                msg: 'Reset link has been sent to your email'
            })
        }
        return res.json({
            status: 'ERROR',
            msg: 'Something went wrong. Please try again'
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: 'ERROR',
            msg: 'Something went wrong. Please try again'
        })
    }
})



// Router for Reset Password
router.get('/reset-password/:id/:token', async (req, res) => {
    try {
        const { id, token } = req.params;

        // Check if this ID exits in the database
        const currUser = await userModel.findById({ _id: id });
        if (currUser === null) {
            return res.json({
                status: 'INVALID_CREDENTIALS',
                msg: 'Invalid Link'
            })
        }

        // We have a valid id, and we have a valid user with this id
        const secret = process.env.jwtSecretKey + currUser.password;
        const payload = jwt.verify(token, secret)

        res.status(200).json({
            status: 'OK',
            msg: 'VALID'
        })

    } catch (error) {
        // console.log(error);
        res.json({
            status: 'ERROR',
            msg: `${error.message}`
        })
    }
})


// Router for POST Reset Password
router.post('/reset-password', async (req, res) => {
    try {
        const { password, id, token } = req.body;

        // Check if this ID exits in the database
        const currUser = await userModel.findById({ _id: id });
        if (currUser === null) {
            return res.json({
                status: 'ERROR',
                msg: 'Invalid Link'
            })
        }

        // We have a valid id, and we have a valid user with this id
        const secret = process.env.jwtSecretKey + currUser.password;
        const payload = jwt.verify(token, secret)

        // Hash the Password
        const encryptedPassword = await bcryptjs.hash(password, 12);
        const userPaswordUpdate = await userModel.findByIdAndUpdate({ _id: payload.id }, {
            password: encryptedPassword
        })

        return res.json({
            status: 'OK',
            msg: 'Password updated succesfully!...'
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 'ERROR',
            msg: `${error.message}`
        })
    }
})

//Router for to check that ID exists in the database or not
router.post('/checkValidId', async (req, res) => {
    try {
        const { id, token } = req.body;
        // Check if this ID exits in the database
        const currUser = await userModel.findById({ _id: id });
        if (currUser === null) {
            return res.json({
                status: 'ERROR',
                msg: 'Invalid Link'
            })
        }

        // We have a valid id, and we have a valid user with this id
        const secret = process.env.jwtSecretKey + currUser.password;
        const payload = jwt.verify(token, secret)


        res.status(200).json({
            status: 'OK',
            msg: 'VALID'
        })
    } catch (error) {
        // console.log(error);
        res.json({
            status: 'ERROR',
            msg: `${error.message}`
        })
    }
})

module.exports = router;
