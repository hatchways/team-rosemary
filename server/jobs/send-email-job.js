const sgMail = require('@sendgrid/mail');
const kue = require('kue');
const queue = kue.createQueue();
const mongoose = require('mongoose');

const { appEnums } = require('../helpers/app-enums');

const createEmailJob = async (job) => {
    try {
        // create and save a job
        queue.create('Send Receipt Email', job).save();
        return appEnums.Email.SENT;
    } catch (ex) {
        console.log(ex);
    }
};

//process job added to the queue - its a worker
queue.process('Send Receipt Email', (job, DoneCallback) => {
    try {
        const { msg } = job.data;
        //setup API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
        //Send mail
        sgMail.send(msg).then((result) => {
           DoneCallback();
           //return result;
        }).catch((error) => DoneCallback(error));

    } catch (ex) {
        console.log(ex);
    }
});

module.exports = {
    createEmailJob,
};
