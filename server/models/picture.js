const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    receipt_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'receipt',
    },
});

module.exports = Picture = mongoose.model('picture', PictureSchema);
