const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // console.log('token ', token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
            let user = await UserModel.findById(decoded.id).select('-password');
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized!" });
        }

    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token!" });
    }
};

module.exports = { protect };