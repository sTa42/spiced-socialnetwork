DROP TABLE IF EXISTS friendships;
CREATE TABLE friendships(
id SERIAL PRIMARY KEY,
sender_id INTEGER NOT NULL REFERENCES users(id),
recipient_id INTEGER NOT NULL REFERENCES users(id),
status boolean DEFAULT false,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO friendships (sender_id, recipient_id) VALUES (1,2);
INSERT INTO friendships (sender_id, recipient_id) VALUES (4,3);
INSERT INTO friendships (sender_id, recipient_id, status) VALUES (5,6,true);

INSERT INTO friendships (sender_id, recipient_id, status) VALUES (206,1,true);
INSERT INTO friendships (sender_id, recipient_id, status) VALUES (206,2,true);
INSERT INTO friendships (sender_id, recipient_id, status) VALUES (206,3,true);
INSERT INTO friendships (sender_id, recipient_id, status) VALUES (103,206,false);
INSERT INTO friendships (sender_id, recipient_id, status) VALUES (101,206,false);
INSERT INTO friendships (sender_id, recipient_id, status) VALUES (100,206,false);
