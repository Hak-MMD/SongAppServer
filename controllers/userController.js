const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const BadRequestError = require('../errors/Bad_request');
const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('test');
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all values" });
        }
        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: 'User already exist! Email and username must be unique!' });
        }

        const userexist = await UserModel.findOne({ username });

        if (userexist) {
            return res.status(400).json({ message: 'User already exist! Username must be unique!' });
        }



        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ username, email, password: hashedPassword });
        console.log(user.id);
        if (user) {
            res.status(201).json({
                message: "Registred in! Redirecting...",
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        }

    } catch (error) {
        return res.status(500).json({ message: `Error Register: ${error}` });
    }



};
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all values" });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials!" });
    };
    if (user && isMatch) {
        res.status(201).json({
            message: "Logged in! Redirecting...",
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    }

};

const myAccount = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findById(id);
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Error myAccount: ${error}` });
    }
};
//Mykola functionality of this route is not completed now, because auth middleware is not created yet
const whoAmI = async (req, res) => {
    const { _id, username, email } = await UserModel.findById(req.user.id)


    res.status(200).json({
        message: "My account!",
        _id: _id,
        username,
        email,
    });
};

const generateToken = (id) => {
    console.log('genToken:' + id);
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


module.exports = {
    register,
    login,
    myAccount,
    whoAmI,
};