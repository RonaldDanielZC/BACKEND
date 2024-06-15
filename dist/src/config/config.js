"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv").config();
exports.config = {
    desarrollo: {
        database: {
            connection: process.env.DB_CONNECTION,
        },
        email: {
            port: process.env.PORT_EMAIL_DESARROLLO,
            host: process.env.HOST_EMAIL_DESARROLLO,
            email: process.env.USER_EMAIL_DESARROLLO,
            password: process.env.PASS_EMAIL_DESARROLLO,
            from: process.env.FROM_EMAIL_DESARROLLO,
        },
        jwtSecret: process.env.JWTSECRET,
        JWTSecretPass: process.env.JWT_SECRET_PASS,
    },
    pruebas: {
        database: {
            connection: process.env.DB_CONNECTION,
        },
        email: {
            port: process.env.PORT_EMAIL_PRUEBAS,
            host: process.env.HOST_EMAIL_PRUEBAS,
            email: process.env.USER_EMAIL_PRUEBAS,
            password: process.env.PASS_EMAIL_PRUEBAS,
            from: process.env.FROM_EMAIL_PRUEBAS,
        },
        jwtSecret: process.env.JWTSECRET,
        JWTSecretPass: process.env.JWT_SECRET_PASS,
    },
    produccion: {
        database: {
            connection: process.env.DB_CONNECTION,
        },
        email: {
            port: "",
            host: "",
            email: "",
            password: "",
        },
        jwtSecret: process.env.JWTSECRET,
        JWTSecretPass: process.env.JWT_SECRET_PASS,
    },
};
//# sourceMappingURL=config.js.map