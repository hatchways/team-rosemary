const mongoose = require('mongoose');

const { User } = require('../models/user');
const { Receipt } = require('../models/receipt');
const HttpError = require('../helpers/http-error');

const getMonthlyTransactions = async (req, res, next) => {
  const userId = req.params.userid;

  // So far only 2020, month starts from 0
  const from = new Date(2020, req.params.month);
  const to = new Date(2020, req.params.month + 1);

  try {
    const user = await User.findById(userId);

    if (!user) {
      const error = new HttpError('Invalid user details.', 400);
      return next(error);
    } else {
      const id = mongoose.Types.ObjectId(userId);
      const receipts = await Receipt.aggregate([
        {
          $match: {
            user: id,
            date: { $gte: from, $lt: to }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: {
                date: "$date",
                format: "%m, %d, %Y"
              }
            },
            total: { $sum: "$amount" }
          }
        },
        {
          $sort: { _id: -1 }
        }
      ], function (err, result) {
        console.log(err);
      })

      if (!receipts) {
        const error = new HttpError('No receipts for selected month', 404);
        return next(error);
      } else {
        res.status(200).json({ receipts });
      }
    }

  } catch {
    const error = new HttpError('Internal server error', 500);
    return next(error);
  }
};

module.exports = { getMonthlyTransactions };