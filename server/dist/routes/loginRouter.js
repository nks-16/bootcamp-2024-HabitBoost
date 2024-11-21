"use strict";
// routes/authRouter.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController"); // Import the controller
const router = express_1.default.Router();
// POST /login route - connect to the loginUser controller
router.post('/login', authController_1.loginUser);
exports.default = router;
