const express = require('express');
const validator = require('validator');
const router = express.Router();
const userModel = require('../models/user')
const auth = require('../middleware/auth')
const editorialModel = require('../models/editorial')


router.get('/user/write/editorial', (req, res) => {
    res.send("Write Page");
})

router.post('/user/write/editorial', auth, async (req, res) => {

    try {
        let { problemLink, name, contestId, problemTags, difficultyLevel, editorialDesc, editorialCode } = req.body;

        //Validations
        // 1. Check Problem Link is valid or not
        if (!validator.isURL(problemLink)) {
            throw new Error("Problem Link Is Invalid!");
        }

        // 2. Lower Case of difficultyLevel
        difficultyLevel = difficultyLevel.toLowerCase();
        const newEditorial = await editorialModel({
            problemLink: problemLink,
            title: name,
            contestId: contestId,
            problemTags: problemTags,
            difficultyLevel: difficultyLevel,
            editorialDesc: editorialDesc,
            editorialCode: editorialCode,
            date: new Date(),
            owner: req.user.id

        })

        await newEditorial.save();
        res.json(newEditorial)
    }
    catch (e) {
        console.log(e)
        res.send("error");
    }

})


/* DELETE request for editorial */
router.delete('/user/write/editorial', async (req, res) => {
    try {
        const id = req.body._id
        const editorial = await editorialModel.findByIdAndDelete(id) // id required
        console.log('Success')
        // res.redirect('/')
    }
    catch (error) {
        res.send('Error in deleting the editorial')
        console.log(error)
    }
})

module.exports = router;



/*
{
  problemLink,
  contestId,
  problemTags,
  editorialDesc,
  editorialCode
  creatorId
}
*/