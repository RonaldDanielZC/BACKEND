"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const generateJWT = (_id, email = "", expiresIN = "12h", jwtSecret = "Leones123456*#") => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            email,
        };
        jwt.sign(payload, jwtSecret, {
            expiresIN: expiresIN,
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se puede generar el token");
            }
            else
                resolve(token);
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=jwt.js.map