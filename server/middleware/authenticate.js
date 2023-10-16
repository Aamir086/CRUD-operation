const jwt = require('jsonwebtoken');
const User = require('../modal/userSchema');

const Authenticate = async (req, res, next) => {
    try {
        // console.log('test',req);
        const token = req.cookies.jwtoken;

        // if (!token) {
        //     return res.status(401).json({ error: 'Authentication failed' });
        // }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const rootUser = await User.findOne({ _id: verifyToken._id, 'tokens.token': token });

        if(!rootUser){
            throw new Error('User not found')
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send('Unauthorized: No token provided')
        console.log(error);
    }
}

module.exports = Authenticate;