import React, { useState, useEffect } from 'react';
import './Dashboard.css';

interface HabitData {
  day: string;
  percentage: number;
  target: number;
}

interface HabitResponse {
  [key: string]: HabitData[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<HabitResponse>({});
  const [selectedHabit, setSelectedHabit] = useState<string>("Exercise");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/habits"); // Replace with your API URL
        const result: HabitResponse = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHabitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHabit(event.target.value);
  };

  if (loading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!data[selectedHabit]) {
    return (
      <div className="App">
        <h1>Habit Tracker</h1>
        <p>No data available for the selected habit.</p>
      </div>
    );
  }

  const bars = data[selectedHabit];

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <div className="dropdown">
        <label htmlFor="habit-select">Select a habit: </label>
        <select id="habit-select" value={selectedHabit} onChange={handleHabitChange}>
          {Object.keys(data).map((habit) => (
            <option key={habit} value={habit}>{habit}</option>
          ))}
        </select>
      </div>

      <div className="chart-container">
        <div className="chart">
          {bars.map((bar, index) => (
            <div
              key={index}
              className="bar"
              style={{
                height: `${bar.percentage * 3}px`,
                backgroundColor: bar.percentage >= bar.target ? 'gray' : 'red'
              }}
            >
              <span className="bar-label">{bar.day}</span>
              <span className="bar-percentage">{bar.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
