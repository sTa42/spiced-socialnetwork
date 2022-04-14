const express = require("express");
const router = express.Router();
const {
    getFriendshipStatus,
    insertNewFriendshipRequest,
    acceptFriendRequest,
    deleteFriendship,
} = require("../middlewares/db");

router.get("/status/:id", (req, res) => {
    console.log(req.session.userId, req.params.id);
    getFriendshipStatus(req.params.id, req.session.userId)
        .then(({ rows }) => {
            console.log("STATUS", rows);
            if (rows.length === 0) {
                res.json({ success: false });
            } else {
                res.json({
                    success: true,
                    friendship: rows[0].status,
                    sender: rows[0].sender_id,
                    recipient: rows[0].recipient_id,
                });
            }
        })
        .catch((err) => {
            console.log("ERROR GETTING FRIENDSHIP STATUS FROM DB:", err);
            res.json({ success: false, error: true });
        });
});
router.post("/make", (req, res) => {
    insertNewFriendshipRequest(req.session.userId, req.body.otherUserId)
        .then(({ rows }) => {
            console.log("MAKE ROWS", rows);
            res.json({
                success: true,
                sender: rows[0].sender_id,
                recipient: rows[0].recipient_id,
            });
        })
        .catch((err) => {
            console.log("ERROR WHILE INSERTING INTO DB:", err);
            res.json({ success: false, error: true });
        });
});
router.post("/accept", (req, res) => {
    acceptFriendRequest(req.body.otherUserId, req.session.userId)
        .then(({ rows }) => {
            console.log("ACCEPT ROWS", rows);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("ERROR UPDATING FRIENDSHIP DB", err);
            res.json({ success: false, error: true });
        });
});
router.post("/reject", (req, res) => {
    deleteFriendship(req.body.otherUserId, req.session.userId)
        .then(({ rows }) => {
            console.log("REJECTING/DELETE:", rows);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("ERROR WHILE DELETING FRIENDSHIP", err);
            res.json({ success: false, error: true });
        });
});
module.exports = router;
