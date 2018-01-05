"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const IndexRoute = require("./routes/index");
const bodyParser = require("body-parser");
class Server {
    constructor() {
        this.router = express.Router();
        this.app = express();
        this.server = require("http").Server(this.app);
        this.setHeaders();
        this.setConfig();
        this.setRoutes();
        this.setStaticRoutes();
    }
    setRoutes() {
        this.router.use(IndexRoute.Index.routes());
        this.app.use(this.router);
    }
    setHeaders() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, enctype');
            next();
        });
    }
    setStaticRoutes() {
        this.app.use("/node_modules", express.static(path.join(__dirname, "../../node_modules")));
        this.app.use(express.static("apidoc"));
        this.app.engine(".html", require("ejs").__express);
        this.app.set("view engine", "html");
    }
    setConfig() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    startServer() {
        this.server.listen(3002, () => {
            console.log("Aplication listening on 3002");
        });
    }
}
exports.Server = Server;
exports.default = Server;
//# sourceMappingURL=server.js.map