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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const production_1 = require("../config/production");
const production_2 = require("../config/production");
// import UsuarioAuthService from '../controladoras/auth';
// const usuarioAuthService = new UsuarioService;
class ServerHttp {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = production_2.puerto;
        this.directorio = path_1.default.resolve(__dirname);
        this.httpServer = (0, http_1.createServer)(this.app);
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    iniciar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(production_1.db_url, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useInifiedTopology: true
            }, (err) => {
                if (err)
                    throw err;
                console.log(`Base de datos ${production_1.db_name} en conexion`);
                this.httpServer.listen(this.port, () => {
                    console.log(`Base de datos corriendo en puerto ${this.port}`);
                });
            });
            console.log(yield usuarioAuthService.crearSudo());
        });
    }
}
exports.default = ServerHttp;
