import React, { useState } from 'react';
import { COMPANY_INFO } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-lotus-maroon mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-2xl text-lotus-maroon mb-6">Get in Touch</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lotus-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Email Us</h3>
                  <p className="text-gray-600">{COMPANY_INFO.email}</p>
                  <p className="text-sm text-gray-500">Typically replies within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lotus-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Call Us</h3>
                  <p className="text-gray-600">{COMPANY_INFO.phone}</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lotus-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏢</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">{COMPANY_INFO.address}</p>
                  <p className="text-sm text-gray-500">Feel free to visit our office</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-lotus-pink to-white rounded-2xl p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">Google Maps integration</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="font-serif text-2xl text-lotus-maroon mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-maroon focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-maroon focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-maroon focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="wholesale">Wholesale/Bulk Orders</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="feedback">Product Feedback</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-maroon focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3 text-lg">
                Send Message
              </button>
            </form>

            {/* Support Info */}
            <div className="mt-8 p-4 bg-lotus-pink rounded-lg">
              <h4 className="font-semibold text-lotus-maroon mb-2">Customer Support</h4>
              <p className="text-sm text-gray-700">
                For urgent matters, please call us directly at {COMPANY_INFO.phone} or email {COMPANY_INFO.email}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="font-serif text-2xl text-lotus-maroon text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the shelf life of your products?</h3>
              <p className="text-gray-600 mb-4">Our products have a shelf life of 6 months from the date of manufacture when stored properly.</p>
              
              <h3 className="font-semibold text-lg mb-2">Do you offer wholesale pricing?</h3>
              <p className="text-gray-600 mb-4">Yes, we offer special pricing for bulk orders. Please contact us for wholesale inquiries.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What are the shipping options?</h3>
              <p className="text-gray-600 mb-4">We offer standard and express shipping across India. Free shipping on orders above ₹999.</p>
              
              <h3 className="font-semibold text-lg mb-2">Are your products suitable for diabetics?</h3>
              <p className="text-gray-600">Yes, our products have low glycemic index and are suitable for diabetics when consumed in moderation.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}