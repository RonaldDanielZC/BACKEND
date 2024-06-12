import { Router } from "express";
import { check } from "express-validator";
import { validatefields } from "../middlewares/validate-fields";
import { login } from "../controllers/auth.controller";

const router = Router();
router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("password", "La contyraseña es obligatoria").not().isEmpty(),
    validatefields,
  ],
  login
);

export default router;
