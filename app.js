require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require("path");
const Schema = mongoose.Schema;
const app = express();

const landingPageRoute = require('./routes/landingPage')
const signupPageRoute = require('./routes/signupPage')

const mongoDb = `mongodb+srv://admin:${process.env.PASS}@facebook.atwmd.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use(landingPageRoute.set_currentUser)

app.use('/', landingPageRoute.get_landingPage)
app.use('/', signupPageRoute.get_signupPage)

app.post('/signup', signupPageRoute.post_signup)
app.post('/login', landingPageRoute.post_login)
app.post('/createpost', landingPageRoute.post_createpost)
app.post('/createcomment', landingPageRoute.post_createcomment)


app.listen(3000, () => console.log("app listening on port 3000!"));