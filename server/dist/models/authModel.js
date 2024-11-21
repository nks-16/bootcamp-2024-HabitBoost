"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsernameAndPassword = exports.insertUser = exports.createUsersTable = void 0;
exports.createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    dateofbirth TEXT NOT NULL,
    password TEXT NOT NULL
  );
`;
// authModel.ts
// SQL query for inserting a user
exports.insertUser = `
INSERT INTO users (username, email, dateofbirth ,password)
VALUES (?, ?, ?, ?);
`;
// SQL query to get user by username and password
// SQL query to get user by username and password
exports.getUserByUsernameAndPassword = `
SELECT * FROM users WHERE username = ? AND password = ?;
`;
