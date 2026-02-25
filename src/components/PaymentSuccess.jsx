import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess({ orderDetails, onContinueShopping }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        {/* Heading */}
        <h2 className="font-serif text-2xl text-lotus-maroon mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-2">Thank you for your order.</p>
        
        {/* Order Summary */}
        {orderDetails && (
          <div className="bg-lotus-pink rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order ID:</span>
              <span className="font-mono">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold">₹{orderDetails.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span className="font-mono text-sm">
                {new Date(orderDetails.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        )}
        
        <p className="text-gray-600 mb-6">
          Your order has been confirmed. You will receive an email with details shortly.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link 
            to="/products" 
            onClick={onContinueShopping}
            className="btn-primary py-3"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/dashboard" 
            className="btn-secondary py-3"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}
