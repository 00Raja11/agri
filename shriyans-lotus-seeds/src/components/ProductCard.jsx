import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAdd) onAdd(product);
  };

  // Fallback image if missing
  const productImage = product.img || '/images/placeholder.png';

  // Discount (dynamic — can adjust % later easily)
  const discountPrice = Math.round(product.price * 1.2);

  return (
    <Link to={`/product/${product.id}`} className="block no-underline">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group">
        
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img 
            src={productImage} 
            alt={product.name || 'Product'} 
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Rating */}
          {product.rating && (
            <div className="absolute top-3 right-3 bg-lotus-gold text-lotus-maroon px-2 py-1 rounded-full text-sm font-bold">
              {product.rating} ⭐
            </div>
          )}

          {/* Low Stock */}
          {product.stock !== undefined && product.stock < 10 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              Low Stock
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-serif text-lotus-maroon text-lg font-semibold mb-2 line-clamp-2">
            {product.name}
          </h3>
          {product.flavour && (
            <p className="text-sm text-gray-600 mb-1">Flavour: {product.flavour}</p>
          )}
          {product.weight && (
            <p className="text-xs text-gray-500 mb-3">Weight: {product.weight}</p>
          )}
          
          {/* Price + Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <div className="text-xl font-bold text-lotus-maroon">₹{product.price}</div>
              <div className="text-sm text-gray-500 line-through">₹{discountPrice}</div>
            </div>
            <button 
              onClick={handleAddToCart}
              className="px-4 py-2 bg-lotus-maroon text-white rounded-lg text-sm font-medium hover:bg-red-900 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
