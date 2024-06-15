import { Schema, Model, model, Types } from "mongoose";

interface Distribuidor {
  nit: string;
  razonSocial: string;
  telefono: number;
  direccion: string;
}

interface Opiniones {
  comentarios: string;
  calificacion: number;
  fecha?: Date;
}
interface productoInterface {
  nombre: string;
  sku: string;
  cantidad: number;
  precio: number;
  distribuidor: Distribuidor;
  opiniones: Opiniones;
  usuario: Types.ObjectId;
  createDate: Date;
}

const ProductoSchema = new Schema<productoInterface>({
  nombre: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  distribuidor: { type: Object, required: true },
  opiniones: { type: Object },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: true },
});

const ProductoModel: Model<productoInterface> = model<productoInterface>(
  "productos",
  ProductoSchema
);
export default ProductoModel;
