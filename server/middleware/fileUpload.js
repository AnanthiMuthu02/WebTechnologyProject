const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinaryConfig'); // Adjust the path as needed
const { v4: uuidv4 } = require('uuid'); // Correctly import uuid

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipe_thumbnails',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => uuidv4(), // Use uuidv4 to generate a unique identifier
  },
});

const fileUpload = multer({ storage });

module.exports = fileUpload;
