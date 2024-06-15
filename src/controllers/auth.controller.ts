import bcrypt from "bcryptjs";
import { Request, Response, request } from "express";
import UsuarioModel from "../models/usuario.model";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";
import { sendEmail } from "../helpers/email";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    //verioricar el email
    const usuario = await UsuarioModel.findOne({ email: email });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }

    //verificar el password
    const validarPassword = bcrypt.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }

    //generar un token
    const token = await generateJWT(usuario._id, usuario.email);
    return res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }
};

export const olvidoContrasena = async (req: Request, res: Response) => {
  const { email, numeroDocumento } = req.body;

  try {
    const existeUsuario = await UsuarioModel.findOne({
      email,
      numeroDocumento,
    });
    if (!existeUsuario) {
      return res.status(400).json({
        ok: false,
        msg: "Los datos no coinciden",
      });
    }
    const id = existeUsuario?._id;

    if (id) {
      const token = await generateJWT(
        id,
        email,
        "1h",
        process.env.JWT_SECRET_PASS
      );

      //Guardar el token

      existeUsuario.token = token;
      await existeUsuario.save();

      sendEmail(
        "ronalddaniel1303@gmail.com",
        "asunto de prueba",
        "Texto del correo"
      );

      return res.status(200).json({
        ok: true,
        msg: "Proceso exitoso",
        usuario: existeUsuario,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      ok: false,
      msg: "No se logró validar sus datos",
    });
  }
};

export const cambioContrasena = async (req: CustomRequest, res: Response) => {
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
    const usuario = await UsuarioModel.findOne({ token: tokenPass });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El token ya fué utilizado",
      });
    }

    const newPassword = bcrypt.hashSync(password, 10);

    const actualizarPassword = await UsuarioModel.findByIdAndUpdate(
      id,
      {
        password: newPassword,
        token: "",
      },
      { new: true }
    );
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
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      ok: false,
      msg: "Error al actualizar las contraseña, Contacte al administrador",
    });
  }
};
