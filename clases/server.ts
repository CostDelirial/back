import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import path from "path";

import { db_url, db_name } from "../config/production";
import { puerto } from '../config/production';

import TallerAuthService from '../controladoras/auth';

 const tallerAuthService = new TallerAuthService;

export default class ServerHttp {
    private static _instance: ServerHttp;
    public app: express.Application;
    public port: number;
    public directorio: string;
    
    private httpServer: any;

    private constructor() {
        this.app = express();
        this.port = puerto;

        this.directorio = path.resolve(__dirname);
        this.httpServer = createServer( this.app );
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() )
    }

    async iniciar(): Promise<any> {
        console.log(db_url)
        mongoose.connect(db_url, err => {
            if (err)
                throw err;
            console.log(`Conectado a la base de datos ${db_name}`);
            this.httpServer.listen(this.port, () => {
                console.log(`Servidor corriendo en el puerto: ${this.port}`);
            });
        })

        //console.log(await tallerAuthService.crearSudo());
    }
}