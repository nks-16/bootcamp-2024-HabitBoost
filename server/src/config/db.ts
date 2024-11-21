import sqlite3 from 'sqlite3';

// Initialize SQLite database connection
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

export { db };
