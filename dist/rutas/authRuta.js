"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../controladoras/auth"));
const autentication_1 = require("../middlewares/autentication");
const authTallerRoutes = (0, express_1.Router)();
const authTallerService = new auth_1.default;
authTallerRoutes.post("/registrar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taller = req.body;
    let respuesta = yield authTallerService.crearAdmin(taller);
    return res.status(respuesta.codigo).json(respuesta);
}));
authTallerRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const telefono = req.body.telefono;
    const pass = req.body.password;
    authTallerService.login(telefono, pass, (respuesta) => {
        return res.status(respuesta.codigo).json(respuesta);
    });
}));
authTallerRoutes.post("/registroUser", autentication_1.verificaToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.body.taller.usuario;
    const data = req.body;
    yield authTallerService.crearUsuario(data, admin, (respuesta) => {
        return res.status(respuesta.codigo).json(respuesta);
    });
}));
exports.default = authTallerRoutes;
