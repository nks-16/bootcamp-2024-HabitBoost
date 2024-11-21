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
const authModel_1 = require("../models/authModel"); // Assuming insertUser is defined in the authModel
const router = express_1.default.Router();
// Middleware to ensure table exists
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield req.app.locals.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        dateofbirth TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to prepare the database table' });
    }
}));
// POST /signup
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, dateofbirth, password } = req.body;
    console.log(req.body);
    if (!username || !email || !dateofbirth || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }
    try {
        // Use the insertUser query string and pass the values as an array
        yield req.app.locals.db.run(authModel_1.insertUser, [username, email, dateofbirth, password]);
        res.status(201).json({ message: 'Signup successful!' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add data' });
    }
}));
exports.default = router;
