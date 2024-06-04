import { Router } from "express";
import {
  crearProducto,
  getProductos,
  getunProducto,
  updateProducto,
  productoEliminado,
} from "../controllers/producto.controller";
import { check } from "express-validator";
import { validatefields } from "../middlewares/validate-fields";

const router = Router();
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("SKU", "El codigo SKU es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatorio").not().isEmpty().isNumeric(),
    check("precio", "El precio es obligatorio").not().isEmpty().isNumeric(),
    validatefields,
  ],
  crearProducto
);
router.get("/", getProductos);
router.get("/:id", getunProducto);
router.delete("/:id", productoEliminado);
router.put("/:id", updateProducto);

export default router;
