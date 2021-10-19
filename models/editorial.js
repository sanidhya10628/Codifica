const moongose = require('mongoose');

// Schema
const editorialSchema = moongose.Schema({
    email: {
        type: String,
        required: true
    },
    questionLink: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    code: {
        type: String,
        required: true
    },
    codeExplaination: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
})

const editorial = moongose.model('editorial', editorialSchema);
module.exports = editorial;