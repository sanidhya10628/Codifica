const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userModel = require('../models/user')
const editorialModel = require('../models/editorial')
const commentModel = require('../models/comment')

router.get('/user/editorial/:id/comment', auth, async (req, res) => {
    const editorialId = req.params.id;
    const { comment } = req.body;
    const newComment = await commentModel({
        editorialId: editorialId,
        userId: req.user.id,
        comment: comment
    })

    await newComment.save()

    res.send('working');
})




module.exports = router;
