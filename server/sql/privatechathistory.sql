DROP TABLE IF EXISTS privatechathistory;
CREATE TABLE privatechathistory(
id SERIAL PRIMARY KEY,
sender_id INTEGER NOT NULL REFERENCES users(id),
recepient_id INTEGER NOT NULL REFERENCES users(id),
message TEXT NOT NULL,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO privatechathistory (sender_id, recepient_id, message) VALUES (206, 208, 'Hello people.');
INSERT INTO privatechathistory (sender_id, recepient_id, message) VALUES (206, 208, 'Thank you. Great.');
INSERT INTO privatechathistory (sender_id, recepient_id, message) VALUES (208, 206, 'Whatever.');