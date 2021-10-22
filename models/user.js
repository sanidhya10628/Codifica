const moongose = require('mongoose');
const jwt = require('jsonwebtoken');
// Schema
const userSchema = moongose.Schema({

    // E-Mail
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    // Password
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    codeforcesHandle: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: false
    },
    country: {
        type: String,
        trim: true,
        required: false
    },
    city: {
        type: String,
        trim: true,
        required: false
    },
    college: {
        type: String,
        trim: true,
        required: false
    },
    dob: {
        type: Date,

        required: false
    },
    bio: {
        type: String,
        trim: true,
        required: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// RelationShip Between User and Editorial
userSchema.virtual('editorials', {
    ref: 'editorial',
    localField: '_id',
    foreignField: 'owner'
})

// userSchema.statics.findBy

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.jwtSecretKey);

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;

}

const User = moongose.model('User', userSchema);
module.exports = User;

// Some Points

// 1. Instance ke liye methods use karte hai