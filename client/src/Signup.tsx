import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
function Signup(){
    return(
        <div className="container">
  <h2>Sign Up</h2>
  <form id="signupForm">
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input type="username" id="username" required />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" required />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" required/>
    </div>
    <button type="submit">Sign Up</button>
  </form>
  <p>
  Already have an account? <Link to="/">Login</Link>
  </p>
</div>

    )
}
export default Signup;