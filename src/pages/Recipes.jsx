import React from 'react';
import { RECIPES } from '../data';

export default function Recipes() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-lotus-maroon mb-4">Makhana Recipes</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover delicious ways to enjoy our premium makhana. From quick snacks to gourmet dishes, 
            find inspiration for every occasion.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {RECIPES.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-xl text-lotus-maroon mb-3">{recipe.title}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <span>⏱️</span> {recipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📊</span> {recipe.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-lotus-maroon mb-2">Ingredients:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>• {ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-lotus-maroon mb-2">Instructions:</h4>
                  <p className="text-sm text-gray-700">{recipe.instructions}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 btn-primary text-sm py-2">
                    Download Recipe Card
                  </button>
                  <button className="px-4 py-2 border border-lotus-maroon text-lotus-maroon rounded-lg text-sm hover:bg-lotus-maroon hover:text-white transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Categories */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="font-serif text-2xl text-lotus-maroon text-center mb-8">Recipe Categories</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {['Quick Snacks', 'Main Courses', 'Desserts', 'Festive Specials'].map(category => (
              <div key={category} className="text-center p-4 border-2 border-lotus-pink rounded-xl cursor-pointer hover:bg-lotus-pink transition-colors">
                <div className="text-3xl mb-2">
                  {category === 'Quick Snacks' && '⚡'}
                  {category === 'Main Courses' && '🍽️'}
                  {category === 'Desserts' && '🍰'}
                  {category === 'Festive Specials' && '🎉'}
                </div>
                <span className="font-medium text-lotus-maroon">{category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Recipe Section */}
        <section className="bg-gradient-to-br from-lotus-pink to-white rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl text-lotus-maroon mb-4">Share Your Recipe</h2>
          <p className="text-gray-700 mb-6">
            Have a unique makhana recipe? Share it with our community and get featured!
          </p>
          <button className="btn-primary">
            Submit Your Recipe
          </button>
        </section>
      </div>
    </div>
  );
}