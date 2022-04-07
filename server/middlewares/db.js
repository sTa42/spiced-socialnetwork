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
