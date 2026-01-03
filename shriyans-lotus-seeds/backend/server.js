import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Simple in-memory data storage
let users = [];
let products = [
  {
    id: 'p1',
    name: 'Royal Salted Makhana',
    price: 249,
    flavour: 'Salted',
    image: 'https://images.unsplash.com/photo-1587330273657-44721cafe1a1?w=400&h=300&fit=crop',
    stock: 45,
    rating: 4.6,
    description: 'Premium lotus seeds lightly roasted with Himalayan salt for a perfect crunch.',
    benefits: ['Low in Calories', 'High in Protein', 'Gluten Free'],
    ingredients: 'Lotus Seeds, Himalayan Salt, Sunflower Oil',
    weight: '100g'
  },
  {
    id: 'p2',
    name: 'Truffle Delight Makhana', 
    price: 399,
    flavour: 'Truffle',
    image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=300&fit=crop',
    stock: 30,
    rating: 4.8,
    description: 'Exquisite truffle-infused makhana for a gourmet snacking experience.',
    benefits: ['Rich in Antioxidants', 'Low Glycemic Index', 'Vegan'],
    ingredients: 'Lotus Seeds, Truffle Oil, Sea Salt, Herbs', 
    weight: '100g'
  }
];

let orders = [];

// ===== ROUTES =====

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Shriyans Lotus Seeds API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login'],
      products: ['GET /api/products', 'GET /api/products/:id'],
      orders: ['POST /api/orders', 'GET /api/orders/my-orders'],
      contact: ['POST /api/contact']
    }
  });
});

// User registration - POST endpoint
app.post('/api/auth/register', (req, res) => {
  console.log('📝 Registration request received:', req.body);
  
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    console.log('✅ User registered:', newUser.email);

    // Generate simple token
    const token = `token_${Date.now()}`;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: newUser
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

// User login - POST endpoint  
app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Login request received:', req.body);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate simple token
    const token = `token_${Date.now()}`;
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
      message: 'Internal server error during login'
    });
  }
});

// Get all products - GET endpoint
app.get('/api/products', (req, res) => {
  console.log('📦 Products request received');
  
  const { search, flavour, page = 1, limit = 12 } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by search
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Filter by flavour
  if (flavour && flavour !== 'all') {
    filteredProducts = filteredProducts.filter(product =>
      product.flavour.toLowerCase() === flavour.toLowerCase()
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    products: paginatedProducts,
    pagination: {
      current: parseInt(page),
      pages: Math.ceil(filteredProducts.length / limit),
      total: filteredProducts.length
    }
  });
});

// Get single product - GET endpoint
app.get('/api/products/:id', (req, res) => {
  console.log('📦 Product detail request:', req.params.id);
  
  const product = products.find(p => p.id === req.params.id);
  
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
});

// Get featured products - GET endpoint
app.get('/api/products/featured/products', (req, res) => {
  console.log('⭐ Featured products request');
  
  const featuredProducts = products.slice(0, 3);
  res.json({
    success: true,
    products: featuredProducts
  });
});

// Create order - POST endpoint
app.post('/api/orders', (req, res) => {
  console.log('🛒 Order creation request received');
  
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    let total = 0;
    const orderItems = [];
    
    // Validate items and calculate total
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }
      
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      orderItems.push({
        product: { ...product },
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });
    }
    
    // Create order
    const order = {
      id: `order_${Date.now()}`,
      items: orderItems,
      total,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      orderNumber: `ORD${Date.now().toString().slice(-6)}`
    };
    
    orders.push(order);
    console.log('✅ Order created:', order.orderNumber);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
    
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order'
    });
  }
});

// Get user orders - GET endpoint
app.get('/api/orders/my-orders', (req, res) => {
  console.log('📋 User orders request');
  
  res.json({
    success: true,
    orders: orders.reverse() // Latest first
  });
});

// Contact form - POST endpoint
app.post('/api/contact', (req, res) => {
  console.log('📞 Contact form submission:', req.body);
  
  const { name, email, subject, message } = req.body;
  
  // Log the contact form data (in production, you'd send an email)
  console.log('Contact details:', { name, email, subject, message });
  
  res.json({
    success: true,
    message: 'Thank you for your message! We will get back to you within 24 hours.'
  });
});

// 404 handler for undefined routes
app.use('/api/*', (req, res) => {
  console.log('❌ Route not found:', req.method, req.originalUrl);
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Shriyans Lotus Seeds Backend Server Started');
  console.log('==============================================');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('📋 Available Endpoints:');
  console.log('   POST /api/auth/register - User registration');
  console.log('   POST /api/auth/login    - User login');
  console.log('   GET  /api/products      - Get all products');
  console.log('   GET  /api/products/:id  - Get product by ID');
  console.log('   POST /api/orders        - Create order');
  console.log('   POST /api/contact       - Contact form');
  console.log('');
  console.log('✅ Server is ready to accept requests...');
});