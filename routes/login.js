
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const validator = require('validator')
const auth = require('../middleware/auth')

// GET Request
router.get('/login', (req, res) => {
    res.send("Login Page");
    // res.send("Welcome to the login page");
})


// POST Request
router.post('/login', async (req, res) => {

    try {
        let { email, password } = req.body;

        // Validations
        // 1. Trim
        email = validator.trim(email)
        password = validator.trim(password)

        if (!validator.isEmail(email)) {
            return res.json({
                status: 'INVALID_CREDENTIALS',
                msg: "Please enter a valid Email"
            })
        }

        const currUserLogin = await userModel.findOne({ email });
        if (currUserLogin === null) {
            return res.json({
                status: 'INVALID_CREDENTIALS',
                msg: 'Invalid Email or Password'
            })
        }

        const isValidPassword = await bcryptjs.compare(password, currUserLogin.password);
        if (isValidPassword) {
            const token = await currUserLogin.generateAuthToken();
            return res.json({
                status: 'OK',
                msg: 'USER_FOUND',
                token,
                user: {
                    email: currUserLogin.email,
                    codeforcesHandle: currUserLogin.codeforcesHandle
                }
            })
        }

        return res.json({
            status: 'INVALID_CREDENTIALS',
            msg: 'Invalid Email or Password'
        })

    }

    catch (e) {
        console.log(e)
        res.json({
            status: 'SERVER_ERROR',
            msg: 'Something Went Wrong. Please try again'
        })
    }

})


// POST Request To Logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save();
        return res.status(200).json({
            status: 'OK',
            msg: 'LOGOUT_SUCCESSFUL'
        })
    }
    catch (e) {
        res.json({
            status: 'SERVER_ERROR',
            msg: 'Something Went Wrong. Please try again'
        });
    }
})



// GET Request to Check User is Already loggedIn or Not
router.get('/isLoggedIn', async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.json({
                status: 'OK',
                isLoggedIn: false
            })
        }
        const decoded = jwt.verify(token, process.env.jwtSecretKey);
        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            return res.json({
                status: 'ERROR',
                isLoggedIn: false
            })
        }
        // console.log(decoded);
        return res.json({
            status: 'OK', isLoggedIn: true, user: {
                email: user.email,
                codeforcesHandle: user.codeforcesHandle
            }
        })

    } catch (e) {
        // console.log(e);
        return res.json({ status: 'ERROR', isLoggedIn: false })
    }
})


module.exports = router;