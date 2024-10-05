const express = require('express');
const router = express.Router();
const musicController = require('../controller/musicController');
const multer = require('multer');
const path = require('path');

// Multer storage setup for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Create unique filenames
    },
});

const upload = multer({ storage });

// Routes
router.get('/', musicController.getSongs);  // Get all songs
router.get('/upload', musicController.showUploadForm);  // Show upload form

// Update route to handle both the image and song file uploads
router.post('/upload', upload.fields([{ name: 'image_cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), musicController.addSong);

router.get('/edit/:id', musicController.getSongById);  // Get song by ID for editing
router.post('/edit/:id', upload.single('songFile'), musicController.updateSong);  // Update song
router.post('/edit/:id', musicController.updateSong);  // Handle edit/update request
router.post('/delete/:id', musicController.deleteSong);  // Delete song


module.exports = router;
