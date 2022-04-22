DROP TABLE IF EXISTS generalchathistory;
CREATE TABLE generalchathistory(
id SERIAL PRIMARY KEY,
sender_id INTEGER NOT NULL REFERENCES users(id),
message TEXT NOT NULL,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO generalchathistory (sender_id, message) VALUES (100,'Hello people.');
INSERT INTO generalchathistory (sender_id, message) VALUES (101,'Thank you. Great.');
INSERT INTO generalchathistory (sender_id, message) VALUES (101,'Whatever.');
INSERT INTO generalchathistory (sender_id, message) VALUES (105,'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO generalchathistory (sender_id, message) VALUES (104,'Nice One');
INSERT INTO generalchathistory (sender_id, message) VALUES (110,'Whatever.');
INSERT INTO generalchathistory (sender_id, message) VALUES (112,'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO generalchathistory (sender_id, message) VALUES (141,'Thank you. Great.');
INSERT INTO generalchathistory (sender_id, message) VALUES (122,'Whatever.');
INSERT INTO generalchathistory (sender_id, message) VALUES (100,'Hello people.');
INSERT INTO generalchathistory (sender_id, message) VALUES (101,'Thank you. Great.');
INSERT INTO generalchathistory (sender_id, message) VALUES (101,'Whatever.');
INSERT INTO generalchathistory (sender_id, message) VALUES (105,'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO generalchathistory (sender_id, message) VALUES (104,'Nice One');
INSERT INTO generalchathistory (sender_id, message) VALUES (110,'Whatever.');
INSERT INTO generalchathistory (sender_id, message) VALUES (112,'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO generalchathistory (sender_id, message) VALUES (141,'Thank you. Great.');
INSERT INTO generalchathistory (sender_id, message) VALUES (122,'Whatever.');

