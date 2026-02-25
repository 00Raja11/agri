import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cart, onUpdateQty, onRemove }) {
  // Calculate totals using useMemo for performance
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.qty, 0), [cart]);
  const discount = total * 0.1;
  const finalTotal = total - discount;
  const shipping = finalTotal > 499 ? 0 : 49;
  const grandTotal = finalTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-serif text-2xl text-lotus-maroon mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-lotus-maroon mb-4">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-lotus-maroon">
                  Items in Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
                </h2>
                <Link to="/products" className="text-lotus-maroon hover:underline">
                  Continue Shopping
                </Link>
              </div>

              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src={item.product.img} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lotus-maroon">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Flavour: {item.product.flavour}</p>
                      <p className="text-sm text-gray-600">Weight: {item.product.weight}</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => onUpdateQty(item.product.id, Math.max(1, item.qty - 1))}
                            className="px-3 py-1 text-gray-600 hover:text-lotus-maroon"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={item.product.stock}
                            value={item.qty}
                            onChange={(e) => onUpdateQty(
                              item.product.id,
                              Math.max(1, Math.min(item.product.stock, parseInt(e.target.value) || 1))
                            )}
                            className="w-16 text-center border-x py-1"
                          />
                          <button
                            onClick={() => onUpdateQty(item.product.id, Math.min(item.product.stock, item.qty + 1))}
                            className="px-3 py-1 text-gray-600 hover:text-lotus-maroon"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => onRemove(item.product.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lotus-maroon">
                        ₹{item.product.price * item.qty}
                      </div>
                      <div className="text-sm text-gray-600">
                        ₹{item.product.price} × {item.qty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="mt-6 p-4 bg-lotus-pink rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Items Total:</span>
                  <span className="font-bold text-lotus-maroon">₹{total}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Total items: {cart.reduce((sum, item) => sum + item.qty, 0)}</span>
                  <span className="text-sm text-gray-600">Unique products: {cart.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="font-serif text-xl text-lotus-maroon mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-sm text-gray-500">
                    Free shipping on orders above ₹499
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg text-lotus-maroon">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600 mb-4">
                <p>Free returns within 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
