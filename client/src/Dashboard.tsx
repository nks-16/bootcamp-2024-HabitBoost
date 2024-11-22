import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [selectedHabit, setSelectedHabit] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [enableReminder, setEnableReminder] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);

  const habits: string[] = [
    'Exercise',
    'Read',
    'Meditate',
    'Drink Water',
    'Wake Up Early',
    'Sleep Early',
  ];

  const handleAddHabit = () => {
    setIsPopupVisible(true);
  };

  const handleSaveHabit = () => {
    setIsPopupVisible(false);
    alert('Saved successfully!');
  };

  const incrementProgress = () => {
    if (progress < goal) {
      setProgress((prev) => prev + 1);
    }
  };

  const handleHabitSelection = (habit: string) => {
    setSelectedHabit(habit);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo-container">
          <img src="" alt="Logo" className="logo" />
        </div>
        <div className="title">HabitBoost</div>
        <button className="logout-button">Logout</button>
      </nav>

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
              <td className="disabled"></td>
              <td className="disabled"></td>
              <td className="disabled"></td>
              <td className="disabled"></td>
              <td className="disabled"></td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
            <tr>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
            </tr>
            <tr>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
              <td>22</td>
              <td>23</td>
            </tr>
            <tr>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="right-section">
        <div className="add-habits-container">
          <h2>Add Habits</h2>
          <button id="addHabitBtn" className="plus-button" onClick={handleAddHabit}>
            +
          </button>
          {isPopupVisible && (
            <div id="habitPopup" className="popup">
              <div className="popup-content">
                <span
                  className="close-btn"
                  onClick={() => setIsPopupVisible(false)}
                >
                  &times;
                </span>
                <h2>Add New Habit</h2>
                <input
                  type="text"
                  placeholder="Search habits..."
                  className="search-box"
                  value={selectedHabit}
                  readOnly
                />
                <div className="habit-list-container">
                  <ul className="habit-list">
                    {habits.map((habit) => (
                      <li
                        key={habit}
                        className="habit-item"
                        onClick={() => handleHabitSelection(habit)}
                      >
                        {habit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="color-section">
                  <label>Select Color:</label>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
                <div className="goal-section">
                  <label>Set a Goal:</label>
                  <input
                    type="text"
                    placeholder="e.g., 30 minutes"
                    onChange={(e) => setGoal(Number(e.target.value))}
                  />
                </div>
                <div className="reminder-section">
                  <label>Enable Reminders:</label>
                  <input
                    type="checkbox"
                    checked={enableReminder}
                    onChange={(e) => setEnableReminder(e.target.checked)}
                  />
                </div>
                <button type="button" className="save-button" onClick={handleSaveHabit}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div id="progressBarContainer" className="progress-bar-container">
        <h2>Progress Tracker</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${goal > 0 ? (progress / goal) * 100 : 0}%`,
              backgroundColor: selectedColor,
            }}
          ></div>
        </div>
        <button className="plus-button" onClick={incrementProgress}>
          +
        </button>
        <p>
          {selectedHabit}: {progress}/{goal}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
