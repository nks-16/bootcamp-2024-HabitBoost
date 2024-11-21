import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from './services/apiService';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error handling
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call the login API function
      await loginUser(username, password);
      alert('Welcome Back!');
      // Navigate to Dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to log in. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <div>
        <h1>HabitBoost</h1>
      </div>

      <div className="container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>} {/* Display error message */}
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
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <div className="image-container">
        <img src={require('./logo-png.png')} alt="Profile" />{/* Update path as necessary */}
        </div>
      </div>
    </>
  );
};

export default Login;
