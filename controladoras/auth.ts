import { verify } from "jsonwebtoken";

import { ITaller } from "../interfaces/tallerInterface";
import Taller from "../modelos/tallerModel";
import IRespuesta from "../interfaces/respuesta";
import * as encriptar from "../funciones/encriptar";
import { jwt_accessTokenSecret, jwt_refreshTokenSecret, serverName } from '../config/production';
import tallerModel from "../modelos/tallerModel";

export default class AuthTallerService {
    constructor() { }

    async crearAdmin(taller: ITaller ): Promise<IRespuesta>{
        let callback: IRespuesta = {
            ok: true,
            mensaje: "Taller creado con exito",
            respuesta: null,
            codigo: 200
        }
        console.log(taller)
        if(await this.verificaTaller(taller.nombreTaller)){
            return callback = await { ok: false, mensaje:'Este taller ya existe', respuesta: null, codigo: 400}
        }

        const { salt, passwordHash } = await encriptar.generarPassword(taller.password);
        taller.password = await passwordHash
        taller.salt = await salt
        await Taller.create(taller, async ( err: any, tallerCreado: any) => {
            if(err){
                return callback = await { ok: false, mensaje: 'Error en base de datos', respuesta: err, codigo: 500}
            }
            await setTimeout(() => {}, 1000);

            callback = await { ok: true, mensaje: 'Taller creado', respuesta: null, codigo: 200}
           
        });
        return await callback;
    }

    async verificaTaller(taller: String): Promise<boolean> {
        console.log(taller)
        let existe: boolean = false;

        await Taller.findOne({ nombreTaller: taller }, ( err: any, tallerBD: any) => {
            if(err){
                existe = true;
                throw err;
            }

            if (tallerBD) {
                return existe = true;
            }

            return existe = false;
        }).clone();

        return existe;
    }

    

    
}

