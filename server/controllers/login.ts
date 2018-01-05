import { Request, Response } from 'express';
import * as  pg from "pg";
import {default as config} from '../config/config';

export const getLogin = async (req: Request, res: Response) => {
    try {
        const pool = new pg.Pool(config);
        const client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM login WHERE login_id= $1',[req.params.id]);
        client.release();
        res.status(200).send(rows);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

export const addLogin = async (req: Request, res: Response) => {
    try {
        const { loginName, loginPasswd  } = req.body;
        try {
            const pool = new pg.Pool(config);
            const client = await pool.connect();
            const { row } = await client.query('INSERT INTO login( login_name, login_passwd) values($1, digest($2,"sha256"))',[ loginName, loginPasswd]);
            client.release();
            res.status(200).send(row.id);
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

export const verifyLogin = async (req: Request, res: Response) => {
    try {
        const pool = new pg.Pool(config);
        const client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM login WHERE login_id= $1 and login_passwd=$2',[req.params.id,req.params.passwd]);
        client.release();
        res.status(200).send(rows);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};