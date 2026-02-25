import React from 'react';
import { COMPANY_INFO } from '../data';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lotus-pink to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-lotus-maroon mb-6">Our Story</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Crafting premium flavoured makhana with passion, tradition, and innovation.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-3xl text-lotus-maroon mb-6">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {COMPANY_INFO.mission} We are committed to revolutionizing the snacking industry 
              by offering products that are not only delicious but also nourishing for the body and soul.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through rigorous quality control and sustainable practices, we ensure that every pack 
              of Shriyans Lotus Seeds meets the highest standards of excellence.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-serif text-3xl text-lotus-maroon mb-6">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted brand for healthy snacking worldwide, making premium 
              quality makhana accessible to health-conscious consumers everywhere while promoting 
              sustainable agriculture and supporting local farming communities.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-lotus-maroon text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-lotus-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-3">Quality First</h3>
              <p className="text-gray-600">We never compromise on quality. Every product undergoes strict quality checks.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-lotus-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-3">Sustainability</h3>
              <p className="text-gray-600">We source responsibly and support sustainable farming practices.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-lotus-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-3">Customer Care</h3>
              <p className="text-gray-600">Your satisfaction is our priority. We're here to serve you better every day.</p>
            </div>
          </div>
        </section>

        {/* Certifications & Awards */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="font-serif text-3xl text-lotus-maroon text-center mb-8">Certifications & Awards</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Certifications</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ FSSAI Certified</li>
                <li>✅ ISO 22000:2018 Certified</li>
                <li>✅ 100% Vegetarian Certified</li>
                <li>✅ GMP (Good Manufacturing Practices)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Awards & Recognition</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🏆 Best Healthy Snack Brand 2023</li>
                <li>🏆 Food Innovation Award 2022</li>
                <li>🏆 Sustainable Business Practice Award 2022</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="font-serif text-3xl text-lotus-maroon text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-lotus-maroon to-lotus-gold rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                AS
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-2">Aarav Sharma</h3>
              <p className="text-gray-600 font-semibold">Founder & CEO</p>
              <p className="text-gray-600 text-sm mt-2">Food technologist with 15+ years of experience</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-lotus-maroon to-lotus-gold rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                PK
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-2">Priya Kapoor</h3>
              <p className="text-gray-600 font-semibold">Head of Operations</p>
              <p className="text-gray-600 text-sm mt-2">Expert in supply chain and quality management</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-lotus-maroon to-lotus-gold rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                RK
              </div>
              <h3 className="font-serif text-xl text-lotus-maroon mb-2">Rajesh Kumar</h3>
              <p className="text-gray-600 font-semibold">Master Chef</p>
              <p className="text-gray-600 text-sm mt-2">Creating delicious flavours since 2010</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}