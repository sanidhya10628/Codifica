const express = require('express');
const validator = require('validator');
const router = express.Router();
const auth = require('../middleware/auth')
const userModel = require('../models/user')

router.get('/profile', auth, async (req, res) => {

    res.send(req.user);
})


module.exports = router;