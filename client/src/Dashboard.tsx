import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login'; // The login form component
//import Dashboard from './Dashboard'; // The dashboard component

const Dashboard: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/*<Route path="/dashboard" element={<Dashboard/>} />*/}
      </Routes>
    </Router>
  );
};

export default Dashboard;
