import { Router } from "express";
import {
  crearUsuario,
  getUsuarios,
  getunUsuario,
  updateUsuario,
  usuarioEliminado,
} from "../controllers/usuario.controller";
import { validatefields } from "../middlewares/validate-fields";
import { check } from "express-validator";

const router = Router();
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("numeroDocumento", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validatefields,
  ],
  crearUsuario
);
router.get("/", getUsuarios);
router.get("/:id", getunUsuario);
router.delete("/:id", usuarioEliminado);
router.put("/:id", updateUsuario);

export default router;
