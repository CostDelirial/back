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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const production_1 = require("../config/production");
function verificaToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        yield (0, jsonwebtoken_1.verify)(token, production_1.jwt_accessTokenSecret, (err, decodificado) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    mensaje: "Existe un problema con el token",
                    err
                });
            }
            req.body.taller = decodificado;
            next();
        }));
    });
}
exports.verificaToken = verificaToken;
