import { Schema, Model, model } from "mongoose";
const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
  },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

const ProductoModel: Model<any> = model("productos", ProductoSchema);
export default ProductoModel;
