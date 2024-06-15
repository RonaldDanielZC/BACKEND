import { Response, Request } from "express";
import ProductoModel from "../models/producto.model";
import { CustomRequest } from "../middlewares/validate-jwt";

export const crearProducto = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const id = req._id;
  try {
    const newProducto = new ProductoModel({ usuario: id, ...body });

    const productoCreado = await newProducto.save();

    res.status(200).json({
      ok: true,
      msg: "Producto creado satisfactoriamente",
      producto: productoCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el producto, comuniquese con el administrador",
    });
  }
};
export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoModel.find().populate({
      path: "usuario",
      select: "nombre ",
    });

    res.json({
      ok: true,
      productos: productos,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,

      msg: "Error al consultar los usuarios",
    });
  }
};
export const getunProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const productos = await ProductoModel.findById({ _id: id });

    res.json({
      ok: true,
      productos,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los productos",
    });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const productoActualizado = await ProductoModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      msg: "Producto actualizado",
      usuario: productoActualizado,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al ctualizar el producto",
    });
  }
};

export const productoEliminado = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const productoEliminado = await ProductoModel.findByIdAndDelete({
      _id: id,
    });
    res.json({
      ok: true,
      msg: "Producto eliminado",
      usuario: productoEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(480).json({
      ok: false,
      msg: "Error al eliminar el producto",
    });
  }
};
