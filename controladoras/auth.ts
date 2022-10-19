import { verify } from "jsonwebtoken";

import { ITaller } from "../interfaces/tallerInterface";
import Taller from "../modelos/tallerModel";
import IRespuesta from "../interfaces/respuesta";
import { jwt_accessTokenSecret, jwt_refreshTokenSecret, serverName } from '../config/production';

export default class AuthTallerService {
    constructor() { }

    async verificarSudo() {
        let respuesta = true;

        await Taller.findOne({ role: 'SUDO' }, (err: any, sudoDB: any) => {
            if (err) {
                throw err;
            }

            if (sudoDB) {
                return respuesta = true;
            }

            return respuesta = false;
        })

        return respuesta;
    }

    
}

