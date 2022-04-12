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
exports.getLatestUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3;`);
};
exports.getUsersBySearch = (searchTerm) => {
    return db.query(
        `SELECT * FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1;`,
        [searchTerm + "%"]
    );
};
