const mongoose = require('mongoose');

const Receipt = mongoose.model(
    'Receipt',
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'picture',
        },
    })
);

module.exports.Receipt = Receipt;
