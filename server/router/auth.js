const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate.js')

require('../db/conn');
const User = require('../modal/userSchema');

router.get('/', (req, res) => {
    res.send('this is home from router')
});

router.post('/register', async (req, res) => {
    // console.log(req.body);
    // res.json({ message: req.body })
    const { name, email, phone, work, password, cpassword } = req.body
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: 'please fill all the feild' })
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: 'Email already exist' })
        } else if (password != cpassword) {
            return res.status(422).json({ error: 'password not matched' })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: 'user register successfuly' })
        }

    } catch (err) {
        console.log(err);
    }
});

// login router

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email, !password) {
            return res.status(400).json({ error: 'please fill email and password' })
        }

        // const userLogin = await User.findOne({ email: email, password: password, cpassword: cpassword });
        const userLogin = await User.findOne({ email: email });

        //is password match or not
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            //token jwt
            const token = await userLogin.generateAuthToken();
            // console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                return res.status(400).json({ message: 'user password error' });
            } else {
                res.json({ message: 'user signin successfuly' });
                console.log(userLogin);
            }
        } else {
            return res.status(400).json({ message: 'user email error' });
        }

    } catch (err) {
        console.log(err);
    }
});

router.get('/about', authenticate, (req, res) => {
    // console.log(`Hello from About`);
    res.send(req.rootUser)
});

router.get('/getdata', authenticate, (req, res) => {
    // console.log('hello contact');
    res.send(req.rootUser);
})

router.post('/contact', authenticate, async (req, res) => {
    const { name, email, phone, message } = req.body
    try {
        if (!name || !email || !phone || !message) {
            console.log('error in contact form');
            return res.json({ message: 'please fill the contact form correctly' })
        }
    } catch (error) {
        console.log(error);
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
        const userMessage = await userContact.addMessage(name, email, phone, message)

        await userContact.save();

        res.status(201).json({ message: 'user send message successfully' })
    }

});

router.get('/logout', (req, res) => {
    // console.log('user logout');
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).json({ message: 'user log out successfully' })
});

module.exports = router;