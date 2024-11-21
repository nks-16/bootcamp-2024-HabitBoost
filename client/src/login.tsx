import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import'./index.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login logic here (e.g., authentication)
    alert('Welcome Back!');
    // Navigate to Dashboard
    navigate('/dashboard');
  };

  return (
    <>
      <div>
        <h1>HabitBoost</h1>
      </div>

      <div className="container">
        <h2>Login</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/Signup">Sign Up</Link>
        </p>
        <div className="image-container">
          <img src="/login" alt="Profile Image" /> {/* Make sure the path is correct */}
        </div>
      </div>
    </>
  );
};

export default Login;
