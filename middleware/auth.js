const jwt = require('jsonwebtoken');
const userModel = require('../models/user')
const cookieParser = require('cookie-parser');

const auth = async (req, res, next) => {
    console.log("hi")
    try {
        const token = req.cookies.jwt;
        console.log(token)
        const decoded = jwt.verify(token, 'codifica');
        console.log(decoded)
        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send(e)
    }
}

module.exports = auth;