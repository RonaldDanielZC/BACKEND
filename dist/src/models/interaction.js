"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteraccionModel = exports.InteraccionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.InteraccionSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: true },
    cliente: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: true },
});
exports.InteraccionModel = (0, mongoose_1.model)("interaccion", exports.InteraccionSchema);
//# sourceMappingURL=interaction.js.map