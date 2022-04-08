const fs = require("fs");
const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    // if no file => error msg
    if (!req.file) {
        return res.sendStatus(500);
    }
    console.log(req.file);
    const { filename, mimetype, size, path } = req.file;
    // Bucket: bucket name
    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("aws upload complete");

            // this will delete the img
            // fs.unlink(path, () => {});
            next();
        })
        .catch((err) => {
            // uh oh
            console.log("error in s3 upload", err);
            res.sendStatus(404);
        });
};
