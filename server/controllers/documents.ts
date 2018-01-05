import { Request, Response } from 'express';
import * as  pg from "pg";
import {default as config} from '../config/config';
import * as sha256 from 'sha256';
import * as fs from "fs";
import {addEthHash, getEthHash} from "./documents_sol";



export const getDocuments = async (req: Request, res: Response) => {
    try {
        const pool = new pg.Pool(config);
        const client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM documents WHERE doc_client_id = $1 ORDER BY doc_id ASC',[req.params.clientid]);
        client.release();
        res.status(200).send(rows);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


export const getDocument = async (req: Request, res: Response) => {
    try {
        const pool = new pg.Pool(config);
        const client = await pool.connect();
        const docHash = req.params.hash;
        let ethHash;
        const {rows} = await client.query('SELECT * FROM documents WHERE doc_client_id = $1 and doc_hash = $2', [req.params.clientid, docHash]);
        client.release();
        if (rows[0].doc_id > 0) {
            await fs.readFile(rows[0].doc_path, async (err, data) => {
                if (err) res.status(400).end();
                //TODO pobierz hash z blockchaina
                ethHash = await getEthHash(rows[0].doc_client_id , rows[0].doc_id);
                //....
                if (docHash === sha256(data.toString()) == ethHash ) {
                    console.log('hash zgodny');
                    res.write(data);
                    res.end();
                } else {
                    console.log('hash niezgodny' + docHash + " : " + sha256(data.toString()) + " : " + ethHash);
                    res.status(404).end();
                }

            });
        }
        res.status(200);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


export const verifyHash = async (req: Request, res: Response) => {
    try {
        const hash = req.params.hash;
        const userid = req.params.clientid;
        //TODO sprawdz w kontrakcie w blockchainie czy istnieje
        //...
        res.status(200);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


export const addDocument = async (req: Request, res: Response) => {
    try {
        let docPath = "";
        let docHash = "";
        let docId = "";
        let docContent,docName,docHashName,docSize;
        const clientId = req.body.clientid;
        try {
            for (let  file of <any>req.files) {
                docName = file.originalname;
                docPath = file.path;
                docContent = file.buffer;
                docHashName = file.filename;
                docSize = file.size;
                await fs.readFile(file.path, (err, data) =>  {
                    if (err) throw err;
                    docHash = sha256(data.toString());
                    console.log(docHash);
                });
            }

            const pool = new pg.Pool(config);
            const client = await pool.connect();
            const { rows } = await client.query('INSERT INTO documents( doc_client_id, doc_name, doc_size, doc_path, doc_hash ,doc_status) values ($1, $2, $3, $4, $5, "A") RETURNING doc_id',[ clientId, docName, docSize, docPath, docHash],(err, res) => {
                if (err) {
                    console.error('Error in transaction', err.stack);
                }
               docId = res.rows[0].doc_id;
            });
            //TODO tutaj wywolaj funkcje zapisu do blockchaina
            await addEthHash(docHash,clientId, docId);
            //...
            client.release();

            res.status(200).send(docHash);
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        };
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


