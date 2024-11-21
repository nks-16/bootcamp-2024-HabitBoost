import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Dashboard from './Dashboard';
import Signup from './Signup';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext'; // Import the AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <Router>
        <Routes>
          {/* Redirect to Dashboard if already logged in */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// PrivateRoute is a wrapper to protect routes
const PrivateRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const { currentUser } = useAuth(); // Access current user from AuthContext
  return currentUser ? <Component /> : <Navigate to="/" />; // Redirect to login if no user
};

export default App;
