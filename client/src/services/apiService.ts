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

export const fetchHabitsAPI = async () => {
  const response = await fetch('/api/habits');
  if (!response.ok) throw new Error('Failed to fetch habits');
  return await response.json();
};

export const fetchHabitLogsAPI = async () => {
  const response = await fetch('/api/habit-logs');
  if (!response.ok) throw new Error('Failed to fetch habit logs');
  return await response.json();
};

