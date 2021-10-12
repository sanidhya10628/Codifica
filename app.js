// NPM Dependencies
const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const validatorJs = require('validator.js');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');


// Other Dependencies
// const indexPageRoute = require('./routes/index');
const loginPageRoute = require('./routes/login');

// Database connection
mongoose.connect('mongodb://localhost:27017/Codifica', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection is on!....")
}).catch(err => {
    console.log("Error");
    console.log(err);
});




// Body Parser
app.use(express.urlencoded({ extended: true }))


// app.use('/', indexPageRoute); // for displaying Home Page
app.use('/', loginPageRoute); // for displaying Login



//ON PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`On Port ${PORT}`);
})



