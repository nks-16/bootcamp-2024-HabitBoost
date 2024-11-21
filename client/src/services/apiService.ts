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