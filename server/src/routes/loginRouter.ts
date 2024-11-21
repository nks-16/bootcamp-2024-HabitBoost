import express, { Request, Response } from 'express';
import { getUserByUsernameAndPassword } from '../models/authModel';  // Assuming this query is defined

const router = express.Router();

// POST /login
router.post('/', async (req: Request, res: Response) => { 

  const { username, password } = req.body;

  if (!username || !password) {
     res.status(400).json({ error: 'Both username and password are required' });
     return;
  }
 console.log(username);
 console.log(password);
  try {
    // Use the getUserByUsernameAndPassword query string and pass the values as an array
    const user = await req.app.locals.db.get(getUserByUsernameAndPassword, [username, password]);

    if (!user) {
      console.log(user);
       res.status(401).json({ error: 'Invalid username or password' });
       return;
    }

    res.json({ message: 'Login successful!', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

export default router;
