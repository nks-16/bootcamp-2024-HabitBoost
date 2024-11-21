import { db } from '../config/db'; // Import the database instance

// Controller to create a new habit log
export const createHabitLog = (habitId: number, habitName: string, userId: number) => {
  const query = `
    INSERT INTO HabitLogs (habitId, HabitName, userId, Count, Date)
    VALUES (?, ?, ?, 0, CURRENT_DATE);
  `;

  return new Promise((resolve, reject) => {
    db.run(query, [habitId, habitName, userId], function (err) {
      if (err) {
        return reject({ message: err.message });
      }
      resolve({ message: 'Habit log created successfully' });
    });
  });
};

// Controller to update habit log count
export const updateHabitLog = (habitId: number, count: number) => {
  const query = `
    UPDATE HabitLogs
    SET Count = ?
    WHERE HabitID = ? AND Date = CURRENT_DATE;
  `;

  return new Promise((resolve, reject) => {
    db.run(query, [count, habitId], function (err) {
      if (err) {
        return reject({ message: err.message });
      }
      resolve({ message: 'Habit log updated successfully' });
    });
  });
};

// Controller to get habit log details
export const getHabitLog = (userId: number, habitId: number, startDate: string, endDate: string) => {
  const query = `
    SELECT HabitID, HabitName, Count, Date
    FROM HabitLogs
    WHERE UserID = ? AND HabitID = ? 
      AND Date BETWEEN ? AND ?;
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [userId, habitId, startDate, endDate], (err, rows) => {
      if (err) {
        return reject({ message: err.message });
      }
      resolve(rows);
    });
  });
};

// Controller to delete a habit log
export const deleteHabitLog = (userId: number, habitId: number) => {
  const query = `
    DELETE FROM HabitLogs
    WHERE userId = ? AND habitId = ? AND Date = CURRENT_DATE;
  `;

  return new Promise((resolve, reject) => {
    db.run(query, [userId, habitId], function (err) {
      if (err) {
        return reject({ message: err.message });
      }
      if (this.changes > 0) {
        resolve({ message: 'Habit log deleted successfully' });
      } else {
        resolve({ message: 'No habit log found to delete' });
      }
    });
  });
};
