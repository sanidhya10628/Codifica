const jwt = require('jsonwebtoken');
const userModel = require('../models/user')
const cookieParser = require('cookie-parser');

const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        // const decoded = jwt.verify(token, 'codifica');
        // const user = await userModel.findOne({ _id: decoded._id, 'tokens.token': token });


        // for demo purpose
        const user = await userModel.findOne({ email: "sanidhya10628@gmail.com" });
        if (!user) {
            throw new Error("User Doest Not Exist");
        }
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send("auth main hoon");
    }
}

module.exports = auth;