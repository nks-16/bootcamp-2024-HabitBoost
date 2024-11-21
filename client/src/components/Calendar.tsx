import React, { useEffect, useState } from 'react';
import './Calendar.css';
import '../services/apiService'
import axios from 'axios';

type Habit = {
  id: number;
  name: string;
  color: string; // Unique color for each habit
};

type HabitLog = {
  date: string; // Date in YYYY-MM-DD format
  habits: number[]; // Array of habit IDs completed on this date
};

const Calendar: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHabits();
    fetchHabitLogs();
  }, []);

  // Fetch habits
  const fetchHabits = async () => {
    try {
      const response = await axios.get('/api/habits'); // Replace with your API endpoint
      setHabits(response.data);
    } catch (error) {
      setError('Error fetching habits');
      console.error('Error fetching habits:', error);
    }
  };

  // Fetch habit logs for the current month
  const fetchHabitLogs = async () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    try {
      const response = await axios.get('/api/habitlogs', {
        params: { startDate, endDate }, // Pass the date range as query parameters
      });
      setHabitLogs(response.data);
    } catch (error) {
      setError('Error fetching habit logs');
      console.error('Error fetching habit logs:', error);
    }
  };

  // Render dots for completed habits on a specific date
  const renderDots = (date: string) => {
    const logsForDate = habitLogs.find((log) => log.date === date);
    if (!logsForDate) return null;

    return (
      <div className="dots">
        {logsForDate.habits.map((habitId) => {
          const habit = habits.find((h) => h.id === habitId);
          return habit ? (
            <span
              key={habitId}
              className="dot"
              style={{ backgroundColor: habit.color }}
            ></span>
          ) : null;
        })}
      </div>
    );
  };

  // Generate calendar days for the current month
  const renderCalendarDays = () => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return days.map((day) => {
      const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return (
        <td key={day}>
          {day}
          {renderDots(date)}
        </td>
      );
    });
  };

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <h2>November 2024</h2>
        <div className="icons">
          <span className="icon notification"></span>
          <span className="icon menu"></span>
        </div>
      </header>
      {error && <p className="error-message">{error}</p>}
      <table className="calendar">
        <thead>
          <tr>
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        <tbody>
          <tr>{renderCalendarDays().slice(0, 7)}</tr>
          <tr>{renderCalendarDays().slice(7, 14)}</tr>
          <tr>{renderCalendarDays().slice(14, 21)}</tr>
          <tr>{renderCalendarDays().slice(21, 28)}</tr>
          <tr>{renderCalendarDays().slice(28)}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
