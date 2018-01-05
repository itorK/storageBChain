"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const config_1 = require("../config/config");
const sha256 = require("sha256");
const fs = require("fs");
exports.getDocuments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pool = new pg.Pool(config_1.default);
        const client = yield pool.connect();
        const { rows } = yield client.query('SELECT * FROM documents WHERE doc_client_id = $1 ORDER BY id ASC', [req.params.clientid]);
        client.release();
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.getDocument = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pool = new pg.Pool(config_1.default);
        const client = yield pool.connect();
        const docHash = req.params.hash;
        const { rows } = yield client.query('SELECT * FROM documents WHERE doc_client_id = $1 and doc_hash = $2', [req.params.clientid, docHash]);
        client.release();
        //TODO pobierz hash z blockchaina
        //....
        if (rows[0].doc_id > 0) {
            yield fs.readFile(rows[0].doc_path, (err, data) => {
                if (err)
                    res.status(400).end();
                if (docHash === sha256(data.toString())) {
                    console.log('hash zgodny');
                    res.write(data);
                    res.end();
                }
                else {
                    console.log('hash niezgodny' + docHash + " : " + sha256(data.toString()));
                    res.status(404).end();
                }
            });
        }
        res.status(200);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.verifyHash = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hash = req.params.hash;
        const userid = req.params.clientid;
        //TODO sprawdz w kontrakcie w blockchainie czy istnieje
        //...
        res.status(200);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.addDocument = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let docPath = "";
        let docHash = "";
        let docContent, docName, docHashName, docSize;
        const clientId = req.body.clientid;
        try {
            for (let file of req.files) {
                docName = file.originalname;
                docPath = file.path;
                docContent = file.buffer;
                docHashName = file.filename;
                docSize = file.size;
                yield fs.readFile(file.path, (err, data) => {
                    if (err)
                        throw err;
                    docHash = sha256(data.toString());
                    console.log(docHash);
                });
            }
            //TODO tutaj wywolaj funkcje zapisu do blockchaina
            //...
            const pool = new pg.Pool(config_1.default);
            const client = yield pool.connect();
            const { rows } = yield client.query('INSERT INTO documents( doc_client_id, doc_name, doc_size, doc_path, doc_hash) values ($1, $2, $3, $4, $5)', [clientId, docName, docSize, docPath, docHash], (err, res) => {
                if (err) {
                    console.error('Error in transaction', err.stack);
                }
            });
            client.release();
            res.status(200).send(docHash);
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
        ;
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
//# sourceMappingURL=documents.js.map