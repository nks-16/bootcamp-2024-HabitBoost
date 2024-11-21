"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = exports.createUsersTable = void 0;
exports.createUsersTable = `
  CREATE TABLE IF NOT EXISTS Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserName TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    DOB DATE
  );
`;
exports.insertUser = `
INSERT INTO users (UserName,Emai, Password, DOB)
VALUES (?, ?, ?, ?);
`;
