const { Receipt } = require('../models/receipt');
const HttpError = require('../helpers/http-error');

// @route POST /receipt
// @desc  given params passed in, create a post
// @access Private
const createReceipt = async (req, res, next) => {
    const { title, amount, category, date, picture } = req.body;

    try {
        //create new receipt
        const newReceipt = new Receipt({
            title: title,
            user: req.userData.userId,
            amount: amount,
            catagory: category,
            date: date,
            picture: picture,
        });

        const receipt = await newReceipt.save();

        return res.json(receipt);
    } catch (err) {
        const error = new HttpError('server error', 500);
        return next(error);
    }
};

// @route PUT /receipt/:id
// @desc  given an ID and new params, update the receipt
// @access Private
const updateReceipt = async (req, res, next) => {
    try {
        //update receipt
        const receipt = await Receipt.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        await receipt.save();
        return res.json(receipt);
    } catch (err) {
        const error = new HttpError('server error', 500);
        return next(error);
    }
};

// @route GET /receipt/:id
// @desc given and id, return receipt with that ID
// @access Private
const getReceipt = async (req, res, next) => {
    try {
        const receipt = await Receipt.findById(req.params.id);
        if (!receipt) {
            return res.status(404).json({ msg: 'Receipt not found' });
        }
        res.json(receipt);
    } catch (err) {
        const error = new HttpError('server error', 500);
        return next(error);
    }
};

module.exports = {
    createReceipt,
    updateReceipt,
    getReceipt,
};
