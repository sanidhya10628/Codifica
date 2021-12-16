
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
// GET Request
router.get('/login', (req, res) => {
    res.send("Login Page");
    // res.send("Welcome to the login page");
})


// POST Request
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const currUserLogin = await userModel.findOne({ email });
        if (!currUserLogin) {
            res.json({ "msg": "Details not found" });
        }
        else {
            const isValidPassword = await bcryptjs.compare(password, currUserLogin.password);
            if (isValidPassword) {
                const token = await currUserLogin.generateAuthToken();
                res.json(currUserLogin);
                //res.send({ currUserLogin, token })
                // res.redirect('profile')
                // Here redirect is to be added 
                // res.redirect();
            }
            else {
                res.json({ "msg": "Invalid password" });
            }
        }
    }

    catch (e) {
        // console.log(e)
        res.json({ "msg": "Error" })
    }

})


// POST Request To Logout
router.post('/logout', async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
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