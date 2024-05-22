"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.apiPaths = {};
        this.app = (0, express_1.default)();
        this.port = "3000";
        this.miPrimerApi();
    }
    miPrimerApi() {
        this.app.get("/", (req, res) => res.status(200).json({ msg: "Api funcionando" }));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo por el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map