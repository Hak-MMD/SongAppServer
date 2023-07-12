const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide Username!'],
        maxLength: 10,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide Email!'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email!'
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide Password!'],
        minLength: 4,
    },
    // lastLogin: {
    //     type: Date,
    //     default: Date.now
    // },
    // followers: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'users'
    // }],
    // following: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'users'
    // }],
    // //role field we will implement in the next version
},
    { timestamps: true }
);

const UserModel = new mongoose.model('users', UserSchema);
module.exports = UserModel;