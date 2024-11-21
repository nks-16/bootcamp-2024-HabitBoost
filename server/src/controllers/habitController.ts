// Create a new habit (POST)
import {db} from '../config/db'
export const createHabit = (userId: number, habitName: string, habitColor: string, goal: number) => {
    const query = `
      INSERT INTO Habits (UserID, HabitName, HabitColor, Goal) 
      VALUES (?, ?, ?, ?);
    `;
    
    return new Promise((resolve, reject) => {
      db.run(query, [userId, habitName, habitColor, goal], function (err) {
        if (err) {
          return reject({ message: err.message });
        }
        resolve({ message: 'Habit created successfully' });
      });
    });
  };

  export const getHabit = (userId: number, habitId: number) => {
    const query = `
      SELECT HabitID, HabitName, HabitColor, Goal 
      FROM Habits 
      WHERE UserID = ? AND HabitID = ?;
    `;
    
    return new Promise((resolve, reject) => {
      db.get(query, [userId, habitId], (err, row) => {
        if (err) {
           reject({ message: err.message });
           return;
        }
        resolve(row);
      });
    });
  };

  export const updateHabit = (habitId: number, habitName: string, habitColor: string, goal: number) => {
    const query = `
      UPDATE Habits 
      SET HabitName = ?, HabitColor = ?, Goal = ?
      WHERE HabitID = ?;
    `;
    
    return new Promise((resolve, reject) => {
      db.run(query, [habitName, habitColor, goal, habitId], function (err) {
        if (err) {
          return reject({ message: err.message });
        }
        resolve({ message: 'Habit updated successfully' });
      });
    });
  };
  

  export const deleteHabit = (habitId: number) => {
    const query = `
      DELETE FROM Habits 
      WHERE HabitID = ?;
    `;
    
    return new Promise((resolve, reject) => {
      db.run(query, [habitId], function (err) {
        if (err) {
          return reject({ message: err.message });
        }
        resolve({ message: 'Habit deleted successfully' });
      });
    });
  };