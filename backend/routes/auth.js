import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// ===== DEBUG ROUTE - Get all users (Accessible in all environments for testing) =====
router.get('/debug-users', async (req, res) => {
  try {
    console.log('\n📋 ===== DEBUG USERS ROUTE HIT =====');
    console.log('Environment:', process.env.NODE_ENV);
    
    // Get auth token from headers
    const token = req.headers.authorization?.split(' ')[1];
    
    // For security in production, you might want to require admin token
    // But for now, we'll allow access with a simple security check
    if (process.env.NODE_ENV === 'production') {
      // Optional: Add a secret query parameter for security
      const { secret } = req.query;
      if (secret !== process.env.DEBUG_SECRET && secret !== 'shriyans123') {
        console.log('❌ Unauthorized debug access attempt');
        return res.status(401).json({ 
          success: false, 
          message: 'Unauthorized. Debug routes require secret key.' 
        });
      }
    }
    
    const users = await User.find().limit(10).select('email name createdAt');
    console.log(`✅ Found ${users.length} users`);
    console.table(users.map(u => ({
      email: u.email,
      name: u.name,
      joined: u.createdAt?.toLocaleDateString() || 'N/A'
    })));
    
    res.json({ 
      success: true, 
      count: users.length,
      users 
    });
  } catch (error) {
    console.error('Debug route error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ===== SIMPLE TEST ROUTE =====
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth routes are working!',
    environment: process.env.NODE_ENV 
  });
});

// ===== REGISTER =====
router.post('/register', async (req, res) => {
  console.log('📝 Register request received for:', req.body.email);
  
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
        message: 'User already exists with this email'
      });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    console.log('✅ User registered:', user.email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
});

// ===== LOGIN =====
router.post('/login', async (req, res) => {
  console.log('🔐 Login request received for:', req.body.email);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    const token = generateToken(user._id);
    user.lastLogin = new Date();
    await user.save();

    console.log('✅ Login successful:', user.email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
});

// ===== FORGOT PASSWORD =====
router.post('/forgot-password', async (req, res) => {
  console.log('\n🔑 ===== FORGOT PASSWORD REQUEST =====');
  console.log('📧 Email:', req.body.email);
  
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    console.log('👤 User found:', user ? 'YES - ' + user.email : 'NO - User not in database');
    
    // Always return same message for security
    const successMessage = 'If an account exists with this email, you will receive a password reset link.';

    if (!user) {
      console.log('⚠️ User not found in database - no reset link generated');
      
      // In development, show available users
      if (process.env.NODE_ENV !== 'production') {
        const availableUsers = await User.find().limit(5).select('email');
        if (availableUsers.length > 0) {
          console.log('📋 Available test emails:', availableUsers.map(u => u.email));
        } else {
          console.log('📋 No users in database. Register first!');
        }
      }
      
      return res.json({
        success: true,
        message: successMessage
      });
    }

    // Generate reset token
    console.log('🔄 Generating reset token for:', user.email);
    const resetToken = user.getResetPasswordToken();
    
    // Save user with token
    await user.save({ validateBeforeSave: false });
    console.log('✅ User saved with reset token');

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
    
    // IMPORTANT: Log the reset URL prominently
    console.log('\n' + '='.repeat(60));
    console.log('🔗 RESET LINK GENERATED:');
    console.log(resetUrl);
    console.log('='.repeat(60) + '\n');

    // Try to send email if configured
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT || 587,
          secure: process.env.EMAIL_PORT === '465',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: `"Shriyans Lotus Seeds" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Password Reset Request',
          html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Valid for 10 minutes.</p>`
        });

        console.log('✅ Password reset email sent to:', user.email);
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError.message);
      }
    }

    res.json({
      success: true,
      message: successMessage
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing request. Please try again.'
    });
  }
});

// ===== RESET PASSWORD =====
router.post('/reset-password/:token', async (req, res) => {
  console.log('\n🔐 ===== RESET PASSWORD REQUEST =====');
  
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Hash token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    }).select('+password');

    if (!user) {
      console.log('❌ Invalid or expired token');
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    console.log('✅ Valid token found for user:', user.email);

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.log('✅ Password reset successful for:', user.email);

    const authToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Password reset successful.',
      token: authToken,
      user
    });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password.'
    });
  }
});

// ===== VERIFY RESET TOKEN =====
router.get('/verify-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    res.json({
      success: true,
      message: 'Token is valid'
    });

  } catch (error) {
    console.error('❌ Verify token error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying token'
    });
  }
});

// ===== GET CURRENT USER =====
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    
    console.error('Get user error:', error);
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
});

export default router;
