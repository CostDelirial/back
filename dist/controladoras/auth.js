"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tallerModel_1 = __importDefault(require("../modelos/tallerModel"));
const encriptar = __importStar(require("../funciones/encriptar"));
class AuthTallerService {
    constructor() { }
    crearAdmin(taller) {
        return __awaiter(this, void 0, void 0, function* () {
            let callback = {
                ok: true,
                mensaje: "Taller creado con exito",
                respuesta: null,
                codigo: 200
            };
            console.log(taller);
            if (yield this.verificaTaller(taller.nombreTaller)) {
                return callback = yield { ok: false, mensaje: 'Este taller ya existe', respuesta: null, codigo: 400 };
            }
            const { salt, passwordHash } = yield encriptar.generarPassword(taller.password);
            taller.password = yield passwordHash;
            taller.salt = yield salt;
            yield tallerModel_1.default.create(taller, (err, tallerCreado) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return callback = yield { ok: false, mensaje: 'Error en base de datos', respuesta: err, codigo: 500 };
                }
                yield setTimeout(() => { }, 1000);
                callback = yield { ok: true, mensaje: 'Taller creado', respuesta: null, codigo: 200 };
            }));
            return yield callback;
        });
    }
    verificaTaller(taller) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(taller);
            let existe = false;
            yield tallerModel_1.default.findOne({ nombreTaller: taller }, (err, tallerBD) => {
                if (err) {
                    existe = true;
                    throw err;
                }
                if (tallerBD) {
                    return existe = true;
                }
                return existe = false;
            }).clone();
            return existe;
        });
    }
    login(tel, pass, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tallerModel_1.default.findOne({ telefono: tel }, (err, tallerDB) => __awaiter(this, void 0, void 0, function* () {
                console.log(tallerDB);
                if (err) {
                    return callback({ ok: false, mensaje: " Error en la base de Datos", respuesta: err, codigo: 500 });
                }
                if (!tallerDB) {
                    return callback({ ok: false, mensaje: "Datos incorrectos", respuesta: null, codigo: 400 });
                }
                const passwordHash = yield encriptar.sha512(pass, tallerDB.salt);
                if (tallerDB.password !== passwordHash.passwordHash) {
                    return callback({ ok: false, mensaje: "Datos Incorrectos", respuesta: null, codigo: 404 });
                }
                if (tallerDB.status === "INACTIVO") {
                    if (tallerDB.role !== "ADMIN_ROLE") {
                        return callback({ ok: false, mensaje: "Usuario inactivo, revisa con tu administrador", respuesta: null, codigo: 403 });
                    }
                    else {
                        return callback({ ok: false, mensaje: "Usuario inactivo", respuesta: null, codigo: 400 });
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
                };
                console.log(tallerFront);
                yield encriptar.generarToken(tallerFront, (respuestaT) => __awaiter(this, void 0, void 0, function* () {
                    return callback({ ok: true, mensaje: "Inicio de sesion exitoso", respuesta: null, codigo: 200, token: respuestaT });
                }));
            })).clone();
        });
    }
}
exports.default = AuthTallerService;
