import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Calendar from './components/Calendar';

const Dashboard: React.FC = () => {
  const [habits, setHabits] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    fetchHabits();
    fetchProgress();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch('/api/habits'); // Replace with actual API endpoint
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progress'); // Replace with actual API endpoint
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logged out');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>HabitBoost</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          {/* Calendar Component */}
          <Calendar />
        </aside>
        <main className="dashboard-main">
          <section className="daily-goals">
            <h2>Daily Goals</h2>
            <ul>
              {progress.map((item, index) => (
                <li key={index}>
                  <span>{item.habit}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(item.completed / item.target) * 100}%` }}
                    ></div>
                  </div>
                  <span>
                    {item.completed}/{item.target}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
