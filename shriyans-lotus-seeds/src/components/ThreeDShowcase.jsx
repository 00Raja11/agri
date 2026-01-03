import React from 'react';
import { Link } from 'react-router-dom';

export default function ThreeDShowcase() {
  const bouncingDots = [
    { color: 'bg-lotus-gold', delay: '0s' },
    { color: 'bg-lotus-maroon', delay: '0.1s' },
    { color: 'bg-lotus-pink', delay: '0.2s' }
  ];

  return (
    <div className="relative w-full h-96 rounded-2xl bg-gradient-to-br from-lotus-pink via-white to-lotus-pink border-2 border-lotus-maroon/20 overflow-hidden">
      
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-lotus-gold rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-lotus-maroon rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-lotus-maroon/20 rounded-full"></div>
      </div>
      
      {/* Foreground content */}
      <div className="relative z-10 h-full flex items-center justify-center p-6 sm:p-8">
        <div className="text-center max-w-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-lotus-maroon mb-4">
            Premium Makhana Experience
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Interactive 3D showcase coming soon. Explore our premium collection of flavoured lotus seeds.
          </p>

          {/* Call to Action */}
          <div className="mb-6">
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 rounded-lg bg-lotus-maroon text-white font-medium hover:bg-red-900 transition-colors"
            >
              Browse Products
            </Link>
          </div>

          {/* Animated dots */}
          <div className="flex gap-3 justify-center">
            {bouncingDots.map((dot, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full animate-bounce ${dot.color}`}
                style={{ animationDelay: dot.delay }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
