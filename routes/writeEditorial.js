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
        let { problemLink,
            name,
            contestId,
            problemTags,
            difficultyLevel,
            editorialDesc,
            editorialCode,
            programmingLanguage, } = req.body;

        //Validations
        // 1. Check Problem Link is valid or not
        if (!validator.isURL(problemLink)) {
            return res.json({
                status: 'INVALID_DATA',
                msg: "Problem Link Is Invalid!"
            })
        }

        // 2. Lower Case of difficultyLevel
        difficultyLevel = difficultyLevel.toLowerCase();

        // 3. Trim

        programmingLanguage = validator.trim(programmingLanguage)
        editorialDesc = validator.trim(editorialDesc)
        editorialCode = validator.trim(editorialCode)
        name = validator.trim(name)
        const updatedProblemTage = problemTags.map((tag) => {
            return validator.trim(tag)
        })

        problemTags = updatedProblemTage

        const newEditorial = await editorialModel({
            problemLink: problemLink,
            title: name,
            contestId: contestId,
            problemTags: problemTags,
            difficultyLevel: difficultyLevel,
            editorialDesc: editorialDesc,
            editorialCode: editorialCode,
            programmingLanguage: programmingLanguage,
            date: new Date(),
            owner: req.user.id

        })

        await newEditorial.save();
        res.status(201).json({
            status: 'OK',
            msg: 'success'
        })
    }
    catch (e) {
        console.log(e)
        res.json({
            status: 'ERROR',
            msg: 'Something Went Wrong. Please try again'
        })
    }

})


/* DELETE request for editorial */
router.delete('/user/write/editorial', auth, async (req, res) => {
    try {
        const id = req.body._id
        const editorial = await editorialModel.findByIdAndDelete(id) // id required
        res.status(200).json({ "msg": "Editorial Deleted Successfully" });
    }
    catch (error) {
        console.log(error)
        res.send('Error in deleting the editorial')
    }
})


/* Update Route For Editorial*/
router.patch('/user/write/editorial', auth, async (req, res) => {
    try {
        const { _id, title, editorialDesc, editorialCode } = req.body;
        const editorial = await editorialModel.findByIdAndUpdate({ _id: _id }, { title: title, editorialDesc: editorialDesc, editorialCode: editorialCode })
        res.status(200).json(editorial);
    }
    catch (e) {
        console.log(e);
        res.send("error");
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