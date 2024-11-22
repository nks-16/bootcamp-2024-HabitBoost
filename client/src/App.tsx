import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Dashboard from './Dashboard';
import Signup from './Signup';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import the AuthProvider and useAuth hook

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/*<Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

/*
const PrivateRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const { currentUser } = useAuth(); // Access currentUser from AuthContext

  // If user is not logged in, redirect to login page
  return currentUser ? <Component /> : <Navigate to="/" />;
};
*/


export default App;
