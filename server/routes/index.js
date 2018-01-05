"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const documents_1 = require("../controllers/documents");
const login_1 = require("../controllers/login");
const multer = require("multer");
const path = require("path");
class Index {
    constructor() { }
    static routes() {
        let router = express.Router();
        const indexRoute = new Index();
        const upload = multer({ dest: 'documents/' });
        router.get("/", indexRoute.index);
        router.get("/documents/:clientid", documents_1.getDocuments);
        router.post("/documents", upload.array("file"), documents_1.addDocument);
        router.get("/document/:clientid/:hash", documents_1.getDocument);
        router.post("/upload/text", upload.array("file"), documents_1.addDocument);
        router.post("/login", login_1.addLogin);
        router.get("/login/:id", login_1.getLogin);
        router.post("/login/verify", login_1.verifyLogin);
        router.get("/apidoc", indexRoute.apidoc);
        return router;
    }
    index(req, res) {
        res.send("index");
    }
    apidoc(req, res) {
        res.sendFile(path.join(__dirname, "../../apidoc", "index.html"));
    }
}
exports.Index = Index;
//# sourceMappingURL=index.js.map