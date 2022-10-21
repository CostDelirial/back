import { verify } from "jsonwebtoken";

import { ITaller } from "../interfaces/tallerInterface";
import { IUserTaller } from './../interfaces/userTaller';
import Taller from "../modelos/tallerModel";
import UserTaller from "../modelos/usuarioTallerModel";
import IRespuesta from "../interfaces/respuesta";
import * as encriptar from "../funciones/encriptar";
import { jwt_accessTokenSecret, jwt_refreshTokenSecret, serverName } from '../config/production';

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

            callback = await { ok: true, mensaje: 'Taller creado', respuesta: tallerCreado, codigo: 200}
           
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

    async login(tel: string, pass: string, callback: Function): Promise<any> {
       
            await Taller.findOne( {telefono: tel}, async (err: any, tallerDB: any ) => {
            
                if ( err ){
                    return callback({ ok: false, mensaje: " Error en la base de Datos", respuesta: err, codigo: 500 });
                }
                
                if(!tallerDB){
                    return callback({ ok: false, mensaje: "Datos incorrectos", respuesta: null, codigo: 400 });
                }
                console.log(pass)
                const passwordHash = await encriptar.sha512(pass, tallerDB.salt);
    
                if( tallerDB.password !== passwordHash.passwordHash ) {
                    return callback({ ok: false, mensaje: "Datos Incorrectos", respuesta: null, codigo: 404 })
                }
    
                if( tallerDB.status === "INACTIVO") {
                    if( tallerDB.role !== "ADMIN_ROLE"){
                        return callback({ ok: false, mensaje: "Usuario inactivo, revisa con tu administrador", respuesta: null, codigo: 403 })
                    }else{
                        return callback( { ok: false, mensaje: "Usuario inactivo", respuesta: null, codigo: 400})
                    }
                }
                const tallerFront = {
                    id: tallerDB._id,
                    nombre: tallerDB.nombre,
                    nombreTaller: tallerDB.nombreTaller,
                    telefono: tallerDB.telefono,
                    role: tallerDB.role,
                    email: tallerDB.email,
                    status: tallerDB.status
                } 
                await encriptar.generarToken( tallerFront, async( respuestaT: any) => {
                    
                    return callback({ ok: true, mensaje: "Inicio de sesion exitoso", respuesta: null, codigo: 200, token: respuestaT})
                })
    
            }).clone();
           
    }

    async crearUsuario( data: IUserTaller,admin: ITaller, callback: Function ){
        if(!admin.id){
            return callback({ ok: false, mensaje: "No eres admin", respuesta: null, codigo: 400 })
        }

        let password = await encriptar.passwordSeguro();
        const { salt, passwordHash } = await encriptar.generarPassword(password);

        data.password = await passwordHash;
        data.salt = await salt;
        data.nombreTaller = await admin.id;
        data.role = "USER_ROLE"
        UserTaller.create( data, async( err: any, userTallerCreado: any ) => {
            console.log(err)// cachar error de telefono repetido
            if(err){
                return callback({ ok: false, mensaje: "Error en base de datos", respuesta: err, codigo: 500 })
            }
            return callback({ ok: true, mensaje:"Usuario creado", respuesta: userTallerCreado, codigo: 200 })
        })

    }

    

    
}

