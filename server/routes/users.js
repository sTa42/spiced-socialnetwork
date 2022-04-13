const express = require("express");
const router = express.Router();
const {
    getLatestUsers,
    getUsersBySearch,
    getUserById,
} = require("../middlewares/db");

router.get("/latest", (req, res) => {
    getLatestUsers(req.session.userId)
        .then(({ rows: users }) => {
            res.json({ success: true, users });
        })
        .catch((e) => {
            console.log("ERROR WHILE GETTING LATEST USERS", e);
            res.json({ success: false });
        });
});
router.get("/:search", (req, res) => {
    getUsersBySearch(req.params.search, req.session.userId)
        .then(({ rows: users }) => {
            res.json({ success: true, users });
        })
        .catch((e) => {
            console.log("ERROR WHILE GETTING USERS BY SEARCHTERM", e);
            res.json({ success: false });
        });
});
router.get("/find/:id", (req, res) => {
    if (req.session.userId == req.params.id) {
        console.log("samer user detecetd");
        res.json({ success: false, sameUser: true });
    } else {
        getUserById(req.params.id)
            .then(({ rows }) => {
                if (rows.length === 0) {
                    res.json({
                        success: false,
                        message: "USER DOES NOT EXIST",
                    });
                } else {
                    res.json({ success: true, user: rows[0] });
                }
            })
            .catch((err) => {
                console.log("ERROR WHILE FETCHING A SPECIFIC USER", err);
                res.json({ success: false });
            });
    }
});
module.exports = router;
