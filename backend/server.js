import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import recipeRoutes from './routes/recipes.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();

// ===== Security Middleware =====
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ===== Rate Limiting =====
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// ===== CORS Configuration =====
app.use(cors({
  origin: process.env.FRONTEND_URL?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// ===== Middleware =====
app.use(compression()); // Compress responses
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== Request Logger (Development) =====
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ===== MongoDB Connection =====
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// ===== Routes =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Shriyans Lotus Seeds API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API Routes - MOUNT ALL ROUTES HERE
console.log('🔥 Mounting auth routes...');
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes mounted');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/contact', contactRoutes);

// ===== Debug: List all registered routes =====
app.get('/api/debug/routes', (req, res) => {
  const routes = [];
  
  // Function to extract routes from app._router.stack
  const extractRoutes = (stack, basePath = '') => {
    stack.forEach(layer => {
      if (layer.route) {
        // Route layer
        const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
        routes.push({
          method: methods,
          path: basePath + layer.route.path,
          handler: layer.route.stack[0]?.name || 'anonymous'
        });
      } else if (layer.name === 'router' && layer.handle.stack) {
        // Router layer
        const routerPath = basePath + (layer.regexp.source
          .replace('\\/?(?=\\/|$)', '')
          .replace(/\\\//g, '/')
          .replace(/\^/g, '')
          .replace(/\?/g, '')
          .replace(/\(\?:\(\[\^\\\/\]\+\?\)\)/g, ':param'));
        extractRoutes(layer.handle.stack, routerPath);
      }
    });
  };
  
  extractRoutes(app._router.stack);
  
  res.json({
    success: true,
    totalRoutes: routes.length,
    routes: routes.sort((a, b) => a.path.localeCompare(b.path))
  });
});

// ===== 404 Handler for undefined routes =====
app.use('/api/*', (req, res) => {
  console.log(`❌ 404 - API endpoint not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// ===== Global Error Handler =====
app.use((error, req, res, next) => {
  console.error('🚨 Server Error:', error);
  
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  
  res.status(status).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 Shriyans Lotus Seeds Backend Server Started');
    console.log('='.repeat(60));
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`💾 MongoDB: Connected`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    console.log('='.repeat(60) + '\n');
    
    console.log('📋 Available Endpoints:');
    console.log('   GET    /api/health');
    console.log('   GET    /api/auth/test');
    console.log('   GET    /api/auth/debug-users');
    console.log('   POST   /api/auth/register');
    console.log('   POST   /api/auth/login');
    console.log('   POST   /api/auth/forgot-password');
    console.log('   POST   /api/auth/reset-password/:token');
    console.log('   GET    /api/auth/verify-reset-token/:token');
    console.log('   GET    /api/auth/me');
    console.log('   GET    /api/products');
    console.log('   GET    /api/products/:id');
    console.log('   POST   /api/orders');
    console.log('   GET    /api/orders/my-orders');
    console.log('   GET    /api/recipes');
    console.log('   POST   /api/contact');
    console.log('   GET    /api/debug/routes');
    console.log('='.repeat(60) + '\n');
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('⚠️ SIGTERM received. Closing server...');
    server.close(() => {
      console.log('✅ Server closed');
      mongoose.connection.close(false, () => {
        console.log('✅ MongoDB connection closed');
        process.exit(0);
      });
    });
  });
});