import { Router } from "express";
import {
  crearProducto,
  getProductos,
  getunProducto,
  updateProducto,
  productoEliminado,
} from "../controllers/producto.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();
router.post(
  "/",
  validateJWT,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("sku", "El codigo sku es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatorio").not().isEmpty().isNumeric(),
    check("precio", "El precio es obligatorio").not().isEmpty().isNumeric(),
    validateFields,
  ],
  crearProducto
);
router.get("/", validateJWT, getProductos);
router.get("/:id", validateJWT, getunProducto);
router.delete("/:id", validateJWT, productoEliminado);
router.put("/:id", validateJWT, updateProducto);

export default router;
