const express = require('express');
const musicController = require('../controller/musicController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify your upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2, 15);
        cb(null, uniqueSuffix + '-' + file.originalname); // create a unique filename
    },
});

// Configure multer with limits and file filter
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /mp3|wav|ogg/; // Supported file types
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: File type not supported!'));
        }
    }
});

// Define routes
router.get('/', musicController.getAllSongs);
router.get('/add', musicController.addSongForm);
router.post('/add', upload.single('songFile'), musicController.addSong); // Use multer for file upload
router.get('/edit/:id', musicController.editSongForm);
router.post('/edit/:id', musicController.editSong);

module.exports = router;
