const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userModel = require('../models/user')
const editorialModel = require('../models/editorial')
const commentModel = require('../models/comment')

router.post('/user/editorial/:id/comment', auth, async (req, res) => {
    try {
        const editorialId = req.params.id;
        const { comment } = req.body;
        const newComment = await commentModel({
            editorialId: editorialId,
            userId: req.user.id,
            comment: comment
        })

        await newComment.save()
        res.redirect('/');


    }
    catch (e) {
        console.log(e);
        res.send("Error occured");
    }

})




module.exports = router;
