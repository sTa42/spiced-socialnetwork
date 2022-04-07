const express = require("express");
const router = express.Router();
const cryptoRandomString = require("crypto-random-string");
const { sendPasswordResetEmail } = require("../middlewares/aws-ses");
const {
    getUserInfoByEmail,
    insertResetCodeForEmail,
    getValidResetCodesForEmail,
    updatePasswordForEmail,
} = require("../middlewares/db");
const { hash } = require("../middlewares/bc");

router.post("/reset/verify", (req, res) => {
    console.log(req.body);
    getValidResetCodesForEmail(req.body.email)
        .then(({ rows: codes }) => {
            console.log(codes);
            if (
                codes.some((item) => {
                    return item.code == req.body.resetCode;
                })
            ) {
                console.log("LANDING IN HERE?");
                return hash(req.body.password)
                    .then((hashedPassword) => {
                        return updatePasswordForEmail(
                            req.body.email,
                            hashedPassword
                        )
                            .then((result) => {
                                console.log("HASHING INSNERT DONE", result);
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(
                                    "ERROR WHILE UPDATEING PASSWORD: ",
                                    err
                                );
                                res.json({
                                    success: false,
                                    message:
                                        "Something went bad on our side. Please try again later",
                                });
                            });
                    })
                    .catch((err) => {
                        console.log("ERROR WHILINE HASING: ", err);
                        res.json({
                            success: false,
                            message:
                                "Something went bad on our side. Please try again later",
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(
                "ERROR WHILE GETTING VALID RESET CODES FOR PROVIDED EMAIL: ",
                err
            );
            res.json({
                success: false,
                message: "Something went bad on our side.",
            });
        });
});
router.post("/reset", (req, res) => {
    if (!req.body.email) {
        return res.json({ success: false });
    }
    getUserInfoByEmail(req.body.email)
        .then(({ rows }) => {
            if (rows.length !== 0) {
                const resetCode = cryptoRandomString({
                    length: 6,
                });
                return insertResetCodeForEmail(req.body.email, resetCode)
                    .then((result) => {
                        console.log(result);
                        sendPasswordResetEmail(req.body.email, resetCode)
                            .then((result) => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("ERROR WHILE SENDING EMAIL: ", err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({
                            success: false,
                            message: "Something went wrong on our side.",
                        });
                    });
            } else {
                res.json({
                    success: false,
                    message: "Something went wrong.",
                });
            }
        })
        .catch((err) => {
            console.log("ERROR WHILE GETTING USER INFO: ", err);
            res.json({
                success: false,
                message: "Something went wrong on our side.",
            });
        });
});

router.get("/reset/test", (req, res) => {
    insertResetCodeForEmail(
        "Werner@Heins.com",
        cryptoRandomString({
            length: 6,
        })
    );
});
router.post("/reset/new", (req, res) => {});
module.exports = router;
