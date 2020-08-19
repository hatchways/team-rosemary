var aws = require('aws-sdk');

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}.local`,
});
console.log(process.env.Bucket);

aws.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
});

const S3_BUCKET = process.env.Bucket;

const sign_s3 = (req, res) => {
    const s3 = new aws.S3(); // Create a new instance of S3
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const userId = req.body.userId;

    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `pictures/${userId}/` + fileName,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read',
    };

    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, error: err });
        }
        // console.log('no err');
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/pictures/${userId}/${fileName}`,
        };
        // Send it all back
        // console.log(returnData);
        res.json({ success: true, data: { returnData } });
    });
};

module.exports = {
    sign_s3,
};
