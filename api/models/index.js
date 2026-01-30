/**
 * ANA'S BEAUTY LAB - Database Models
 * MongoDB schemas with validation and indexing
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ============================================
// USER MODEL (Admin)
// ============================================

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'admin'
  },
  profile: {
    name: {
      type: String,
      default: 'Analie'
    },
    phone: String,
    avatar: String
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ============================================
// GALLERY ITEM MODEL
// ============================================

const galleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['acne', 'anti-aging', 'glow', 'lash', 'studio', 'instagram'],
      message: 'Category must be: acne, anti-aging, glow, lash, studio, or instagram'
    }
  },
  type: {
    type: String,
    enum: ['before-after', 'studio', 'instagram'],
    default: 'studio'
  },
  images: {
    before: {
      url: String,
      key: String // S3 key
    },
    after: {
      url: String,
      key: String
    },
    thumbnail: {
      url: String,
      key: String
    }
  },
  metadata: {
    sessions: {
      type: Number,
      min: [1, 'Must have at least 1 session']
    },
    timeframe: String,
    clientQuote: {
      type: String,
      maxlength: [300, 'Quote cannot exceed 300 characters']
    },
    clientName: String,
    hasConsent: {
      type: Boolean,
      default: false
    }
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for performance
galleryItemSchema.index({ category: 1, order: 1 });
galleryItemSchema.index({ isActive: 1, featured: 1 });
galleryItemSchema.index({ createdAt: -1 });

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

// ============================================
// SERVICE MODEL
// ============================================

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [15, 'Minimum duration is 15 minutes']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['facial', 'lash', 'peel', 'waxing', 'package']
  },
  features: [{
    type: String,
    maxlength: [100, 'Feature cannot exceed 100 characters']
  }],
  image: {
    url: String,
    key: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  preparation: [{
    type: String,
    maxlength: [200, 'Preparation item cannot exceed 200 characters']
  }],
  aftercare: [{
    type: String,
    maxlength: [200, 'Aftercare item cannot exceed 200 characters']
  }],
  contraindications: [{
    type: String,
    maxlength: [200, 'Contraindication cannot exceed 200 characters']
  }]
}, {
  timestamps: true
});

serviceSchema.index({ category: 1, order: 1 });
serviceSchema.index({ isActive: 1, isPopular: 1 });
serviceSchema.index({ slug: 1 });

const Service = mongoose.model('Service', serviceSchema);

// ============================================
// BOOKING MODEL
// ============================================

const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  clientEmail: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  clientPhone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  source: {
    type: String,
    enum: ['website', 'instagram', 'referral', 'google', 'other'],
    default: 'website'
  },
  reminderSent: {
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false }
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

bookingSchema.index({ date: 1, status: 1 });
bookingSchema.index({ clientEmail: 1 });
bookingSchema.index({ createdAt: -1 });

const Booking = mongoose.model('Booking', bookingSchema);

// ============================================
// ANALYTICS MODEL
// ============================================

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['pageview', 'booking', 'contact', 'gallery_view', 'service_view'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  sessionId: String,
  ipAddress: String,
  userAgent: String,
  referrer: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

analyticsSchema.index({ type: 1, timestamp: -1 });
analyticsSchema.index({ timestamp: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

// ============================================
// SETTINGS MODEL
// ============================================

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: mongoose.Schema.Types.Mixed,
  description: String
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

// ============================================
// EXPORTS
// ============================================

module.exports = {
  User,
  GalleryItem,
  Service,
  Booking,
  Analytics,
  Settings
};
