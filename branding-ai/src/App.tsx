import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Auth from './components/Auth';
import Home from './pages/Home';
import Results from './pages/Results';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
