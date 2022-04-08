DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL primary key,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firstname VARCHAR(255) NOT NULL CHECK (firstname != ''),
    lastname VARCHAR(255) NOT NULL CHECK (lastname != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    profilepic_url VARCHAR,
    password VARCHAR NOT NULL,
    bio TEXT
);