// routes/authRouter.ts

import express from 'express';
import { loginUser } from '../controllers/authController';  // Import the controller

const router = express.Router();

// POST /login route - connect to the loginUser controller
router.post('/login', loginUser);

export default router;
