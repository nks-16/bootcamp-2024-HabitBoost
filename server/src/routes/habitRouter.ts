import { Router } from 'express';
import { createHabit, getHabit, updateHabit, deleteHabit } from '../controllers/habitController';

const app = Router();

// Create a new habit (POST)
app.post('/habits', async (req, res) => {
  const { userId, habitName, habitColor, goal } = req.body;
  console.log(req.body);
  // if (!userId || !habitName || !goal) {
  //   res.status(400).send({ message: 'Missing required fields' });
  //   return ;
  // }

  try {
    const result = await createHabit(userId, habitName, habitColor, goal);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    console.error(`Error creating habit: `);
    res.status(500).send({ message: 'An error occurred while creating the habit' });
  }
});

// Get habit details (GET)
app.get('/habits/:userId/:habitId', async (req, res) => {
  const { userId, habitId } = req.params;
  if (!userId || !habitId) {
    res.status(400).send({ message: 'Missing required parameters' });
    return ;
  }

  try {
    const habit = await getHabit(Number(userId), Number(habitId));
    if (!habit) {
      res.status(404).send({ message: 'Habit not found' });
      return ;
    }
    res.status(200).send(habit);
  } catch (error) {
    console.error(`Error fetching habit: `);
    res.status(500).send({ message: 'An error occurred while fetching the habit' });
  }
});

// Update an existing habit (PUT)
app.put('/habits/:habitId', async (req, res) => {
  const { habitName, habitColor, goal } = req.body;
  const { habitId } = req.params;

  if (!habitId || !habitName || !goal) {
     res.status(400).send({ message: 'Missing required fields' });
     return;
  }

  try {
    const result = await updateHabit(Number(habitId), habitName, habitColor, goal);
    res.status(200).send(result);
  } catch (error) {
    console.error(`Error updating habit: `);
    res.status(500).send({ message: 'An error occurred while updating the habit' });
  }
});

// Delete a habit (DELETE)
app.delete('/habits/:habitId', async (req, res) => {
  const { habitId } = req.params;
  if (!habitId) {
    res.status(400).send({ message: 'Habit ID is required' });
    return;
  }

  try {
    const result = await deleteHabit(Number(habitId));
    res.status(200).send(result);
  } catch (error) {
    console.error(`Error deleting habit`);
    res.status(500).send({ message: 'An error occurred while deleting the habit' });
  }
});

export default app;
