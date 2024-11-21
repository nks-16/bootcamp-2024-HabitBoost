import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signupUser } from './services/apiService';  // Adjust import path if necessary

function Signup() {
  const navigate = useNavigate();  // To navigate after successful signup
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dateofbirth: '',
    password: ''
  });
  const [error, setError] = useState<string>('');  // For error messages

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that all fields are filled
    if (!formData.username || !formData.email || !formData.dateofbirth || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      // Call the signup API function
      await signupUser(formData.username, formData.email, formData.dateofbirth, formData.password);
      // Navigate to the login page after successful signup
      navigate('/');
    } catch (error) {
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form id="signupForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateofbirth">Date of Birth:</label>
          <input
            type="date"
            id="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}  {/* Display error if any */}
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;