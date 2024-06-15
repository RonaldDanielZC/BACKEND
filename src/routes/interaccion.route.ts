import { Router } from "express";
import { crearInteraccion } from "../controllers/interaccion.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { check } from "express-validator";

const router = Router();

router.post(
  "/",
  validateJWT,
  [check("descripcion", "La descripcion es obligatoria").not().isEmpty()],
  crearInteraccion
);

export default router;
