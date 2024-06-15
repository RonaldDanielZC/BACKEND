import { Response } from "express";
import { CustomRequest } from "../middlewares/validate-jwt";
import { InteraccionModel } from "../models/interaccion.model";

export const crearInteraccion = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const body = req.body;
  const { descripcion, cliente } = body;
  try {
    const interaccion = new InteraccionModel({
      usuario: id,
      descripcion,
      cliente,
    });
    const newInteraccion = await interaccion.save();
    res.status(200).json({
      ok: true,
      msg: "Interacción creada",
      interaccion: newInteraccion,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear interacción. comuniquese con el administrador",
    });
  }
};
