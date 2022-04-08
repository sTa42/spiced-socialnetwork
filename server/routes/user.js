const express = require("express");
const router = express.Router();
const { hash, compare } = require("../middlewares/bc");
const db = require("../middlewares/db");
const ses = require("../middlewares/aws-ses");
const { uploader } = require("../middlewares/uploadlocal");
const s3 = require("../middlewares/aws-s3");

router.get("/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});
router.get("/", (req, res) => {
    db.getFullNameAndProfilePictureByUserId(req.session.userId)
        .then(({ rows }) => {
            res.json({ success: true, user: rows[0] });
        })
        .catch((err) => {
            console.log("ERROR WHILE FETCHING USER DATA: ", err);
        });
});
router.post("/register.json", (req, res) => {
    console.log(req.body);
    if (!req.body.first) {
        return res.json({
            success: false,
            message: "no firstname",
        });
    }
    if (!req.body.last) {
        return res.json({
            success: false,
            message: "no lastname",
        });
    }
    if (!req.body.email) {
        return res.json({
            success: false,
            message: "no email",
        });
    }
    if (!req.body.password) {
        return res.json({
            success: false,
            message: "no password",
        });
    }
    if (!req.body.email.includes("@")) {
        return res.json({
            success: false,
            message: "no valid email format",
        });
    }
    if (!isNaN(req.body.first)) {
        return res.json({
            success: false,
            message: `${req.body.first} is not a valid firstname.`,
        });
    }
    if (!isNaN(req.body.last)) {
        return res.json({
            success: false,
            message: `${req.body.last} is not a valid lastname.`,
        });
    }

    hash(req.body.password)
        .then((hashedPassword) => {
            return db
                .registerUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashedPassword
                )
                .then(({ rows }) => {
                    console.log(rows[0]);
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("error while db inserting new user", err);
                    res.json({
                        success: false,
                        message: "SOMETHING BAD HAPPENED",
                    });
                });
        })
        .catch((err) => {
            console.log("error while hashing", err);
            res.json({ success: false, message: "SOMETHING BAD HAPPENED" });
        });
});
router.post("/login.json", (req, res) => {
    console.log(req.body);
    db.getUserInfoByEmail(req.body.email)
        .then(({ rows }) => {
            if (rows.length !== 0) {
                return compare(req.body.password, rows[0].password)
                    .then((isPasswordCorrect) => {
                        if (isPasswordCorrect) {
                            req.session.userId = rows[0].id;
                            res.json({ success: true });
                        } else {
                            res.json({
                                success: false,
                                message: "Incorrect submitted data",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("ERROR while comparing hashes", err);
                        res.json({
                            success: false,
                            message:
                                "Something went bad on our side. Please try again later.",
                        });
                    });
            } else {
                res.json({
                    success: false,
                    message: "Incorrect submitted data",
                });
            }
        })
        .catch((err) => {
            console.log("ERROR", err);
            res.json({
                success: false,
                message:
                    "Something went bad on our side. Please try again later.",
            });
        });
});
router.post(
    "/uploadprofilepicture",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        if (req.file) {
            db.updateUserProfileUrl(
                req.session.userId,
                `https://s3.amazonaws.com/spicedling/${req.file.filename}`
            )
                .then(({ rows }) => {
                    res.json({ success: true, url: rows[0].url });
                })
                .catch((err) => {
                    console.log(
                        "SOMETHING WENT WRONG UPDATING PROFILEPIC URL IN DB",
                        err
                    );
                    res.json({ success: false });
                });
        }
    }
);
router.post("/logout.json", (req, res) => {
    req.session = null;
    res.json({ success: true });
});
module.exports = router;
