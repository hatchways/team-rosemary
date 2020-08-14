const mongoose = require('mongoose');

const Receipt = mongoose.model(
    'Receipt',
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
        },
        category: {
            type: String,
        },
        picture: {
            type: String,
        },
    })
);

module.exports.Receipt = Receipt;
