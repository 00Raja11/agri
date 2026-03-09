// ===============================
// AUTH ROUTES DEBUG INFO
// ===============================
console.log('🔥🔥🔥 AUTH ROUTES FILE LOADED! 🔥🔥🔥');
console.log('Current time:', new Date().toISOString());
console.log('Routes being registered:');
console.log('  - GET /test');
console.log('  - GET /debug-users');
console.log('  - POST /register');
console.log('  - POST /login');
console.log('  - POST /forgot-password');
console.log('  - POST /reset-password/:token');
console.log('  - GET /verify-reset-token/:token');
console.log('  - GET /me');

import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// ===============================
// Generate JWT Token
// ===============================
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// ===============================
// TEST ROUTE
// ===============================
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes are working!',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ===============================
// DEBUG USERS
// ===============================
router.get('/debug-users', async (req, res) => {
  try {

    console.log('\n📋 DEBUG USERS ROUTE HIT');

    if (process.env.NODE_ENV === 'production') {
      const { secret } = req.query;

      if (secret !== process.env.DEBUG_SECRET && secret !== 'debug123') {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized debug access'
        });
      }
    }

    const users = await User.find().limit(10).select('name email createdAt');

    res.json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===============================
// REGISTER
// ===============================
router.post('/register', async (req, res) => {

  console.log('📝 Register request:', req.body.email);

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });

  } catch (error) {

    console.error('Registration error:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    });

  }

});

// ===============================
// LOGIN
// ===============================
router.post('/login', async (req, res) => {

  console.log('🔐 Login request:', req.body.email);

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }

    const user = await User
      .findOne({ email })
      .select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account disabled'
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });

  } catch (error) {

    console.error('Login error:', error);

    res.status(500).json({
      success: false,
      message: 'Login failed'
    });

  }

});

// ===============================
// FORGOT PASSWORD
// ===============================
router.post('/forgot-password', async (req, res) => {

  console.log('\n🔑 FORGOT PASSWORD:', req.body.email);

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email required'
      });
    }

    const user = await User.findOne({ email });

    const message =
      'If an account exists with this email, you will receive a reset link.';

    if (!user) {

      console.log('User not found');

      return res.json({
        success: true,
        message
      });

    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl =
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

    console.log('\n====================================');
    console.log('RESET LINK:', resetUrl);
    console.log('====================================\n');

    // Email sending
    if (process.env.EMAIL_HOST) {

      try {

        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT || 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: `"Auth System" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Password Reset',
          html: `<p>Reset password: <a href="${resetUrl}">${resetUrl}</a></p>`
        });

        console.log('Email sent');

      } catch (emailError) {

        console.log('Email failed:', emailError.message);

      }

    }

    res.json({
      success: true,
      message
    });

  } catch (error) {

    console.error('Forgot password error:', error);

    res.status(500).json({
      success: false,
      message: 'Error processing request'
    });

  }

});

// ===============================
// RESET PASSWORD
// ===============================
router.post('/reset-password/:token', async (req, res) => {

  console.log('🔐 Reset password request');

  try {

    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const resetPasswordToken =
      crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    }).select('+password');

    if (!user) {

      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });

    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const authToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Password reset successful',
      token: authToken
    });

  } catch (error) {

    console.error('Reset error:', error);

    res.status(500).json({
      success: false,
      message: 'Reset failed'
    });

  }

});

// ===============================
// VERIFY RESET TOKEN
// ===============================
router.get('/verify-reset-token/:token', async (req, res) => {

  try {

    const { token } = req.params;

    const resetPasswordToken =
      crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });

    }

    res.json({
      success: true,
      message: 'Token valid'
    });

  } catch (error) {

    console.error('Verify token error:', error);

    res.status(500).json({
      success: false,
      message: 'Verification failed'
    });

  }

});

// ===============================
// GET CURRENT USER
// ===============================
router.get('/me', async (req, res) => {

  try {

    const token =
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token missing'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    );

    const user = await User.findById(decoded.userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: 'User not found'
      });

    }

    res.json({
      success: true,
      user
    });

  } catch (error) {

    console.error('Get user error:', error);

    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });

  }

});

export default router;
