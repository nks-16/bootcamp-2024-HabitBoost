"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
// Initialize SQLite database connection
const db = new sqlite3_1.default.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Database opening error: ', err);
    }
    else {
        console.log('Connected to SQLite database.');
    }
});
exports.db = db;
