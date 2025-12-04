import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Predictions from './pages/Predictions';
import Leaderboard from './pages/Leaderboard';
import PastPredictions from './pages/PastPredictions';
import Profile from './pages/Profile';

// Separate Navbar component that uses authentication
const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-nba-dark shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - Always clickable to go home */}
          <Link to="/" className="text-white text-xl font-bold hover:text-gray-300 transition-colors">
            🏀
          </Link>
          
          {/* Main Navigation - Only show for authenticated users */}
          {isAuthenticated && (
            <div className="hidden md:flex space-x-6">
              <Link to="/groups" className="text-gray-300 hover:text-white transition-colors">
                Groups
              </Link>
              <Link to="/predictions" className="text-gray-300 hover:text-white transition-colors">
                Predictions
              </Link>
              <Link to="/pastpredictions" className="text-gray-300 hover:text-white transition-colors">
                Past Predictions
              </Link>
              <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                Profile
              </Link>
            </div>
          )}

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-300 text-sm">
                  Welcome, {user?.username}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-nba-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile menu for authenticated users */}
        {isAuthenticated && (
          <div className="md:hidden pb-3">
            <div className="flex flex-wrap gap-2">
              <Link to="/groups" className="text-gray-300 hover:text-white text-sm">Groups</Link>
              <Link to="/predictions" className="text-gray-300 hover:text-white text-sm">Predictions</Link>
              <Link to="/pastpredictions" className="text-gray-300 hover:text-white text-sm">Past Predictions</Link>
              <Link to="/leaderboard" className="text-gray-300 hover:text-white text-sm">Leaderboard</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white text-sm">Profile</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/pastpredictions" element={<PastPredictions />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;