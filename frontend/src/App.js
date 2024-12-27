import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ContentAnalysis from './components/ContentAnalysis';
import UserReports from './components/UserReports';
import TrendAnalysis from './components/TrendAndReports';
// import AiInsights from './components/AiInsights';
import ModerationQueue from './components/ModerationQueue';
import ReportGeneration from './components/ReportGeneration';
import Settings from './components/Settings';
import InputForm from './components/input'; 
function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar /> {/* Sidebar remains on the left side */}
        
        <div className="main-content">
          {/* Routes for different components */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/content-analysis" element={<ContentAnalysis />} />
            <Route path="/reports" element={<UserReports />} />
            <Route path="/trend-analysis" element={<TrendAnalysis />} />
            {/* <Route path="/ai-insights" element={<AiInsights />} /> */}
            <Route path="/moderation-queue" element={<ModerationQueue />} />
            <Route path="/report-generation" element={<ReportGeneration />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
