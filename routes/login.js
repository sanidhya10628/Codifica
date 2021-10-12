const { Router } = require('express');
const express = require('express');
const router = express.Router();

const userModel = require('../models/user')

// GET Request
router.get('/login', (req, res) => {
    res.send("Welcome to the login page");
})


// POST Request
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const cuurUserLogin = await userModel.findOne({ email });
        if (!cuurUserLogin) {
            res.json({ "msg": "Details not found" });
        }

    }

    catch (e) {

        res.send("Error");
    }

})




module.exports = router;