import * as express from "express";
import * as path from "path";
import * as IndexRoute from "./routes/index";
import * as bodyParser from 'body-parser';


export class Server {
    private app: express.Express;
    private server: express.Express;
    router: express.Router = express.Router();

    constructor() {
        this.app = express();
        this.server = require("http").Server(this.app);
        this.setHeaders();
        this.setConfig();
        this.setRoutes();
        this.setStaticRoutes();
    }


    public setRoutes(): void {
        this.router.use(IndexRoute.Index.routes());
        this.app.use(this.router);
    }

    public setHeaders(): void {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, enctype');
            next();
        });
    }

    private setStaticRoutes() {
        this.app.use("/node_modules", express.static(
            path.join(__dirname, "../../node_modules")
        ));
        this.app.use(express.static("apidoc"));
        this.app.engine(".html", require("ejs").__express);
        this.app.set("view engine", "html");

    }

    public setConfig(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }


    public startServer(): void {
        this.server.listen(3002, () => {
            console.log("Aplication listening on 3002");
        });
    }

}

export default Server;
