import { Router, Request, Response } from "express";
import AuthTallerService from "../controladoras/auth";
import IRespuesta from "../interfaces/respuesta";
import { verificaToken } from "../middlewares/autentication";

const authTallerRoutes = Router();
const authTallerService = new AuthTallerService;

authTallerRoutes.post("/registrar", async(req: Request, res: Response) => {
    const taller = req.body
    let respuesta = await authTallerService.crearAdmin(taller)
    return res.status( respuesta.codigo).json( respuesta )
});

authTallerRoutes.post("/login", async(req: Request, res: Response ) => {
    
    const telefono = req.body.telefono;
    const pass = req.body.password;
    authTallerService.login( telefono, pass, ( respuesta: IRespuesta) => {
        return res.status( respuesta.codigo).json(respuesta)
    })
})
export default authTallerRoutes;