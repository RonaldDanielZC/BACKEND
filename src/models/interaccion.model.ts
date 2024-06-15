import { Model, Schema, model } from "mongoose";

export const InteraccionSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  usuario: { type: Schema.Types.ObjectId, ref: "usuario", required: true },
  cliente: { type: Schema.Types.ObjectId, ref: "usuario", required: false },
});
export const InteraccionModel: Model<any> = model(
  "interaccion",
  InteraccionSchema
);
