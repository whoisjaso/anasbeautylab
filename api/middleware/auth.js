/**
 * ANA'S BEAUTY LAB - Authentication Middleware
 * JWT verification and role checking
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Verify JWT token
exports.authenticate = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    
    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User no longer exists'
      });
    }
    
    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account has been deactivated'
      });
    }
    
    // Add user to request
    req.user = user;
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// Check if user is admin
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// Check if user is admin or editor
exports.authorizeEditor = (req, res, next) => {
  if (!['admin', 'editor'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Insufficient privileges.'
    });
  }
  next();
};
