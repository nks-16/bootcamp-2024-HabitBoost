import React from 'react';
import Calendar from './components/Calendar'; // Import the Calendar component
import AddHabit from './components/AddHabits'; // Import the AddHabit component
import './Dashboard.css'; // Optional: Dashboard-specific styles

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      {/* Calendar Section */}
      <section className="calendar-section">
        <Calendar />
      </section>

      {/* Add Habit Section */}
      <section className="add-habit-section">
        <AddHabit />
      </section>
    </div>
  );
};

export default Dashboard;
