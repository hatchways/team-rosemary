const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}));

exports.User = User;
