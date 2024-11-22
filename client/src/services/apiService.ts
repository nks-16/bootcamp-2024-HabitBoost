import axios from 'axios';

export const fetchSampleData = () => {
  return axios.get<{ id: number; name: string }[]>('http://localhost:5000/api/sample');
};

export const signupUser = (username: string, email: string, dateofbirth: string, password: string) => {
  return axios.post('http://localhost:5000/api/signup', {
    username,
    email,
    dateofbirth,
    password,
  });
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', {
      username,
      password,
    });

    // Assuming the `userId` is returned in the response data
    const { userId } = response.data;

    // Store the `userId` in local storage
    if (userId) {
      localStorage.setItem('userId', userId);
      console.log('UserId stored in localStorage:', userId);
    } else {
      console.error('UserId not found in the response.');
    }

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};







/**
 * Fetch habit logs for a given user and habit within a date range.
 * @param userId - User ID
 * @param habitId - Habit ID
 */
 export const fetchHabitLogs = async (userId: number, habitId: number) => {
  // Get the current date
  const now = new Date();

  // Determine the start and end dates for the current month
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

  try {
    // Replace the base URL with your actual backend API URL
    const response = await axios.get(`/api/habitslogs/log/${userId}/${habitId}`, {
      params: {
        startDate,
        endDate,
      },
    });

    return response.data; // Logs fetched from the server
  } catch (error) {
    console.error('Error fetching habit logs:', error);
    throw error;
  }
};



export const saveHabit = (habitData: { name: string, color: string, goal: string, reminder: boolean }) => {
  return axios.post('http://localhost:5000/api/habits', habitData);
};



// Fetch all habits

// The base URL for your API
const API_URL = 'http://localhost:5000/api'; // Adjust to your server URL if necessary

// Fetch habits for a specific user
export const fetchHabits = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/habits/${userId}`);
    return response.data; // Return the fetched habits
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};

// Increment goal for a habit
export const incrementGoal = async (userId: string, habitId: string) => {
  try {
    const response = await axios.put(`${API_URL}/habits/log/${userId}/${habitId}`, {
      count: 1, // Increment by 1 (or pass any count value you need)
    });
    return response.data; // Return the updated habit data
  } catch (error) {
    console.error("Error incrementing habit goal:", error);
    throw error;
  }
};
