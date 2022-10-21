import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { jwt_accessTokenSecret } from "../config/production";

export async function verificaToken( req: Request, res: Response, next: NextFunction ) {
   
    const token: any = req.headers.authorization;
    
    await verify( token, jwt_accessTokenSecret, async ( err: any, decodificado: any ) => {
        if ( err ) {
            return res.status(401).json({
                ok: false,
                mensaje: "Existe un problema con el token",
                err
            });
        }

        req.body.taller = decodificado;
        
        next();

    });
}