import { Response, Request } from "express";
import UsuarioModel from "../models/usuario.model";
import bcrypt from "bcryptjs";

export const crearUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  const { email, password } = body;
  try {
    const existeEmail = await UsuarioModel.findOne({ email: email });
    if (existeEmail) {
      return res.status(409).json({
        ok: false,
        msg: `Ya existe el email: ${email}`,
      });
    }

    const newUsuario = new UsuarioModel({
      ...body,
    });

    const salt = bcrypt.genSaltSync(10);
    newUsuario.password = bcrypt.hashSync(password, salt);

    const usuarioCreado = await newUsuario.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario creado satisfactoriamente",
      usuario: usuarioCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el usuario, comuniquese con el administrador",
    });
  }
};
export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuarioModel.find();

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los usuarios",
    });
  }
};
export const getunUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const usuarios = await UsuarioModel.findById({ _id: id });

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los usuarios",
    });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.json({
      ok: true,
      msg: "Usuario actualizado",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al ctualizar el usuario",
    });
  }
};

export const usuarioEliminado = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const usuarioEliminado = await UsuarioModel.findByIdAndDelete({ _id: id });
    res.json({
      ok: true,
      msg: "Usuario eliminado",
      usuario: usuarioEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(480).json({
      ok: false,
      msg: "Error al eliminar el usuario",
    });
  }
};
