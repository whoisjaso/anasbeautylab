/**
 * ANA'S BEAUTY LAB - File Upload Middleware
 * AWS S3 integration with Sharp image processing
 */

const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'), false);
  }
};

// Local storage for development (fallback)
const storage = multer.memoryStorage();

// Image processing middleware
exports.processImages = async (req, res, next) => {
  if (!req.files && !req.file) {
    return next();
  }
  
  try {
    const files = req.files || [req.file];
    const processedFiles = [];
    
    for (const file of files) {
      // Generate unique filename
      const filename = `${uuidv4()}.webp`;
      
      // Process image with Sharp
      const processedBuffer = await sharp(file.buffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
      
      // Generate thumbnail
      const thumbnailBuffer = await sharp(file.buffer)
        .resize(300, 300, { fit: 'cover' })
        .webp({ quality: 60 })
        .toBuffer();
      
      processedFiles.push({
        originalname: file.originalname,
        filename,
        buffer: processedBuffer,
        thumbnail: thumbnailBuffer,
        mimetype: 'image/webp',
        size: processedBuffer.length
      });
    }
    
    req.processedFiles = processedFiles;
    next();
    
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Error processing images'
    });
  }
};

// Multer upload configuration
exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Max 10 files
  }
});

// S3 upload function
exports.uploadToS3 = async (buffer, filename, folder = 'gallery') => {
  if (!process.env.AWS_BUCKET_NAME) {
    // Development fallback - save locally
    const fs = require('fs').promises;
    const uploadDir = path.join(__dirname, '..', 'uploads', folder);
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${folder}/${filename}`;
  }
  
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${filename}`,
    Body: buffer,
    ContentType: 'image/webp',
    ACL: 'public-read'
  };
  
  try {
    await s3Client.send(new PutObjectCommand(params));
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${filename}`;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
};

// Error handler for multer
exports.handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 10MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Too many files. Maximum is 10 files.'
      });
    }
  }
  
  if (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  
  next();
};
