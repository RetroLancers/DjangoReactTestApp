import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import DogTypesPage from './pages/DogTypesPage';
import PlayerListPage from './pages/PlayerListPage';
import PlayerRankingPage from './pages/PlayerRankingPage'; // Import PlayerRankingPage
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { authService } from './services/authService';
import { AuthContext } from './contexts/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="p-6 text-center bg-white shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">RetroTest</h1>
            <nav>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/players" className="text-sm text-blue-600 hover:text-blue-800">Players</Link>
                  <Link to="/rankings" className="text-sm text-blue-600 hover:text-blue-800">Rankings</Link>
                  <Link to="/dog-types" className="text-sm text-blue-600 hover:text-blue-800">Dog Types</Link>
                  <span className="text-sm">Hello, {user?.username}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800">
                    Login
                  </Link>
                  <Link to="/register" className="text-sm text-blue-600 hover:text-blue-800">
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
          <p className="text-sm text-gray-500">Now powered by Tailwind CSS</p>
        </header>
        <main className="container mx-auto p-6">
          <Routes>
            <Route 
              path="/dog-types" 
              element={isAuthenticated ? <DogTypesPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/players" 
              element={isAuthenticated ? <PlayerListPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/rankings" 
              element={isAuthenticated ? <PlayerRankingPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/players" /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;