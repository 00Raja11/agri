import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lotus-maroon to-lotus-gold flex items-center justify-center text-white font-bold text-xl">
                SL
              </div>
              <div>
                <div className="font-serif text-lotus-maroon text-xl font-bold">Shriyans Lotus Seeds</div>
                <div className="text-sm text-gray-600">Gourmet Makhana</div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-medium ${isActive('/') ? 'text-lotus-maroon border-b-2 border-lotus-maroon' : 'text-gray-700 hover:text-lotus-maroon'}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium ${isActive('/products') ? 'text-lotus-maroon border-b-2 border-lotus-maroon' : 'text-gray-700 hover:text-lotus-maroon'}`}
            >
              Products
            </Link>
            <Link 
              to="/recipes" 
              className={`font-medium ${isActive('/recipes') ? 'text-lotus-maroon border-b-2 border-lotus-maroon' : 'text-gray-700 hover:text-lotus-maroon'}`}
            >
              Recipes
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${isActive('/about') ? 'text-lotus-maroon border-b-2 border-lotus-maroon' : 'text-gray-700 hover:text-lotus-maroon'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${isActive('/contact') ? 'text-lotus-maroon border-b-2 border-lotus-maroon' : 'text-gray-700 hover:text-lotus-maroon'}`}
            >
              Contact
            </Link>
            
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn-primary text-sm">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-lotus-maroon text-sm"
                  >
                    Logout
                  </button>
                  <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-lotus-maroon text-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Sign Up
                  </Link>
                </>
              )}
              
              <Link to="/cart" className="relative p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lotus-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-lotus-gold text-xs font-bold text-lotus-maroon rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-lotus-maroon hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Home</Link>
              <Link to="/products" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Products</Link>
              <Link to="/recipes" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Recipes</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">About</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Contact</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-lotus-maroon">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Login</Link>
                  <Link to="/register" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Sign Up</Link>
                </>
              )}
              <Link to="/cart" className="block px-3 py-2 text-gray-700 hover:text-lotus-maroon">Cart ({cartCount})</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}