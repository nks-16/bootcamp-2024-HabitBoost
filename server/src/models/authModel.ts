export const createUsersTable = `
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
export const insertUser = `
INSERT INTO users (username, email, dateofbirth ,password)
VALUES (?, ?, ?, ?);
`;

// SQL query to get user by username and password
// SQL query to get user by username and password
export const getUserByUsernameAndPassword = `
SELECT * FROM users WHERE username = ? AND password = ?;
`;
