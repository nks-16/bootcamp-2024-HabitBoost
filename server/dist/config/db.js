"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAsync = exports.getAsync = exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
// Open the SQLite database and ensure it's initialized
const db = new sqlite3_1.default.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Database opening error:', err);
    }
    else {
        console.log('Connected to SQLite database.');
    }
});
exports.db = db;
// Wrap db functions with Promises for easier async/await usage
const getAsync = (query, params) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
        });
    });
};
exports.getAsync = getAsync;
const runAsync = (query, params) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.runAsync = runAsync;
