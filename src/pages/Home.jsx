import React from 'react';
import { Link } from 'react-router-dom';
import ThreeDShowcase from '../components/ThreeDShowcase';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS, COMPANY_INFO } from '../data';

export default function Home({ onAdd }) {
  const featuredProducts = SAMPLE_PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lotus-pink to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-serif text-4xl md:text-6xl text-lotus-maroon mb-6 leading-tight">
                Luxury Meets <span className="text-lotus-gold">Healthy</span> Snacking
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Discover premium flavoured makhana crafted for taste and wellbeing. 
                Experience the perfect blend of traditional wisdom and modern flavors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products" className="btn-primary text-lg px-8 py-4">
                  Shop Now
                </Link>
                <Link to="/recipes" className="btn-secondary text-lg px-8 py-4">
                  Explore Recipes
                </Link>
              </div>
            </div>
            <div>
              <ThreeDShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-lotus-maroon mb-4">
              Why Choose Shriyans Lotus Seeds?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality and health sets us apart in the world of gourmet snacking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-lotus-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-2">100% Natural</h3>
              <p className="text-gray-600">No artificial preservatives, colors, or flavors. Pure, natural goodness.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-lotus-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-2">Premium Quality</h3>
              <p className="text-gray-600">Handpicked lotus seeds with expert crafting for superior taste.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-lotus-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-2">Health First</h3>
              <p className="text-gray-600">Low calorie, high protein snacks for your wellness journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-lotus-pink/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-lotus-maroon mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">Discover our most popular flavours</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-lotus-maroon mb-6">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {COMPANY_INFO.mission} We believe that healthy snacking should never compromise on taste. 
            Our journey began with a simple vision: to create snacks that nourish both body and soul.
          </p>
          <Link to="/about" className="btn-secondary">
            Learn More About Us
          </Link>
        </div>
      </section>
    </div>
  );
}
