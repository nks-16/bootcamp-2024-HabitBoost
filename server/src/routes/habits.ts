import { Router } from 'express';
import { createHabitLog, updateHabitLog, getHabitLog } from '../models/habitsModel';

const router = Router();

// POST request to create a new habit log
router.post('/log', async (req, res) => {
  const { habitId, habitName } = req.body;
  try {
    const result = await createHabitLog(habitId, habitName);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// PUT request to update habit log count
router.put('/log/:habitId', async (req, res) => {
  const { count } = req.body;
  const { habitId } = req.params;
  try {
    const result = await updateHabitLog(Number(habitId), count);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// GET request to get habit log details
router.get('/log/:userId/:habitId', async (req, res) => {
  const { userId, habitId } = req.params;
  const { startDate, endDate } = req.query;
  try {
    const logs = await getHabitLog(Number(userId), Number(habitId), startDate as string, endDate as string);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
