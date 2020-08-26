const kue = require('kue');
const queue = kue.createQueue();
const mongoose = require('mongoose');

const { Receipt } = require('../models/receipt');
const { appEnums } = require('../helpers/app-enums');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const createJob = async (job) => {

  //get receipts by user id and month
    const receipts = await Receipt.find(
        {
            user: job.userId,
            $expr: { $eq: [{ $month: '$date' }, job.month] },
        },
        {
            _id: 0,
            title: 1,
            amount: 1,
            category: 1,
            date: 1,
        }
    ).map((doc) => {
        // console.log(doc['category']);
        return doc;
    });

    // if receipts are present in db
    if (receipts.length > 0) {
       
      // create a job
        job.data = receipts;
        queue.create('Export receipts', job).save();
      
       return appEnums.RECEIPT.OK;
    } else {
        return appEnums.RECEIPT.NODATA;
    }
};

//process job added to the queue - its a worker
queue.process('Export receipts', (job, DoneCallback) => {

  //file path
  const filePath = `${process.env.RECEIPTS_FILE_PATH}_${job.data.userId}_${job.data.month}.csv`;

  // generate a csv file of receipts
    const csvWriter = createCsvWriter({
      path: filePath,
        header: [
            { id: 'title', title: 'Title' },
            { id: 'amount', title: 'Amount' },
            { id: 'category', title: 'Category' },
            { id: 'date', title: 'Date' },
        ],
    });
    csvWriter
        .writeRecords(job.data.data)
        .then((result) => {
            DoneCallback();
            return result;
        })
        .catch((error) => DoneCallback(error));
});

module.exports = {
    createJob,
};
