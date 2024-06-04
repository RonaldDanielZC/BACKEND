"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("SKU", "El codigo SKU es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("cantidad", "La cantidad es obligatorio").not().isEmpty().isNumeric(),
    (0, express_validator_1.check)("precio", "El precio es obligatorio").not().isEmpty().isNumeric(),
    validate_fields_1.validatefields,
], producto_controller_1.crearProducto);
router.get("/", producto_controller_1.getProductos);
router.get("/:id", producto_controller_1.getunProducto);
router.delete("/:id", producto_controller_1.productoEliminado);
router.put("/:id", producto_controller_1.updateProducto);
exports.default = router;
//# sourceMappingURL=producto.route.js.map