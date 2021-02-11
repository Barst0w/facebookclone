require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require("path");
const app = express();

const landingPageRoute = require('./routes/landingPage')
const signupPageRoute = require('./routes/signupPage')

const mongoDb = `mongodb+srv://admin:${process.env.PASS}@facebook.atwmd.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(session({ secret: `${process.env.SECRET}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use('/', landingPageRoute)
app.use('/', signupPageRoute)

app.listen(3000).on('error', (err) => {
    console.log(err)
});