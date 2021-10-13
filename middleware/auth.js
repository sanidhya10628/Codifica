const auth = async (req, res, next) => {
    console.log("In middleware");
    next();
}

module.exports = auth;