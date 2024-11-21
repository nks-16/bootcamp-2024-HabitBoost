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

export const loginUser = (username: string,  password: string) => {
  return axios.post('http://localhost:5000/api/login', {
    username,
    password,
  });
};



/**
 * Fetch habit logs for a given user and habit within a date range.
 * @param userId - User ID
 * @param habitId - Habit ID
 */
const fetchHabitLogs = async (userId: number, habitId: number) => {
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

export default fetchHabitLogs;


