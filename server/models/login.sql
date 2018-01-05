CREATE EXTENSION pgcrypto;

CREATE TABLE login (
login_id SERIAL,
login_name VARCHAR(255) NOT NULL,
login_path VARCHAR(255) NOT NULL,
login_inserttime TIMESTAMP DEFAULT NOW(),
login_client_id INTEGER
);
