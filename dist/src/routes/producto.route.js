"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("sku", "El codigo sku es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("cantidad", "La cantidad es obligatorio").not().isEmpty().isNumeric(),
    (0, express_validator_1.check)("precio", "El precio es obligatorio").not().isEmpty().isNumeric(),
    validate_fields_1.validateFields,
], producto_controller_1.crearProducto);
router.get("/", validate_jwt_1.validateJWT, producto_controller_1.getProductos);
router.get("/:id", validate_jwt_1.validateJWT, producto_controller_1.getunProducto);
router.delete("/:id", validate_jwt_1.validateJWT, producto_controller_1.productoEliminado);
router.put("/:id", validate_jwt_1.validateJWT, producto_controller_1.updateProducto);
exports.default = router;
//# sourceMappingURL=producto.route.js.map