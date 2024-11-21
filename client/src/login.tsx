import React, { useEffect, useState } from 'react';
import './App.css'; // Assuming you have the CSS file in the same directory

const Login = () => {
  return (
    <div id="Main">
      {/* Meta tags are typically added in the public/index.html file */}
      <div className="container">
        <h2>Login</h2>
        <form id="loginForm">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="signup.html">Sign Up</a>
        </p>
      </div>
      <div className="image-container">
        <img src="profile" alt="Profile Image" />
      </div>
    </div>
  );
};

export default Login;
