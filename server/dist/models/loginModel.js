"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsernameAndPassword = void 0;
exports.getUserByUsernameAndPassword = `
SELECT * FROM Users WHERE UserName = ? AND Password = ?;
`;
