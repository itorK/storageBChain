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
exports.getLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pool = new pg.Pool(config_1.default);
        const client = yield pool.connect();
        const { rows } = yield client.query('SELECT * FROM login WHERE login_id= $1', [req.params.id]);
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
exports.addLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { loginName, loginPasswd } = req.body;
        try {
            const pool = new pg.Pool(config_1.default);
            const client = yield pool.connect();
            const { row } = yield client.query('INSERT INTO login( login_name, login_passwd) values($1, digest($2,"sha256"))', [loginName, loginPasswd]);
            client.release();
            res.status(200).send(row.id);
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
exports.verifyLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const pool = new pg.Pool(config_1.default);
        const client = yield pool.connect();
        const { rows } = yield client.query('SELECT * FROM login WHERE login_id= $1 and login_passwd=$2', [req.params.id, req.params.passwd]);
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
//# sourceMappingURL=login.js.map