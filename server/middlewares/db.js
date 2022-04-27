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
exports.getFriendsAndWannabees = (userId) => {
    return db.query(
        `SELECT users.id, firstname, lastname, profilepic_url, status 
        FROM friendships JOIN users 
        ON (status = false AND recipient_id = $1 AND sender_id = users.id)          
        OR (status = true AND recipient_id = $1 AND sender_id = users.id) 
        OR (status = true AND sender_id = $1 AND recipient_id = users.id)`,
        [userId]
    );
};
exports.getFriendsAndWannabees2 = (userId) => {
    return db.query(
        `SELECT users.id, firstname, lastname, profilepic_url, status, sender_id AS sender, recipient_id AS recipient, $1 AS requester 
        FROM friendships JOIN users 
        ON (status = false AND recipient_id = $1 AND sender_id = users.id)          
        OR (status = true AND recipient_id = $1 AND sender_id = users.id) 
        OR (status = true AND sender_id = $1 AND recipient_id = users.id) 
        OR (status = false AND sender_id = $1 AND recipient_id = users.id)`,
        [userId]
    );
};

exports.getLatestGeneralChatMessages = () => {
    return db.query(
        `SELECT generalchathistory.id AS id, users.id AS userId, generalchathistory.message,
        users.firstname, users.lastname, users.profilepic_url, generalchathistory.timestamp FROM generalchathistory JOIN users 
        ON generalchathistory.sender_id = users.id
        ORDER BY timestamp DESC LIMIT 10;`
    );
};
exports.addChatMessage = (sender, message) => {
    return db.query(
        `INSERT INTO generalchathistory (sender_id, message) VALUES ($1,$2) RETURNING *;`,
        [sender, message]
    );
};
exports.addChatMessage2 = (sender, message) => {
    return db.query(
        `WITH “user”
        AS ( SELECT * FROM users WHERE id = $1),
        new_message AS (INSERT INTO generalchathistory (sender_id, message) VALUES ($1, $2) RETURNING *)
        SELECT firstname, lastname, profilepic_url FROM “user”, new_message`,
        [sender, message]
    );
};
// exports.getUserData;
// `INSERT INTO generalchathistory (sender_id, message) VALUES (35,'hello') SELECT * FROM users JOIN users ON generalchathistory.sender_id = users.id;`

/*         `WITH “user”
        AS ( SELECT * FROM users WHERE id = 14),
        new_message AS (INSERT INTO generalchathistory (sender_id, message) VALUES (14, 'hello world nice') RETURNING id message, sender_id)
        SELECT firstname, lastname, profilepic_url FROM “user”, new_message`,
        [text, userId]

        */
exports.getBasicUserData = (id) => {
    return db.query(
        `SELECT id, firstname, lastname, profilepic_url FROM users WHERE id = $1`,
        [id]
    );
};
exports.getOpenFriendshipRequests = (userId) => {
    return db.query(
        `SELECT friendships.id, friendships.sender_id, users.firstname, users.lastname, users.profilepic_url, friendships.status, friendships.timestamp FROM friendships JOIN users ON friendships.sender_id = users.id WHERE recipient_id = $1 AND status = false;`,
        [userId]
    );
};
exports.getSpecificFriendshipData = (recipient, sender) => {
    return db.query(
        `SELECT friendships.id, friendships.sender_id, users.firstname, users.lastname, users.profilepic_url, friendships.status, friendships.timestamp FROM friendships JOIN users ON friendships.sender_id = users.id WHERE recipient_id = $1 AND sender_id = $2 AND status = false;`,
        [recipient, sender]
    );
};
exports.getPrivateMessageData = (sender, recipient) => {
    return db.query(
        `SELECT * FROM privatechathistory WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1);`,
        [sender, recipient]
    );
};
exports.addPrivateMessage = (sender, recipient, text) => {
    return db.query(
        `INSERT INTO privatechathistory (sender_id, recipient_id, message) VALUES ($1, $2, $3) RETURNING *;`,
        [sender, recipient, text]
    );
};
