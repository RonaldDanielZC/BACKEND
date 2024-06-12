"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("password", "La contyraseña es obligatoria").not().isEmpty(),
    validate_fields_1.validatefields,
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.route.js.map