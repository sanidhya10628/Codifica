const express = require('express');
const validator = require('validator');
const auth = require('../middleware/auth');
const router = express.Router();
const userModel = require('../models/user')
const editorialModel = require('../models/editorial')
const commentModel = require('../models/comment')

// Personal Editorial Page
router.get('/user/editorials', auth, async (req, res) => {

    try {
        const myEditorials = await editorialModel.find({ owner: req.user._id });
        res.status(200).json(myEditorials);

    }
    catch (e) {
        console.log(e);
        res.send("Something Went Wrong")
    }
})



// To See a particular Editorial
router.get('/user/editorial/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const editorial = await editorialModel.findById({ _id: id });
        const comments = await commentModel.find({ editorialId: id })
        res.status(200).json({ editorial, comments });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ "msg": "Something Went Wrong. Try again" })
    }
})

// Public editorial Page
router.get('/editorials', async (req, res) => {
    try {
        const allEditorials = await editorialModel.find({})
        res.status(200).json(allEditorials)
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ "msg": "Something Went Wrong. Try again" })
    }
})


module.exports = router;