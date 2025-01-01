import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ContentAnalysis from './components/ContentAnalysis';
import TrendAnalysis from './components/TrendAndReports';
import Settings from './components/Settings';
import InputForm from './components/input'; 
import Landing from './components/Landing';
import SignupForm from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Sidebar /> Sidebar remains on the left side */}
        
        <div className="main-content">
          {/* Routes for different components */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/content-analysis" element={<ContentAnalysis />} />
            <Route path="/trend-and-report" element={<TrendAnalysis />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
