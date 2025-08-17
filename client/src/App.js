import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import CivicEngagement from './pages/CivicEngagement';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { neonColors } from './theme/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: neonColors.electricPink,
      light: neonColors.cyberLime,
      dark: neonColors.plasmaPurple,
    },
    secondary: {
      main: neonColors.holographicBlue,
      light: neonColors.electricTeal,
      dark: neonColors.sunsetOrange,
    },
    background: {
      default: 'transparent',
      paper: 'rgba(0, 0, 0, 0.3)',
    },
    text: {
      primary: '#ffffff',
      secondary: neonColors.electricTeal,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(15px)',
          border: `1px solid ${neonColors.plasmaPurple}40`,
        },
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<><Navbar /><Home /></>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
                <Route path="/civic" element={<><Navbar /><CivicEngagement /></>} />
                <Route path="/profile" element={<><Navbar /><Profile /></>} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${neonColors.electricPink}60`,
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
