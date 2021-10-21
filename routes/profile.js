const express = require('express');
const validator = require('validator');
const router = express.Router();
const userModel = require('../models/user')
const auth = require('../middleware/auth')


// For User Profile Page
router.get('/user/profile', auth, async (req, res) => {
    res.status(200).json(req.user)
})


// Settings Page
router.get('/user/settings', auth, (req, res) => {
    res.send("Settings Page");
})

router.post('/user/settings', auth, async (req, res) => {
    try {
        const { name, country, city, college, dob, bio } = req.body
        const updatedUser = await userModel.updateOne({ email: req.user.email }, { name: name, city: city, country: country, college: college, dob: dob, bio: bio });
        res.status(201).json({ "msg": "Updated SuccessFully" });
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Try Again")
    }
})


module.exports = router;