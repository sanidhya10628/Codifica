const express = require('express');
const validator = require('validator');
const router = express.Router();

const userModel = require('../models/user')

// GET Request
router.get('/signup', (req, res) => {
    res.send("Welcome to the Sign Up page");
})

// POST Request
router.post('/signup', (req, res) => {
    console.log(req.body)
    const { email, password, codeforcesHandle } = req.body;
    console.log(email)
    // Validators
    //"sanidhya10628@gmail.com"
    // console.log(validator.isEmail(email));
    res.send("working");
    // try {

    //     const isEmailValid
    // }

    // catch (error) {
    //     res.send(error);
    // }
})

module.exports = router;