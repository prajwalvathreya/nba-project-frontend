import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple navigation bar */}
        <nav className="bg-nba-dark shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="text-white text-xl font-bold">
                🏀 NBA Predictions
              </div>
              <div className="space-x-6">
                <a href="/" className="text-gray-300 hover:text-white">Home</a>
                <a href="/login" className="text-gray-300 hover:text-white">Login</a>
                <a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;