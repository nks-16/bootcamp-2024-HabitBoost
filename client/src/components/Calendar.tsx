import React, { useEffect, useState } from 'react';
import './Calendar.css';

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

  useEffect(() => {
    fetchHabits();
    fetchHabitLogs();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits'); // Replace with your API endpoint
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const fetchHabitLogs = async () => {
    try {
      const response = await fetch('/api/habit-logs'); // Replace with your API endpoint
      const data = await response.json();
      setHabitLogs(data);
    } catch (error) {
      console.error('Error fetching habit logs:', error);
    }
  };

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

  const renderCalendarDays = () => {
    const daysInMonth = 28; // Example: Adjust for specific months if needed
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return days.map((day) => {
      const date = `2024-11-${String(day).padStart(2, '0')}`; // Example date generation
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
          <tr>
            {renderCalendarDays().slice(0, 7)}
          </tr>
          <tr>
            {renderCalendarDays().slice(7, 14)}
          </tr>
          <tr>
            {renderCalendarDays().slice(14, 21)}
          </tr>
          <tr>
            {renderCalendarDays().slice(21, 28)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
