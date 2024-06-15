import { Router } from "express";
import {
  crearUsuario,
  getUsuarios,
  getunUsuario,
  updateUsuario,
  usuarioEliminado,
} from "../controllers/usuario.controller";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();
router.post(
  "/",
  validateJWT,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("numeroDocumento", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validateFields,
  ],
  crearUsuario
);
router.get("/", validateJWT, getUsuarios);
router.get("/:id", validateJWT, getunUsuario);
router.delete("/:id", validateJWT, usuarioEliminado);
router.put("/:id", validateJWT, updateUsuario);

export default router;
