const kue = require('kue');
const queue = kue.createQueue();
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { v4: uuidv4 } = require('uuid');

const { Receipt } = require('../models/receipt');
const { appEnums } = require('../helpers/app-enums');
const emailJob = require('../jobs/send-email-job');
const { shortenUrl } = require('../helpers/url-shortner');

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
    const { userId, month, data, email } = job.data;

    //file path
    const filePath = `${process.env.RECEIPTS_FILE_PATH}_${userId}_${month}.csv`;

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
        .writeRecords(data)
        .then((result) => {
            // file is created on the web server
            DoneCallback();

            //unique file name, pass this unique file name to S3
            const fileName = uuidv4();
            //Call s3 to upload the file and get response url

            //just an example of s3 response url
            const s3ResponseUrl =
                'https://rosemaryhatchways.s3.amazonaws.com/pictures/6588509e-2f62-4863-a8d0-a389c3278a32/margin1';

            if (String(process.env.BITLY_LINKS) == "true") {
                shortenUrl(s3ResponseUrl).then((link) => {

                    //Export receipts file after uploading it on S3
                    exportReceipts(email, link, DoneCallback);
                });
            } else {
                //Export receipts file after uploading it on S3
                exportReceipts(email, s3ResponseUrl, DoneCallback);
            }

        })
        .catch((error) => DoneCallback(error));
});

const exportReceipts = (emailId, fileDownloadLink, done) => {
    const exportReceiptBy = process.env.EXPORT_RECEIPT;

    switch (exportReceiptBy) {
        case appEnums.EXPORTRECEIPTS.EMAIL:
            sendEmail(emailId, fileDownloadLink, done);
            break;
    }
};

//create send email job by passing job to createEmailJob method
const sendEmail = (emailId, fileDownloadLink, done) => {
    //email data
    const job = {
        title: 'Send-Receipt-Email-Request-' + emailId,
        msg: {
            to: emailId,
            from: process.env.SENGRID_API_SENDER,
            subject: 'Ticket Checker receipts',
            text: 'You can download your receipts',
            html: '<strong>You can download your receipts: </strong><a href="'+fileDownloadLink+'">Click here</a>',
        },
    };

    //create job by calling createEmailJob method
    emailJob
        .createEmailJob(job)
        .then(() => {
            done();
        })
        .catch((error) => done(error));
};

module.exports = {
    createJob,
};
