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
    programmingLanguage: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true
    },
    owner: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cFHandle: {
        type: String,
        required: true
    }
})

editorialSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'editorialId'
})

const editorial = moongose.model('editorial', editorialSchema);
module.exports = editorial;