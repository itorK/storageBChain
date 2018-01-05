import * as express from "express";
import {addDocument, getDocument, getDocuments} from "../controllers/documents";
import {addLogin, getLogin, verifyLogin} from "../controllers/login";
import * as multer from "multer";
import * as path from "path";

export class Index {

    constructor() { }

    public static routes(): express.Router {
        let router: express.Router = express.Router();
        const indexRoute: Index = new Index();
        const upload = multer({ dest: 'documents/' });

        router.get("/", indexRoute.index);
        router.get("/documents/:clientid", getDocuments);
        router.post("/documents", upload.array("file"), addDocument);
        router.get("/document/:clientid/:hash", getDocument);
        router.post("/upload/text", upload.array("file"), addDocument);


        router.post("/login", addLogin);
        router.get("/login/:id", getLogin);
        router.post("/login/verify", verifyLogin);

        router.get("/apidoc", indexRoute.apidoc);

        return router;
    }

    public index(req: express.Request, res: express.Response) {
        res.send("index");
    }
    public apidoc(req: express.Request, res: express.Response) {
        res.sendFile(path.join(__dirname, "../../apidoc", "index.html"));
    }

    /*
    public checkToken = (req, res, next) =>  {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    };
*/
}