"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authModel_1 = require("../models/authModel"); // Assuming this query is defined
const router = express_1.default.Router();
// POST /login
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Both username and password are required' });
        return;
    }
    console.log(username);
    console.log(password);
    try {
        // Use the getUserByUsernameAndPassword query string and pass the values as an array
        const user = yield req.app.locals.db.get(authModel_1.getUserByUsernameAndPassword, [username, password]);
        if (!user) {
            console.log(user);
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        res.json({ message: 'Login successful!', user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to login' });
    }
}));
exports.default = router;
