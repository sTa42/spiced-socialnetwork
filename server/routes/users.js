const express = require("express");
const router = express.Router();
const { getLatestUsers, getUsersBySearch } = require("../middlewares/db");

router.get("/latest", (req, res) => {
    getLatestUsers()
        .then(({ rows: users }) => {
            res.json({ success: true, users });
        })
        .catch((e) => {
            console.log("ERROR WHILE GETTING LATEST USERS", e);
            res.json({ success: false });
        });
});
router.get("/:search", (req, res) => {
    getUsersBySearch(req.params.search)
        .then(({ rows: users }) => {
            res.json({ success: true, users });
        })
        .catch((e) => {
            console.log("ERROR WHILE GETTING USERS BY SEARCHTERM", e);
            res.json({ success: false });
        });
});
module.exports = router;
