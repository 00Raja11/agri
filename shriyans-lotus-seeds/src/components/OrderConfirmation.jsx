// src/components/OrderConfirmation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = ({ orderDetails, onContinueShopping }) => {
  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Order Found</h2>
          <p className="text-gray-600 mb-4">It looks like you haven't placed any order yet.</p>
          <Link 
            to="/products" 
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 px-6 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Order Confirmed!</h1>
            <p className="text-green-100 mt-2">Thank you for your purchase</p>
          </div>

          {/* Order Details */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{orderDetails.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{new Date(orderDetails.timestamp).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                  </div>
                  <p className="font-semibold">₹{(item.product.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
              
              {/* Total */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total Amount</p>
                  <p className="text-lg font-bold text-green-600">₹{orderDetails.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <button
                onClick={onContinueShopping}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
              >
                Continue Shopping
              </button>
              <Link
                to="/products"
                className="block text-center text-green-600 hover:text-green-500 font-medium"
              >
                Browse More Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;