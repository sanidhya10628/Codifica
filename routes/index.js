const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        msg: 'Welcome to the Server'
    })
})




module.exports = router;
