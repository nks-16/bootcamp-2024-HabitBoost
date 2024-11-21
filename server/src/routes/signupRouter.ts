import express, { Request, Response, NextFunction } from 'express';
import { insertUser } from '../models/authModel';  // Assuming insertUser is defined in the authModel

const router = express.Router();

// Middleware to ensure table exists
router.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await req.app.locals.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        dateofbirth TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to prepare the database table' });
  }
});

// POST /signup
router.post('/', async (req: Request, res: Response) => {  // Adjusted route to use base '/signup'
  const { username, email, dateofbirth, password } = req.body;
  console.log(req.body);
  if (!username || !email || !dateofbirth || !password) {
     res.status(400).json({ error: 'All fields are required' });
     return;
  }

  try {
    // Use the insertUser query string and pass the values as an array
    await req.app.locals.db.run(insertUser, [username, email, dateofbirth, password]);
    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add data' });
  }
});

export default router;
