const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser())

dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(express.json());
// const User = require('./modal/userSchema');

app.use(require('./router/auth'));

const port = process.env.PORT || 5000

app.get('/login', (req, res) => {
    res.send(`Hello login from server`)
});

app.get('/signup', (req, res) => {
    res.send(`Hello signup from server`)
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})