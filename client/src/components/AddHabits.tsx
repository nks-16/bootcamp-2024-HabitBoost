import React, { useState } from 'react';
import './AddHabits.css';
import { saveHabit } from '../services/apiService'; // Adjust import based on file structure
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const userId = localStorage.getItem('userId');
console.log('Retrieved userId:', userId);
const AddHabit: React.FC = () => {
  //const { currentUser } = useAuth(); // Get userId from AuthContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [reminder, setReminder] = useState(false); // Reminder state (checkbox)
  const [color, setColor] = useState('#FF0000'); // Default to red
  const [goal, setGoal] = useState(''); // Goal is now a string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert('User is not logged in.');
      return;
    }

    const habitData = {
      name: habitName,  // Match the expected 'name' property
      color,            // Use the hex color value here
      goal,             // Keep goal as a string
      reminder,         // Add reminder status (from the checkbox)
    };

    try {
      setLoading(true);
      setError(null);

      // Call the saveHabit API function
      const response = await saveHabit(habitData);

      console.log('Response from API:', response.data);

      // Reset the form and close the modal on successful submission
      setHabitName('');
      setReminder(false);  // Reset reminder
      setColor('#FF0000');  // Reset to default color
      setGoal('');
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Error saving habit:', err);
      setError(err.response?.data?.message || 'Failed to save habit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-habit-container">
      {/* Add Habit Button */}
      <button onClick={handleOpenModal} className="add-habit-button">
        Add Habit
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Small Close Button */}
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
            <h2>Add New Habit</h2>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Habit Name Field */}
              <label htmlFor="habit">Habit Name:</label>
              <input
                type="text"
                id="habit"
                name="habit"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
              />

              {/* Reminder Checkbox */}
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                />
                Enable Reminder
              </label>

              {/* Color Dropdown */}
              <label htmlFor="color">Select Color:</label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="#FF0000">Red</option>
                <option value="#0000FF">Blue</option>
                <option value="#008000">Green</option>
                <option value="#FFFF00">Yellow</option>
                <option value="#800080">Purple</option>
              </select>

              {/* Goal Field */}
              <label htmlFor="goal">Set Goal (String):</label>
              <input
                type="text"
                id="goal"
                name="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)} // Goal is still a string
                required
              />

              {/* Save Button */}
              <button type="submit" className="save-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddHabit;
