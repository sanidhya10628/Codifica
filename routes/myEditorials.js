const express = require('express');
const validator = require('validator');
const router = express.Router();
const userModel = require('../models/user')


router.get('/user/editorials', (req, res) => {

    res.send("working")

})



module.exports = router;