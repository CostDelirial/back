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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const rolesvalidos = {
    values: ['USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
const statusValidos = {
    values: ['ACTIVO', 'DESACTIVADO'],
    message: '{VALUE} no es un estatus permitido'
};
const userTallerSchema = new mongoose_1.Schema({
    nombre: { type: String, uppercase: true },
    nombreTaller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'talleres' },
    email: { type: String, lowercase: true },
    telefono: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: rolesvalidos, default: 'USER_ROLE' },
    status: { type: String, enum: statusValidos, default: 'ACTIVO' }
}, { collection: "tallerUsuarios" });
exports.default = mongoose_1.default.model("UserTaller", userTallerSchema);
