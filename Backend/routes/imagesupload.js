const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/blogImages/'); // Destination folder for uploaded images
    },
    
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Rename file with current timestamp + original extension
  }
});

// Initialize multer upload
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('upload'); // 'image' is the name of the file input field in the form

// Check file type
function checkFileType(file, cb) {
    const allowedExtensions = /jpeg|jpg|png/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);
  
    if (mimetype && extname) {
      cb(null, true);
    } else {
      const error = new Error('Error: Images only (JPEG, JPG, PNG)!');
      cb(error, false);
    }
}

// Upload endpoint
router.post('/', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      next(err);
    } else {
      if (!req.file) {
        const error = new Error('No file selected!');
        next(error);
      } else {
        res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
      }
    }
  });
});

module.exports = router;