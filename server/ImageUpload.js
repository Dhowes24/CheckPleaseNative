
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');

const gcs = new Storage({
    projectId: 'checkplease-218202',
    keyFilename: '~/Desktop/CheckPlease/App/CheckPleaseNative/CheckPlease-dd7b5e658c4f.json'
});

const bucketName = 'checkpleaseimagebucket';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImageUpload = {};

ImageUpload.uploadToGcs = (req, res, next) => {
    if(!req.file) return next();

    // Can optionally add a path to the gcsname below by concatenating it before the filename
    const gcsname = req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    stream.end(req.file.buffer);
};

module.exports = ImageUpload;