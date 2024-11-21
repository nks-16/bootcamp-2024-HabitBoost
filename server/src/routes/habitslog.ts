import { Router } from 'express';
import { createHabitLog, updateHabitLog, getHabitLog, deleteHabitLog } from '../controllers/habitLogController';

const router = Router();

// POST request to create a new habit log
router.post('/log', async (req, res) => {
<<<<<<< HEAD:server/src/routes/habits.ts
  const { habitId, habitName } = req.body;
  console.log(habitName);
=======
  const { habitId, habitName, userId } = req.body;
>>>>>>> ede81f7e9e08fceb75e620ad85213242d689aa58:server/src/routes/habitslog.ts
  try {
    const result = await createHabitLog(habitId, habitName, userId);
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

// DELETE request to delete a habit log
router.delete('/log/:userId/:habitId', async (req, res) => {
  const { userId, habitId } = req.params;
  
  try {
    const result = await deleteHabitLog(Number(userId), Number(habitId));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
