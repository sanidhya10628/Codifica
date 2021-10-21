const moongose = require('mongoose');

// Schema
const editorialSchema = moongose.Schema({
    problemLink: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contestId: {
        type: String,
        required: true
    },
    problemTags: [{
        type: String,
        required: true
    }],
    difficultyLevel: {
        type: Number,
        required: true
    },
    editorialCode: {
        type: String,
        required: true
    },
    editorialDesc: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    owner: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const editorial = moongose.model('editorial', editorialSchema);
module.exports = editorial;