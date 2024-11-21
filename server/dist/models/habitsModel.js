"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHabitLog = exports.updateHabitLog = exports.createHabitLog = void 0;
const db_1 = require("../config/db");
// Create a new habit log (POST)
const createHabitLog = (habitId, habitName) => {
    const query = `
    INSERT INTO HabitLog (HabitID, HabitName, Count) 
    VALUES (?, ?, 0);
  `;
    return new Promise((resolve, reject) => {
        db_1.db.run(query, [habitId, habitName], function (err) {
            if (err) {
                return reject(err.message);
            }
            resolve({ message: 'Habit count incremented' });
        });
    });
};
exports.createHabitLog = createHabitLog;
// Update the habit count (PUT)
const updateHabitLog = (habitId, count) => {
    const query = `
    UPDATE HabitLog 
    SET Count = ?, Timestamp = CURRENT_TIMESTAMP 
    WHERE HabitID = ? 
      AND Timestamp = (SELECT MAX(Timestamp) FROM HabitLog WHERE HabitID = ?);
  `;
    return new Promise((resolve, reject) => {
        db_1.db.run(query, [count, habitId, habitId], function (err) {
            if (err) {
                return reject(err.message);
            }
            resolve({ message: 'Habit count updated' });
        });
    });
};
exports.updateHabitLog = updateHabitLog;
// Get habit log details (GET)
const getHabitLog = (userId, habitId, startDate, endDate) => {
    const query = `
    SELECT 
      h.HabitID, 
      h.HabitName, 
      h.HabitColor, 
      h.Goal, 
      hl.Count, 
      hl.Timestamp
    FROM 
      Habits h
    JOIN 
      HabitLog hl ON h.HabitID = hl.HabitID
    WHERE 
      h.UserID = ? 
      AND h.HabitID = ? 
      AND hl.Timestamp >= ? 
      AND hl.Timestamp <= ?;
  `;
    return new Promise((resolve, reject) => {
        db_1.db.all(query, [userId, habitId, startDate, endDate], (err, rows) => {
            if (err) {
                return reject(err.message);
            }
            resolve(rows);
        });
    });
};
exports.getHabitLog = getHabitLog;
