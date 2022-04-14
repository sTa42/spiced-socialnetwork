const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/socialnetwork`
);
exports.registerUser = (firstname, lastname, email, password) => {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password) 
        VALUES ($1,$2,$3,$4)
        RETURNING ID;`,
        [firstname, lastname, email, password]
    );
};
exports.getUserInfoByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
};

exports.insertResetCodeForEmail = (email, resetCode) => {
    return db.query(`INSERT INTO reset_codes (email, code) VALUES ($1, $2);`, [
        email,
        resetCode,
    ]);
};
exports.getValidResetCodesForEmail = (email) => {
    return db.query(
        `SELECT code FROM reset_codes 
        WHERE email=$1 AND CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes';`,
        [email]
    );
};
exports.updatePasswordForEmail = (email, password) => {
    return db.query(`UPDATE users SET password=$2 WHERE email=$1;`, [
        email,
        password,
    ]);
};
exports.getFullNameAndProfilePictureByUserId = (userId) => {
    return db.query(
        `SELECT id, firstname, lastname, profilepic_url, bio FROM users WHERE id=$1;`,
        [userId]
    );
};
exports.updateUserProfileUrl = (userId, profilePicUrl) => {
    return db.query(
        `UPDATE users 
        SET profilepic_url=$2 
        WHERE id=$1
        RETURNING profilepic_url AS url;`,
        [userId, profilePicUrl]
    );
};
exports.updateProfileBio = (userId, bio) => {
    return db.query(
        `UPDATE users 
        SET bio=$2 
        WHERE id=$1 
        RETURNING bio;`,
        [userId, bio]
    );
};
exports.getLatestUsers = (callerUserId) => {
    return db.query(
        `SELECT * FROM users WHERE id != $1 ORDER BY id DESC LIMIT 3;`,
        [callerUserId]
    );
};
exports.getUsersBySearch = (searchTerm, callerUserId) => {
    return db.query(
        `SELECT * FROM users WHERE (firstname ILIKE $1 OR lastname ILIKE $1) AND id != $2;`,
        [searchTerm + "%", callerUserId]
    );
};
exports.getUserById = (userId) => {
    return db.query(`SELECT * FROM users WHERE id = $1;`, [userId]);
};
exports.getFriendshipStatus = (sender, recipient) => {
    return db.query(
        `SELECT * 
        FROM 
        friendships 
        WHERE 
        (sender_id = $1 AND recipient_id = $2) 
        OR 
        (sender_id = $2 AND recipient_id = $1);`,
        [sender, recipient]
    );
};
exports.insertNewFriendshipRequest = (sender, recipient) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id) VALUES ($1,$2) RETURNING sender_id, recipient_id;`,
        [sender, recipient]
    );
};
exports.acceptFriendRequest = (sender, recipient) => {
    return db.query(
        `UPDATE friendships SET status = true WHERE sender_id = $1 AND recipient_id = $2;`,
        [sender, recipient]
    );
};
exports.deleteFriendship = (sender, recipient) => {
    return db.query(
        `DELETE FROM friendships 
        WHERE 
        (sender_id = $1 AND recipient_id = $2) 
        OR 
        (sender_id = $2 AND recipient_id = $1);`,
        [sender, recipient]
    );
};
