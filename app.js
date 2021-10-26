require('dotenv').config()

// NPM Dependencies
const express = require('express');
const app = express();
const path = require('path');

// Other Dependencies
const indexPageRoute = require('./routes/index');
const loginPageRoute = require('./routes/login');
const signUpPageRoute = require('./routes/signup')
const profilePageRoute = require('./routes/profile')
const userEditorial = require('./routes/myEditorials')
const writeEditorial = require('./routes/writeEditorial')
const commentPageRoute = require('./routes/comment')

// Database connection
require('./db/mongoose')


// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/', indexPageRoute); // for displaying Home Page
app.use('/', loginPageRoute); // for displaying Login
app.use('/', signUpPageRoute); // for displaying Sign Up
app.use('/', profilePageRoute); // for displaying Profile Up
app.use('/', userEditorial); // for displaying User Editorials
app.use('/', writeEditorial); // for Writing Editorials
app.use('/', commentPageRoute); // for Writing Comment for Editorials



/* Mitul Code */
// cors headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
// cors headers


//ON PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`On Port ${PORT}`);
})


