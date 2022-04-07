const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});
exports.sendPasswordResetEmail = function (recipient, resetCode) {
    return ses
        .sendEmail({
            Source: "auspicious heron<auspicious.heron@spicedling.email>",
            Destination: {
                ToAddresses: ["auspicious.heron@spicedling.email"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `Hello, you request a password reset. Here is your code: ${resetCode}`,
                    },
                },
                Subject: {
                    Data: "Your code to reset your password.",
                },
            },
        })
        .promise();
};
