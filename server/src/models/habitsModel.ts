import { db } from '../config/db';

// Create a new habit log (POST)
export const createHabitLog = (habitId: number, habitName: string) => {
  const query = `
    INSERT INTO HabitLog (HabitID, HabitName, Count) 
    VALUES (?, ?, 0);
  `;
  return new Promise((resolve, reject) => {
    db.run(query, [habitId, habitName], function (err) {
      if (err) {
        return reject(err.message);
      }
      resolve({ message: 'Habit count incremented' });
    });
  });
};

// Update the habit count (PUT)
export const updateHabitLog = (habitId: number, count: number) => {
  const query = `
    UPDATE HabitLog 
    SET Count = ?, Timestamp = CURRENT_TIMESTAMP 
    WHERE HabitID = ? 
      AND Timestamp = (SELECT MAX(Timestamp) FROM HabitLog WHERE HabitID = ?);
  `;
  return new Promise((resolve, reject) => {
    db.run(query, [count, habitId, habitId], function (err) {
      if (err) {
        return reject(err.message);
      }
      resolve({ message: 'Habit count updated' });
    });
  });
};

// Get habit log details (GET)
export const getHabitLog = (userId: number, habitId: number, startDate: string, endDate: string) => {
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
    db.all(query, [userId, habitId, startDate, endDate], (err, rows) => {
      if (err) {
        return reject(err.message);
      }
      resolve(rows);
    });
  });
};
