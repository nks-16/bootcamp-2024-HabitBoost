// controllers/authController.ts

import { Request, Response } from 'express';
import { getUserByUsernameAndPassword } from '../models/authModel';  // Assuming this query is defined
import { getAsync } from '../config/db';  // Helper function for async DB queries

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Both username and password are required' });
    return;
  }

  console.log('Received username:', username);
  console.log('Received password:', password);

  try {
    // Use getAsync to query the database with the provided credentials
    const user = await getAsync(getUserByUsernameAndPassword, [username, password]);
    console.log('User from DB:', user);

    if (!user) {
      console.log('No user found');
      res.status(401).json({ error: 'Invalid username or password' });
      return ;
    }

    // If user is found, send a success message
    res.json({ message: 'Login successful!', user });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
