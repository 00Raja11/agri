import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Recipe description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    url: String,
    alt: String
  },
  preparationTime: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['minutes', 'hours'], default: 'minutes' }
  },
  cookingTime: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['minutes', 'hours'], default: 'minutes' }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  servings: {
    type: Number,
    required: true,
    min: [1, 'Servings must be at least 1']
  },
  ingredients: [{
    name: String,
    quantity: String,
    unit: String
  }],
  instructions: [{
    step: Number,
    description: String,
    duration: String
  }],
  tags: [String],
  category: {
    type: String,
    enum: ['snack', 'main-course', 'dessert', 'festive', 'quick'],
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });
recipeSchema.index({ category: 1, difficulty: 1 });

export default mongoose.model('Recipe', recipeSchema);