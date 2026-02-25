import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../data';

export default function Products({ onAdd }) {
  const [query, setQuery] = useState('');
  const [selectedFlavour, setSelectedFlavour] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const flavours = ['all', ...new Set(SAMPLE_PRODUCTS.map(p => p.flavour))];

  const filteredProducts = SAMPLE_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase()) || 
                         product.flavour.toLowerCase().includes(query.toLowerCase());
    const matchesFlavour = selectedFlavour === 'all' || product.flavour === selectedFlavour;
    return matchesSearch && matchesFlavour;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-lotus-maroon mb-4">Our Products</h1>
          <p className="text-lg text-gray-600">Discover our premium collection of flavoured makhana</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or flavour..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-maroon focus:border-transparent"
              />
            </div>

            {/* Flavour Filter */}
            <div>
              <label htmlFor="flavour" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Flavour
              </label>
              <select
                id="flavour"
                value={selectedFlavour}
                onChange={(e) => setSelectedFlavour(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-maroon focus:border-transparent"
              >
                {flavours.map(flavour => (
                  <option key={flavour} value={flavour}>
                    {flavour.charAt(0).toUpperCase() + flavour.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-maroon focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center text-gray-600">
          Showing {sortedProducts.length} of {SAMPLE_PRODUCTS.length} products
        </div>
      </div>
    </div>
  );
}