import React, { useState } from 'react';
import Dashboard  from './Dashboard';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can add the login logic here 
    alert(`Welcome Back!`);
    //Navigating to Dashboard
    navigate('/Dashboard');
  };

  return (
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
        Don't have an account? <a href="signup.html">Sign Up</a>
      </p>
      <div className="image-container">
        <img src="path-to-your-image.jpg" alt="Profile Image" /> {/* Make sure the path is correct */}
      </div>
    </div>
  );
};

export default Login;
