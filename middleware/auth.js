const jwt = require('jsonwebtoken');
const userModel = require('../models/user')
const cookieParser = require('cookie-parser');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'codifica');
        const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send("auth main hoon");
    }
}

module.exports = auth;