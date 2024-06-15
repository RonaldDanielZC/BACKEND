import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  cambioContrasena,
  login,
  olvidoContrasena,
} from "../controllers/auth.controller";
import { validateJWT, validateJWTPass } from "../middlewares/validate-jwt";

const router = Router();
router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  "/olvidocontrasena",
  [
    check("email", "El email es oblogatorio").isEmail().not().isEmpty(),
    check("numeroDocumento", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    validateFields,
  ],
  olvidoContrasena
);

router.put(
  "/cambiocontrasena",
  validateJWTPass,
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],

  cambioContrasena
);
export default router;
