import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import models
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Recipe from './models/Recipe.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ===== MongoDB Connection =====
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// ===== Routes =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Shriyans Lotus Seeds API is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ===== Auth Routes =====
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ===== Product Routes =====
app.get('/api/products', async (req, res) => {
  try {
    const { search, flavour, page = 1, limit = 12 } = req.query;
    
    let query = { isActive: true };
    
    // Search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filter by flavour
    if (flavour && flavour !== 'all') {
      query.flavour = flavour;
    }
    
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort('-createdAt');
    
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ===== Order Routes =====
app.post('/api/orders', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, user } = req.body;
    
    // Calculate totals
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }
      
      const total = product.price * item.quantity;
      subtotal += total;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total
      });
    }
    
    const shipping = 40; // Fixed shipping
    const total = subtotal + shipping;
    
    // Create order
    const order = await Order.create({
      user: user?.id,
      items: orderItems,
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
      orderStatus: 'pending',
      paymentStatus: 'pending'
    });
    
    // Populate product details
    await order.populate('items.product');
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.get('/api/orders/my-orders', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.query.userId })
      .populate('items.product')
      .sort('-createdAt');
    
    res.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ===== Recipe Routes =====
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({ isApproved: true })
      .populate('products.product')
      .sort('-createdAt');
    
    res.json({
      success: true,
      recipes
    });

  } catch (error) {
    console.error('Recipes fetch error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ===== Contact Route =====
app.post('/api/contact', (req, res) => {
  console.log('Contact form:', req.body);
  res.json({
    success: true,
    message: 'Thank you for contacting us!'
  });
});

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('🚀 Shriyans Lotus Seeds Backend Server Started');
    console.log('==============================================');
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`💾 MongoDB: Connected`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    console.log('✅ Server ready!');
  });
});