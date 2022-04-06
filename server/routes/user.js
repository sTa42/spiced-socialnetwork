const express = require("express");
const router = express.Router();
const { hash, compare } = require("../middlewares/bc");
const db = require("../middlewares/db");

router.get("/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
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
            res.json({ success: false, message: "SOMETHING BAD HAPPENEDdddd" });
        });
});
router.post("/logout.json", (req, res) => {
    req.session = null;
    res.json({ success: true });
});
module.exports = router;
