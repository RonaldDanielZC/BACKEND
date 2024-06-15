"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interaccion_controller_1 = require("../controllers/interaccion.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [(0, express_validator_1.check)("descripcion", "La descripcion es obligatoria").not().isEmpty()], interaccion_controller_1.crearInteraccion);
exports.default = router;
//# sourceMappingURL=interaccion.route.js.map