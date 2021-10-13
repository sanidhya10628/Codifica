const moongose = require('mongoose');

// Schema
const userSchema = moongose.Schema({

    // E-Mail
    email: {
        type: String,
        required: true
    },

    // Password
    password: {
        type: String,
        required: true
    },
    codeforcesHandle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    college: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    bio: {
        type: String,
        required: false
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;