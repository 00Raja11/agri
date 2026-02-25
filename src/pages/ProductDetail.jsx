import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data';

export default function ProductDetail({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = SAMPLE_PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAdd(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-lotus-maroon">Home</Link></li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-lotus-maroon">Products</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-lotus-maroon font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex flex-col items-center">
              <img
                src={product.img}
                alt={product.name}
                className="w-full max-w-md h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="flex gap-2 mt-4">
                {/* Placeholder thumbnails */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg cursor-pointer border-2 border-lotus-maroon"></div>
                <div className="w-16 h-16 bg-gray-300 rounded-lg cursor-pointer"></div>
                <div className="w-16 h-16 bg-gray-400 rounded-lg cursor-pointer"></div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-md">
                <div className="text-center p-3 bg-lotus-pink rounded-lg">
                  <div className="text-lg font-bold text-lotus-maroon">{product.rating}</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center p-3 bg-lotus-pink rounded-lg">
                  <div className="text-lg font-bold text-lotus-maroon">{product.stock}+</div>
                  <div className="text-xs text-gray-600">In Stock</div>
                </div>
                <div className="text-center p-3 bg-lotus-pink rounded-lg">
                  <div className="text-lg font-bold text-lotus-maroon">100g</div>
                  <div className="text-xs text-gray-600">Pack Size</div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-lotus-maroon mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-green-600 font-semibold">In Stock ({product.stock} left)</span>
                </div>

                <div className="text-3xl font-bold text-lotus-maroon mb-4">
                  ₹{product.price}
                  <span className="text-lg text-gray-500 line-through ml-2">₹{Math.round(product.price * 1.2)}</span>
                  <span className="text-green-600 text-sm ml-2">(17% off)</span>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                {/* Health Benefits */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lotus-maroon mb-2">Health Benefits:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, index) => (
                      <span key={index} className="px-3 py-1 bg-lotus-pink text-lotus-maroon rounded-full text-sm">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-green-700">
                    <span>🚚</span>
                    <span className="font-semibold">Free Delivery</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Order today and get free delivery. Expected delivery: 2-3 business days.
                  </p>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <label htmlFor="quantity" className="font-semibold">Quantity:</label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-lotus-maroon"
                      disabled={quantity <= 1}
                    >-</button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center border-x py-2"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 text-gray-600 hover:text-lotus-maroon"
                      disabled={quantity >= product.stock}
                    >+</button>
                  </div>
                  <span className="text-sm text-gray-500">Max: {product.stock}</span>
                </div>

                <button 
                  onClick={handleAddToCart} 
                  className="btn-primary flex-1 py-3 text-lg"
                >
                  Add to Cart
                </button>

                {/* Total Price */}
                <div className="text-center mt-3">
                  <span className="text-lg font-semibold text-lotus-maroon">
                    Total: ₹{product.price * quantity}
                  </span>
                  {quantity > 1 && (
                    <span className="text-sm text-gray-600 ml-2">
                      ({quantity} × ₹{product.price})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t">
            <div className="flex border-b">
              {['description', 'ingredients', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-lotus-maroon text-lotus-maroon'
                      : 'text-gray-600 hover:text-lotus-maroon'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Ingredients & Nutrition</h3>
                  <p className="text-gray-700">{product.ingredients}</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                  {/* Reviews can be rendered here */}
                  <p className="text-gray-600">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
