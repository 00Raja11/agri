import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
  const [cart, setCart] = useState([]);
  const [recentOrder, setRecentOrder] = useState(null);

  // Add product to cart
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, qty: quantity }];
      }
    });
  };

  // Update item quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, qty: newQuantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Handle order confirmation (replaces payment success)
  const handleOrderConfirmation = (orderData) => {
    const orderDetails = {
      orderId: 'ORD-' + Date.now(),
      items: [...cart],
      total: cart.reduce((total, item) => total + (item.product.price * item.qty), 0),
      timestamp: new Date().toISOString(),
      ...orderData
    };
    
    setRecentOrder(orderDetails);
    clearCart();
  };

  // Continue shopping after order
  const handleContinueShopping = () => {
    setRecentOrder(null);
  };

  // Calculate total cart items count
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#fff7fb] flex flex-col">
          <Navbar cartCount={cartCount} />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
              <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Cart & Order Routes */}
              <Route 
                path="/cart" 
                element={
                  recentOrder ? (
                    <OrderConfirmation 
                      orderDetails={recentOrder} 
                      onContinueShopping={handleContinueShopping} 
                    />
                  ) : (
                    <Cart 
                      cart={cart}
                      onUpdateQuantity={updateQuantity}
                      onRemoveFromCart={removeFromCart}
                      onOrderConfirm={handleOrderConfirmation}
                    />
                  )
                } 
              />
              
              {/* Order Confirmation Page */}
              <Route 
                path="/order-confirmation" 
                element={
                  <OrderConfirmation 
                    orderDetails={recentOrder} 
                    onContinueShopping={handleContinueShopping} 
                  />
                } 
              />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;