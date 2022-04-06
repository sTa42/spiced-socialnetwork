const express = require("express");
const router = express.Router();
const { hash, compare } = require("../bc");
const db = require("../db");

router.get("/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});
router.post("/register.json", (req, res) => {
    console.log(req.body);
    hash(req.body.password)
        .then((hashedPassword) => {
            db.registerUser(
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
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error while hashing", err);
            res.json({ success: false });
        });
});
module.exports = router;
