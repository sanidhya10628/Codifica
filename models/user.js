const moongose = require('mongoose');
const jwt = require('jsonwebtoken');
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
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'codifica');

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;

}

const User = moongose.model('User', userSchema);
module.exports = User;