import React, { useState, useEffect } from 'react';
import { fetchHabits, incrementGoal } from '../services/apiService'; 
import './DailyProgress.css';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

interface Habit {
  id: string; // Habit ID should be a string
  name: string;
  color: string;
  progress: number; // The current progress of the habit
  goal: number; // The goal for the habit
}

const DailyProgress: React.FC = () => {
  const { currentUser } = useAuth(); // Get currentUser from AuthContext
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch habits data from the backend, passing userId to the API
  const fetchHabitData = async () => {
    if (!currentUser?.id) {
      setError('User is not logged in.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetchHabits(currentUser.id); // Pass userId from AuthContext
      setHabits(response.data);
    } catch (err: any) {
      setError('Failed to fetch habits.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Increment goal for a habit, passing userId and habitId
  const handleIncrementGoal = async (habitId: string) => {
    if (!currentUser?.id) {
      setError('User is not logged in.');
      return;
    }

    try {
      await incrementGoal(currentUser.id, habitId); // Pass userId and habitId
      fetchHabitData(); // Refresh the habit data after goal increment
    } catch (err: any) {
      setError('Failed to increment goal.');
      console.error(err);
    }
  };

  // Use useEffect to fetch data on initial load
  useEffect(() => {
    if (currentUser?.id) {
      fetchHabitData();
    }
  }, [currentUser]);

  return (
    <div className="daily-progress-container">
      <h2>Daily Progress</h2>

      {loading && <p>Loading habits...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="habits-list">
        {habits.map((habit) => (
          <div className="habit-item" key={habit.id}>
            {/* Display Habit color as a dot */}
            <div className="habit-dot" style={{ backgroundColor: habit.color }}></div>

            {/* Habit Name */}
            <span className="habit-name">{habit.name}</span>

            {/* Progress Bar */}
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${(habit.progress / habit.goal) * 100}%`, // Calculate the width based on progress/goal
                  backgroundColor: habit.color,
                }}
              ></div>
            </div>

            {/* Increment Goal Button */}
            <button
              className="increment-button"
              onClick={() => handleIncrementGoal(habit.id)}
            >
              + Goal
            </button>
          </div>
        ))}
      </div>

      <button className="add-habit-button" onClick={fetchHabitData}>
        Add Habit
      </button>
    </div>
  );
};

export default DailyProgress;
