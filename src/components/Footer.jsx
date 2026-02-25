import React from 'react';
import { COMPANY_INFO } from '../data';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-lotus-pink border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lotus-maroon to-lotus-gold flex items-center justify-center text-white font-bold">
                SL
              </div>
              <div>
                <div className="font-serif text-lotus-maroon text-lg font-bold">{COMPANY_INFO.name}</div>
                <div className="text-sm text-gray-600">Gourmet Makhana</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              {COMPANY_INFO.description} We're committed to bringing you the finest quality flavoured makhana, 
              crafted with traditional methods and modern innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-serif text-lotus-maroon text-lg font-semibold mb-4">Quick Links</h5>
            <div className="space-y-2">
              <a href="/products" className="block text-sm text-gray-600 hover:text-lotus-maroon transition-colors">All Products</a>
              <a href="/recipes" className="block text-sm text-gray-600 hover:text-lotus-maroon transition-colors">Recipes</a>
              <a href="/about" className="block text-sm text-gray-600 hover:text-lotus-maroon transition-colors">Our Story</a>
              <a href="/contact" className="block text-sm text-gray-600 hover:text-lotus-maroon transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-serif text-lotus-maroon text-lg font-semibold mb-4">Contact</h5>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{COMPANY_INFO.email}</p>
              <p>{COMPANY_INFO.phone}</p>
              <p className="max-w-xs">{COMPANY_INFO.address}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-lotus-maroon transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-lotus-maroon transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.25 14.815 3.76 13.664 3.76 12.367s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-lotus-maroon">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-lotus-maroon">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-lotus-maroon">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}