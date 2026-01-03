import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// Get all recipes with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, category, difficulty, search } = req.query;

    const filter = { isApproved: true };
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (search) filter.$text = { $search: search };

    const recipes = await Recipe.find(filter)
      .populate('products.product')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Recipe.countDocuments(filter);

    res.json({
      success: true,
      recipes,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recipes',
      error: error.message
    });
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('products.product').populate('createdBy', 'name');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.json({
      success: true,
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recipe',
      error: error.message
    });
  }
});

// Create new recipe
router.post('/', async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating recipe',
      error: error.message
    });
  }
});

// Get popular recipes
router.get('/featured/popular', async (req, res) => {
  try {
    const recipes = await Recipe.find({ isApproved: true })
      .sort({ views: -1, rating: -1 })
      .limit(6)
      .populate('products.product');

    res.json({
      success: true,
      recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular recipes',
      error: error.message
    });
  }
});

export default router;