"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenLife = exports.jwt_accessTokenLife = exports.jwt_refreshTokenSecret = exports.jwt_accessTokenSecret = exports.auth_outputEncoding = exports.auth_inputEncoding = exports.auth_algorithm = exports.auth_ttl = exports.auth_secret = exports.serverName = exports.db_name = exports.db_url = exports.puerto = void 0;
exports.puerto = Number(process.env.PORT) || 5002;
exports.db_url = "mongodb://localhost:27017/percances";
exports.db_name = "percances";
exports.serverName = `http://localhost:${exports.puerto}/`;
exports.auth_secret = "56gXxY{+D6/4m#kZ394j2=bT2eHqTAu>r8zAT>yEn:;TM#9*Vg";
exports.auth_ttl = 86400 * 1000;
exports.auth_algorithm = "aes256";
exports.auth_inputEncoding = "utf8";
exports.auth_outputEncoding = "hex";
exports.jwt_accessTokenSecret = "0d7c5c5f-768c-4d98-8900-13aadaa21937";
exports.jwt_refreshTokenSecret = "1a7v8c0l-391k-1f82-4492-tha3taa11334";
exports.jwt_accessTokenLife = "30d";
exports.refreshTokenLife = 2592000;
