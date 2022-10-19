import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import path from "path";

import { db_url, db_name } from "../config/production";
import { puerto } from '../config/production';
// import UsuarioAuthService from '../controladoras/auth';

// const usuarioAuthService = new UsuarioService;

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
        await mongoose.connect(db_url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useInifiedTopology: true
        }, ( err ) => {
            if( err ) throw err;
            console.log(`Base de datos ${db_name} en conexion`);
            this.httpServer.listen( this.port, () => {
                console.log(`Base de datos corriendo en puerto ${this.port}`)
            });
        });
        console.log(await usuarioAuthService.crearSudo());
    }
}