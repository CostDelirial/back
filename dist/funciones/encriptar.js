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
exports.passwordSeguro = exports.saltHashPassword = exports.tokenLicencia = exports.tokenEmail = exports.generarToken = exports.generateResetPasswordToken = exports.generarPassword = exports.sha512 = exports.getStringValue = exports.genRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const production = __importStar(require("../config/production"));
function genRandomString(length) {
    return crypto_1.default.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}
exports.genRandomString = genRandomString;
function getStringValue(data) {
    if (typeof data === 'number' || data instanceof Number) {
        return data.toString();
    }
    if (!Buffer.isBuffer(data) && typeof data !== 'string') {
        throw new TypeError('Los datos para generar contraseñas deber ser de tipo String o Buffer');
    }
    return data;
}
exports.getStringValue = getStringValue;
function sha512(password, salt) {
    const hash = crypto_1.default.createHmac('sha512', getStringValue(salt));
    hash.update(getStringValue(password));
    const passwordHash = hash.digest('hex');
    return {
        salt,
        passwordHash
    };
}
exports.sha512 = sha512;
function generarPassword(password) {
    const salt = genRandomString(16);
    return sha512(String(password), salt);
}
exports.generarPassword = generarPassword;
function generateResetPasswordToken(userId) {
    const text = JSON.stringify({ userId, valid: new Date().getTime() + production.auth_ttl });
    const cipher = crypto_1.default.createCipher(production.auth_algorithm, production.auth_secret);
    let ciphered = cipher.update(text, production.auth_inputEncoding, production.auth_outputEncoding);
    ciphered += cipher.final(production.auth_outputEncoding);
    return ciphered;
}
exports.generateResetPasswordToken = generateResetPasswordToken;
function generarToken(usuario, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            usuario
        };
        jsonwebtoken_1.default.sign(payload, production.jwt_accessTokenSecret, {
            expiresIn: production.jwt_accessTokenLife
        }, (err, token) => {
            if (err) {
                return callback(err);
            }
            else {
                return callback(token);
            }
        });
    });
}
exports.generarToken = generarToken;
function tokenEmail(usuario, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            usuario
        };
        jsonwebtoken_1.default.sign(payload, production.jwt_accessTokenSecret, {
            expiresIn: '30m'
        }, (err, token) => {
            if (err) {
                return callback(err);
            }
            else {
                return callback(token);
            }
        });
    });
}
exports.tokenEmail = tokenEmail;
function tokenLicencia(licencia, duracion, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            licencia
        };
        yield jsonwebtoken_1.default.sign(payload, production.jwt_accessTokenSecret, {
            expiresIn: duracion
        }, (err, token) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return callback(err);
            }
            else {
                return callback(token);
            }
        }));
    });
}
exports.tokenLicencia = tokenLicencia;
function saltHashPassword(password) {
    const salt = genRandomString(16);
    return sha512(String(password), salt);
}
exports.saltHashPassword = saltHashPassword;
function passwordSeguro() {
    return __awaiter(this, void 0, void 0, function* () {
        const longitudPassword = 8;
        var caracteresConseguidos = 0;
        var caracterTemporal = '';
        var arrayCaracteres = new Array();
        var passwordDefinitivo = '';
        var numeroMinimoMinusculas = 1;
        var numeroMinimoMayusculas = 1;
        var numeroMinimoNumeros = 1;
        var numeroMinimoSimbolos = 1;
        var letrasMinusculasConseguidas = 0;
        var letrasMayusculasConseguidas = 0;
        var numerosConseguidos = 0;
        var simbolosConseguidos = 0;
        function guardarCaracterPosicionAleatoria(caracterPasadoParametro) {
            let guardadoPosicionVacia = false;
            let posicionArray = 0;
            while (guardadoPosicionVacia != true) {
                posicionArray = generaAleatorio(0, longitudPassword);
                if (arrayCaracteres[posicionArray] == 'null') {
                    arrayCaracteres[posicionArray] = caracterPasadoParametro;
                    guardadoPosicionVacia = true;
                }
            }
        }
        yield inicializarArray(longitudPassword).then((respuesta) => {
            arrayCaracteres = respuesta;
        });
        while (letrasMinusculasConseguidas < numeroMinimoMinusculas) {
            caracterTemporal = generaCaracter('minuscula');
            guardarCaracterPosicionAleatoria(caracterTemporal);
            letrasMinusculasConseguidas++;
            caracteresConseguidos++;
        }
        while (letrasMayusculasConseguidas < numeroMinimoMayusculas) {
            caracterTemporal = generaCaracter('mayuscula');
            guardarCaracterPosicionAleatoria(caracterTemporal);
            letrasMayusculasConseguidas++;
            caracteresConseguidos++;
        }
        while (simbolosConseguidos < numeroMinimoSimbolos) {
            caracterTemporal = generaCaracter('simbolo');
            guardarCaracterPosicionAleatoria(caracterTemporal);
            simbolosConseguidos++;
            caracteresConseguidos++;
        }
        while (numerosConseguidos < numeroMinimoNumeros) {
            caracterTemporal = generaCaracter('numero');
            guardarCaracterPosicionAleatoria(caracterTemporal);
            numerosConseguidos++;
            caracteresConseguidos++;
        }
        while (caracteresConseguidos < longitudPassword) {
            caracterTemporal = generaCaracter('aleatorio');
            guardarCaracterPosicionAleatoria(caracterTemporal);
            caracteresConseguidos++;
        }
        for (let i = 0; i < arrayCaracteres.length; i++) {
            passwordDefinitivo = passwordDefinitivo + arrayCaracteres[i];
        }
        return passwordDefinitivo;
    });
}
exports.passwordSeguro = passwordSeguro;
function inicializarArray(longitud) {
    return __awaiter(this, void 0, void 0, function* () {
        let array = new Array();
        for (let i = 0; i < longitud; i++) {
            array[i] = 'null';
        }
        return array;
    });
}
function generaAleatorio(iNumerInferior, iNumeroSuperior) {
    let iAleatorio = Math.floor((Math.random() * (iNumeroSuperior - iNumerInferior)) + iNumerInferior);
    return iAleatorio;
}
function generaCaracter(tipoCaracter) {
    let listaCaracteres = '$@!%*?&23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    let caracterGenerado = '';
    let valorInferior = 0;
    let valorSuperior = 0;
    switch (tipoCaracter) {
        case 'minuscula':
            valorInferior = 38;
            valorSuperior = 61;
            break;
        case 'mayuscula':
            valorInferior = 14;
            valorSuperior = 37;
            break;
        case 'numero':
            valorInferior = 6;
            valorSuperior = 13;
            break;
        case 'simbolo':
            valorInferior = 0;
            valorSuperior = 5;
            break;
        case 'aleatorio':
            valorInferior = 0;
            valorSuperior = 61;
    }
    caracterGenerado = listaCaracteres.charAt(generaAleatorio(valorInferior, valorSuperior));
    return caracterGenerado;
}
