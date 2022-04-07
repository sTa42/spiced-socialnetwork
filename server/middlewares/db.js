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
exports.loginUser = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
};
