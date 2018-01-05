CREATE TABLE documents (
doc_id SERIAL,
doc_size INTEGER,
doc_name VARCHAR(255) NOT NULL,
doc_path VARCHAR(255) NOT NULL,
doc_inserttime TIMESTAMP DEFAULT NOW(),
doc_client_id INTEGER,
doc_hash VARCHAR(255),
doc_status VARCHAR(2)
);
