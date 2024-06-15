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
exports.cambioContrasena = exports.olvidoContrasena = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const email_1 = require("../helpers/email");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //verioricar el email
        const usuario = yield usuario_model_1.default.findOne({ email: email });
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son válidas",
            });
        }
        //verificar el password
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son válidas",
            });
        }
        //generar un token
        const token = yield (0, jwt_1.default)(usuario._id, usuario.email);
        return res.status(200).json({
            ok: true,
            usuario,
            token,
        });
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }
});
exports.login = login;
const olvidoContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, numeroDocumento } = req.body;
    try {
        const existeUsuario = yield usuario_model_1.default.findOne({
            email,
            numeroDocumento,
        });
        if (!existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: "Los datos no coinciden",
            });
        }
        const id = existeUsuario === null || existeUsuario === void 0 ? void 0 : existeUsuario._id;
        if (id) {
            const token = yield (0, jwt_1.default)(id, email, "1h", process.env.JWT_SECRET_PASS);
            //Guardar el token
            existeUsuario.token = token;
            yield existeUsuario.save();
            (0, email_1.sendEmail)("ronalddaniel1303@gmail.com", "asunto de prueba", "Texto del correo");
            return res.status(200).json({
                ok: true,
                msg: "Proceso exitoso",
                usuario: existeUsuario,
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            ok: false,
            msg: "No se logró validar sus datos",
        });
    }
});
exports.olvidoContrasena = olvidoContrasena;
const cambioContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const { password } = req.body;
    const tokenPass = req.header("x-token-pass");
    try {
        if (!password || tokenPass) {
            return res.status(400).json({
                ok: false,
                msg: "Valores inválidos",
            });
        }
        const usuario = yield usuario_model_1.default.findOne({ token: tokenPass });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El token ya fué utilizado",
            });
        }
        const newPassword = bcryptjs_1.default.hashSync(password, 10);
        const actualizarPassword = yield usuario_model_1.default.findByIdAndUpdate(id, {
            password: newPassword,
            token: "",
        }, { new: true });
        if (!actualizarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar las contraseña",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Contraseña actualizada",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            ok: false,
            msg: "Error al actualizar las contraseña, Contacte al administrador",
        });
    }
});
exports.cambioContrasena = cambioContrasena;
//# sourceMappingURL=auth.controller.js.map