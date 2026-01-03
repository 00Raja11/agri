import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  flavour: {
    type: String,
    required: [true, 'Flavour is required'],
    enum: ['Salted', 'Truffle', 'Honey', 'Spicy', 'Cheese', 'Plain', 'Masala', 'Butter']
  },
  category: {
    type: String,
    required: true,
    enum: ['makhana', 'combo', 'gift-pack'],
    default: 'makhana'
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: { type: Boolean, default: false }
  }],
  weight: {
    type: String,
    required: true,
    enum: ['50g', '100g', '200g', '500g', '1kg']
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
    fiber: Number,
    sugar: Number
  },
  ingredients: [String],
  benefits: [String],
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', flavour: 'text' });
productSchema.index({ category: 1, flavour: 1 });
productSchema.index({ price: 1 });

export default mongoose.model('Product', productSchema);