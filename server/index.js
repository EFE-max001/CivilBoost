require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Set default environment variables for development
process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
process.env.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'placeholder_key';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'development_jwt_secret_key_for_testing_only';
process.env.TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'placeholder_sid';
process.env.TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'placeholder_token';
process.env.TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID || 'placeholder_service';

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure server binds to localhost for development
const HOST = 'localhost';

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'CivilBoost API'
  });
});

// API routes
app.use('/api/auth', require('./routes/auth'));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Basic API info route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'CivilBoost API Server is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      register: '/api/auth/register',
      login: '/api/auth/login',
      sendVerification: '/api/auth/send-verification',
      forgotPassword: '/api/auth/forgot-password',
      verifyResetCode: '/api/auth/verify-reset-code',
      resetPassword: '/api/auth/reset-password',
      profile: '/api/auth/profile'
    }
  });
});

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 CivilBoost API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api/auth`);
});
