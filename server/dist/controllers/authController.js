"use strict";
// controllers/authController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const authModel_1 = require("../models/authModel"); // Assuming this query is defined
const db_1 = require("../config/db"); // Helper function for async DB queries
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Both username and password are required' });
        return;
    }
    console.log('Received username:', username);
    console.log('Received password:', password);
    try {
        // Use getAsync to query the database with the provided credentials
        const user = yield (0, db_1.getAsync)(authModel_1.getUserByUsernameAndPassword, [username, password]);
        console.log('User from DB:', user);
        if (!user) {
            console.log('No user found');
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        // If user is found, send a success message
        res.json({ message: 'Login successful!', user });
    }
    catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});
exports.loginUser = loginUser;
