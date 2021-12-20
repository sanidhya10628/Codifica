const express = require('express');
const validator = require('validator');
const router = express.Router();
const userModel = require('../models/user')
const auth = require('../middleware/auth')
const editorialModel = require('../models/editorial')
const moment = require('moment')

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
            programmingLanguage,
            index } = req.body;

        //Validations
        // 1. Check Problem Link is valid or not
        if (!validator.isURL(problemLink)) {
            return res.json({
                status: 'INVALID_DATA',
                msg: "Problem Link Is Invalid!"
            })
        }

        // 2. Lower Case of difficultyLevel
        // difficultyLevel = validator.toLowerCase();

        // 3. Trim

        programmingLanguage = validator.trim(programmingLanguage)
        editorialDesc = validator.trim(editorialDesc)
        editorialCode = validator.trim(editorialCode)
        name = validator.trim(name)
        const updatedProblemTage = problemTags.map((tag) => {
            return validator.trim(tag)
        })

        problemTags = updatedProblemTage

        // find the cfHnadle of user

        const date = moment().format('ll')
        const newEditorial = await editorialModel({
            problemLink: problemLink,
            title: name,
            contestId: contestId,
            problemTags: problemTags,
            difficultyLevel: difficultyLevel,
            editorialDesc: editorialDesc,
            editorialCode: editorialCode,
            programmingLanguage: programmingLanguage,
            date: date,
            owner: req.user.id,
            cFHandle: req.user.codeforcesHandle,
            index: index
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
        const id = req.body.id
        const editorial = await editorialModel.findByIdAndDelete({ _id: id }) // id required
        res.json({
            status: 'OK',
            msg: "Editorial Deleted Successfully"
        });
    }
    catch (error) {
        console.log(error)
        res.json({
            status: 'ERROR',
            msg: "Something Went Wrong"
        })
    }
})


/* Update Route For Editorial*/
router.patch('/user/write/editorial', auth, async (req, res) => {
    try {
        const { id, editorialDesc, editorialCode } = req.body;
        const editorial = await editorialModel.findByIdAndUpdate({ _id: id }, { editorialDesc: editorialDesc, editorialCode: editorialCode })
        res.json({
            status: 'OK',
            msg: 'Editorial Updated Sucessfully.',
            editorial
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            status: 'ERROR',
            msg: 'Something Went Wrong'
        })
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