//to post image or video using cloudinary
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const {cloudinaryStorage} = require('multer-storage-cloudinary');
require('dotenv').config();
