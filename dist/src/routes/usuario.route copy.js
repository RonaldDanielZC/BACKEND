"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const validate_fields_1 = require("../middlewares/validate-fields");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("numeroDocumento", "El numero de documento es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail(),
    validate_fields_1.validatefields,
], usuario_controller_1.crearUsuario);
router.get("/", usuario_controller_1.getUsuarios);
router.get("/:id", usuario_controller_1.getunUsuario);
router.delete("/:id", usuario_controller_1.usuarioEliminado);
router.put("/:id", usuario_controller_1.updateUsuario);
exports.default = router;
//# sourceMappingURL=usuario.route%20copy.js.map