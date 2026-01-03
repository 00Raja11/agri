# Shriyans Lotus Seeds - Premium E-commerce Platform

A modern, full-stack e-commerce platform built with React, Vite, Node.js, and Express for Shriyans Lotus Seeds LLP. This application provides a complete online shopping experience for premium lotus seeds and related products.

## Features

- 🛍️ Complete e-commerce functionality (product listing, cart, checkout, orders)
- 📱 Fully responsive design optimized for all devices
- 🎨 Premium design with custom color palette and modern UI
- ⚡ Fast and optimized frontend with Vite
- 🧭 Client-side routing with React Router
- 🎯 Advanced product search and filtering
- 📊 Admin dashboard for product and order management
- 📝 Recipe section with lotus seed recipes
- 📞 Contact forms and customer support
- 🔐 User authentication and authorization
- 💳 Secure payment processing (frontend ready for integration)
- 📧 Email notifications (backend ready for integration)

## Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Declarative routing for React
- **React Helmet Async** - Document head management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- MongoDB (local installation or cloud service like MongoDB Atlas)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd shriyans-lotus-seeds
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables:**
   
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shriyans-lotus-seeds
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Start MongoDB:**
   
   Make sure MongoDB is running on your system. For local installation:
   ```bash
   mongod
   ```

## Usage

### Development

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start the backend in production:**
   ```bash
   cd backend
   npm start
   ```

3. **Preview the built frontend:**
   ```bash
   npm run preview
   ```

## Project Structure

```
shriyans-lotus-seeds/
├── backend/                    # Backend API server
│   ├── models/                 # MongoDB data models
│   │   ├── User.js            # User model
│   │   ├── Product.js         # Product model
│   │   ├── Order.js           # Order model
│   │   └── Recipe.js          # Recipe model
│   ├── routes/                # API route handlers
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product management routes
│   │   ├── orders.js          # Order management routes
│   │   ├── recipes.js         # Recipe routes
│   │   └── contact.js         # Contact form routes
│   ├── package.json           # Backend dependencies
│   └── server.js              # Main server file
├── public/                    # Static assets
├── src/                       # Frontend source code
│   ├── assets/                # Images, icons, etc.
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Footer component
│   │   ├── ProductCard.jsx    # Product display card
│   │   ├── OrderConfirmation.jsx
│   │   ├── PaymentSuccess.jsx
│   │   └── ThreeDShowcase.jsx # 3D product showcase
│   ├── context/               # React context providers
│   │   └── AuthContext.jsx    # Authentication context
│   ├── hooks/                 # Custom React hooks
│   │   └── useAuth.js         # Authentication hook
│   ├── pages/                 # Page components
│   │   ├── Home.jsx           # Landing page
│   │   ├── Products.jsx       # Product listing
│   │   ├── ProductDetail.jsx  # Individual product page
│   │   ├── Cart.jsx           # Shopping cart
│   │   ├── Login.jsx          # User login
│   │   ├── Register.jsx       # User registration
│   │   ├── Dashboard.jsx      # Admin dashboard
│   │   ├── Recipes.jsx        # Recipe section
│   │   ├── Contact.jsx        # Contact page
│   │   └── About.jsx          # About page
│   ├── services/              # API service functions
│   │   ├── api.js             # General API calls
│   │   └── auth.js            # Authentication services
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # App entry point
│   ├── App.css                # App-specific styles
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Frontend dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.cjs        # Tailwind CSS config
├── postcss.config.cjs         # PostCSS config
├── eslint.config.js           # ESLint configuration
└── README.md                  # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID

### Contact
- `POST /api/contact` - Send contact message

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Shriyans Lotus Seeds LLP
- Website: [www.shriyanslotusseeds.com](https://www.shriyanslotusseeds.com)
- Email: info@shriyanslotusseeds.com
- Phone: +91-XXXXXXXXXX

## Acknowledgments

- Built with ❤️ for Shriyans Lotus Seeds LLP
- Special thanks to the open-source community for the amazing tools and libraries
