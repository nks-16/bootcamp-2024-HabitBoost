import sqlite3 from 'sqlite3';

// Open the SQLite database and ensure it's initialized
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Database opening error:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Wrap db functions with Promises for easier async/await usage
const getAsync = (query: string, params: any[]) => {
  return new Promise<any>((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const runAsync = (query: string, params: any[]) => {
  return new Promise<void>((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export { db, getAsync, runAsync };
