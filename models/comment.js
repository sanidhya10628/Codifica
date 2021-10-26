const moongose = require('mongoose');

const commentSchema = moongose.Schema({
    editorialId: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'editorial'
    },
    userId: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    }
})

const comment = moongose.model('comment', commentSchema)
module.exports = comment;