"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHabitLog = exports.updateHabitLog = exports.createHabitLog = void 0;
const db_1 = require("../config/db"); // Import the database instance
// Controller to create a new habit log
const createHabitLog = (habitId, habitName) => {
    const query = `
    INSERT INTO HabitLogs ( habitId, HabitName,userId, Count, Date)
    VALUES (?, ?,?, 0, CURRENT_DATE);
  `;
    return new Promise((resolve, reject) => {
        db_1.db.run(query, [habitId, habitName], function (err) {
            if (err) {
                return reject({ message: err.message });
            }
            resolve({ message: 'Habit log created successfully' });
        });
    });
};
exports.createHabitLog = createHabitLog;
// Controller to update habit log count
const updateHabitLog = (habitId, count) => {
    const query = `
    UPDATE HabitLogs
    SET Count = ?
    WHERE HabitID = ? AND Date = CURRENT_DATE;
  `;
    return new Promise((resolve, reject) => {
        db_1.db.run(query, [count, habitId], function (err) {
            if (err) {
                return reject({ message: err.message });
            }
            resolve({ message: 'Habit log updated successfully' });
        });
    });
};
exports.updateHabitLog = updateHabitLog;
// Controller to get habit log details
const getHabitLog = (userId, habitId, startDate, endDate) => {
    const query = `
    SELECT HabitID, HabitName, Count, Date
    FROM HabitLogs
    WHERE UserID = ? AND HabitID = ? 
      AND Date BETWEEN ? AND ?;
  `;
    return new Promise((resolve, reject) => {
        db_1.db.all(query, [userId, habitId, startDate, endDate], (err, rows) => {
            if (err) {
                return reject({ message: err.message });
            }
            resolve(rows);
        });
    });
};
exports.getHabitLog = getHabitLog;
