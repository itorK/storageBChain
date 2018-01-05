CREATE EXTENSION pgcrypto;

CREATE TABLE client (
client_id SERIAL,
client_firstname VARCHAR(255) NOT NULL,
client_secondname VARCHAR(255) NOT NULL,
client_inserttime TIMESTAMP DEFAULT NOW()
);
