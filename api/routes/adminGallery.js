/**
 * ANA'S BEAUTY LAB - Admin Gallery Routes
 * CRUD operations for gallery management
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { GalleryItem } = require('../models');
const { authenticate, authorizeEditor } = require('../middleware/auth');
const { upload, processImages, uploadToS3 } = require('../middleware/upload');

const router = express.Router();

// All routes require authentication
router.use(authenticate);
router.use(authorizeEditor);

// ============================================
// GET /api/admin/gallery
// Get all gallery items
// ============================================
router.get('/', async (req, res) => {
  try {
    const { category, status = 'all', page = 1, limit = 20 } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;
    
    // Execute query with pagination
    const galleryItems = await GalleryItem.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await GalleryItem.countDocuments(query);
    
    res.json({
      success: true,
      count: galleryItems.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: galleryItems
    });
    
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// ============================================
// POST /api/admin/gallery
// Create new gallery item
// ============================================
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').isIn(['acne', 'anti-aging', 'glow', 'lash', 'studio', 'instagram']).withMessage('Invalid category'),
  body('type').optional().isIn(['before-after', 'studio', 'instagram'])
], upload.array('images', 2), processImages, async (req, res) => {
  try {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { title, description, category, type, metadata } = req.body;
    
    // Upload images to S3
    let images = {};
    if (req.processedFiles && req.processedFiles.length > 0) {
      // For before-after, first image is before, second is after
      if (type === 'before-after' && req.processedFiles.length === 2) {
        const beforeUrl = await uploadToS3(req.processedFiles[0].buffer, `before-${req.processedFiles[0].filename}`, 'gallery');
        const afterUrl = await uploadToS3(req.processedFiles[1].buffer, `after-${req.processedFiles[1].filename}`, 'gallery');
        const thumbnailUrl = await uploadToS3(req.processedFiles[0].thumbnail, `thumb-${req.processedFiles[0].filename}`, 'gallery/thumbnails');
        
        images = {
          before: { url: beforeUrl, key: `gallery/before-${req.processedFiles[0].filename}` },
          after: { url: afterUrl, key: `gallery/after-${req.processedFiles[1].filename}` },
          thumbnail: { url: thumbnailUrl, key: `gallery/thumbnails/thumb-${req.processedFiles[0].filename}` }
        };
      } else {
        // Single image (studio, instagram)
        const url = await uploadToS3(req.processedFiles[0].buffer, req.processedFiles[0].filename, 'gallery');
        const thumbnailUrl = await uploadToS3(req.processedFiles[0].thumbnail, `thumb-${req.processedFiles[0].filename}`, 'gallery/thumbnails');
        
        images = {
          thumbnail: { url: thumbnailUrl, key: `gallery/thumbnails/thumb-${req.processedFiles[0].filename}` }
        };
      }
    }
    
    // Get max order
    const maxOrderItem = await GalleryItem.findOne().sort({ order: -1 });
    const order = maxOrderItem ? maxOrderItem.order + 1 : 0;
    
    // Create gallery item
    const galleryItem = await GalleryItem.create({
      title,
      description,
      category,
      type: type || 'studio',
      images,
      metadata: metadata ? JSON.parse(metadata) : {},
      order
    });
    
    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: galleryItem
    });
    
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// ============================================
// GET /api/admin/gallery/:id
// Get single gallery item
// ============================================
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }
    
    res.json({
      success: true,
      data: galleryItem
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// ============================================
// PUT /api/admin/gallery/:id
// Update gallery item
// ============================================
router.put('/:id', upload.array('images', 2), processImages, async (req, res) => {
  try {
    const { title, description, category, type, metadata, isActive, featured } = req.body;
    
    const updateData = {
      title,
      description,
      category,
      type,
      isActive,
      featured
    };
    
    if (metadata) {
      updateData.metadata = JSON.parse(metadata);
    }
    
    // Handle image updates
    if (req.processedFiles && req.processedFiles.length > 0) {
      // Similar logic to POST for uploading images
      // ... implementation
    }
    
    const galleryItem = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: galleryItem
    });
    
  } catch (error) {
    console.error('Update gallery error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// ============================================
// DELETE /api/admin/gallery/:id
// Delete gallery item
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findByIdAndDelete(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }
    
    // TODO: Delete images from S3
    
    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// ============================================
// PUT /api/admin/gallery/reorder
// Reorder gallery items
// ============================================
router.put('/reorder', async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, order }
    
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: 'Items must be an array'
      });
    }
    
    // Update all items
    const updates = items.map(item => 
      GalleryItem.findByIdAndUpdate(item.id, { order: item.order })
    );
    
    await Promise.all(updates);
    
    res.json({
      success: true,
      message: 'Gallery items reordered successfully'
    });
    
  } catch (error) {
    console.error('Reorder error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;
