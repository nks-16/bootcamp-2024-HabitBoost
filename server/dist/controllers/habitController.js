"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHabit = exports.updateHabit = exports.getHabit = exports.createHabit = void 0;
// Create a new habit (POST)
const db_1 = require("../config/db");
const createHabit = (userId, habitName, habitColor, goal) => {
    const query = `
      INSERT INTO Habits (UserID, HabitName, HabitColor, Goal) 
      VALUES (?, ?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
        db_1.db.run(query, [userId, habitName, habitColor, goal], function (err) {
            if (err) {
                return reject({ message: err.message });
            }
            resolve({ message: 'Habit created successfully' });
        });
    });
};
exports.createHabit = createHabit;
const getHabit = (userId, habitId) => {
    const query = `
      SELECT HabitID, HabitName, HabitColor, Goal 
      FROM Habits 
      WHERE UserID = ? AND HabitID = ?;
    `;
    return new Promise((resolve, reject) => {
        db_1.db.get(query, [userId, habitId], (err, row) => {
            if (err) {
                reject({ message: err.message });
                return;
            }
            resolve(row);
        });
    });
};
exports.getHabit = getHabit;
const updateHabit = (habitId, habitName, habitColor, goal) => {
    const query = `
      UPDATE Habits 
      SET HabitName = ?, HabitColor = ?, Goal = ?
      WHERE HabitID = ?;
    `;
    return new Promise((resolve, reject) => {
        db_1.db.run(query, [habitName, habitColor, goal, habitId], function (err) {
            if (err) {
                return reject({ message: err.message });
            }
            resolve({ message: 'Habit updated successfully' });
        });
    });
};
exports.updateHabit = updateHabit;
const deleteHabit = (habitId) => {
    const query = `
      DELETE FROM Habits 
      WHERE HabitID = ?;
    `;
    return new Promise((resolve, reject) => {
        db_1.db.run(query, [habitId], function (err) {
            if (err) {
                return reject({ message: err.message });
            }
            resolve({ message: 'Habit deleted successfully' });
        });
    });
};
exports.deleteHabit = deleteHabit;
