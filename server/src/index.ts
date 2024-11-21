import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { db } from './config/db'; // Import the SQLite database instance
import signupRoute from './routes/signupRouter';
import loginRoute from './routes/loginRouter';
import habitsRoutes from './routes/habits';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Attach the database instance to app.locals
app.locals.db = db;

// Routes
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/habits', habitsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
