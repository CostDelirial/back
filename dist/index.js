"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importaciones de terceros
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// importaciones de clases  y docs propios
const server_1 = __importDefault(require("./clases/server"));
// Instancia servidor http
const server = server_1.default.instance;
server.app.enable('trusty proxy');
// Uso de body parser
server.app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
server.app.use(express_1.default.json({ limit: '50mb' }));
// FileUpload
server.app.use((0, express_fileupload_1.default)());
// Seteo de cors
server.app.use((0, cors_1.default)({ origin: '*', credentials: true }));
// Importación de rutas
const authRuta_1 = __importDefault(require("./rutas/authRuta"));
// Seteo de rutas
server.app.use('/api', authRuta_1.default);
server.iniciar();
