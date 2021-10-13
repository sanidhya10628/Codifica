const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const userModel = require('../models/user')

// GET Request
router.get('/login', (req, res) => {
    res.send("Welcome to the login page");
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
                res.json({ "msg": "Login In Successfully!.." })
                // Here redirect is to be added 
                // res.redirect();
            }
            else {
                res.json({ "msg": "Invalid password" });
            }
        }
    }

    catch (e) {

        res.json({ "msg": "Error" })
    }

})




module.exports = router;