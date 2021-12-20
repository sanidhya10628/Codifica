const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentModel = require('../models/comment')
const validator = require('validator')
const moment = require('moment')

router.post('/user/editorial/:id/comment', auth, async (req, res) => {
    try {
        const editorialId = req.params.id;
        let { comment } = req.body;

        // Validations
        // 1.
        comment = validator.trim(comment)

        const date = moment().format('ll')
        const newComment = await commentModel({
            editorialId: editorialId,
            userId: req.user.id,
            comment: comment,
            date: date
        })

        await newComment.save()
        res.status(201).json({
            status: 'OK',
            msg: 'Successfully Commented'
        })

    }
    catch (e) {
        console.log(e);
        res.json({
            status: 'ERROR',
            msg: 'Something Went Wrong. Try again'
        })
    }

})




module.exports = router;
