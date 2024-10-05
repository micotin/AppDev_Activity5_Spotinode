const musicModel = require('../models/musicModel'); // Import the music model

// Get all songs and render the homepage
exports.getSongs = (req, res) => {
    musicModel.getSongs((err, results) => {
        if (err) {
            console.error('Error fetching songs: ', err);
            return res.status(500).send('Error fetching songs');
        }
        res.render('index', { 
            title: 'Audio Player Example', 
            tracks: results  // Pass the songs fetched from the database
        });
    });
};

// Show the form to upload a new song
exports.showUploadForm = (req, res) => {
    res.render('upload');  // Make sure you have this view in your views folder
};

// Add a new song
exports.addSong = (req, res) => {
    const songData = {
        title: req.body.title,
        artist: req.body.artist,
        image_path: req.files['image_cover'][0].path,  // Get cover image path
        file_path: req.files['songFile'][0].path  // Get song file path
    };

    musicModel.addSong(songData, (err, result) => {
        if (err) {
            console.error('Error adding song: ', err);
            return res.status(500).send('Error adding song');
        }
        res.redirect('/');  // Redirect to the home page after upload
    });
};

// Get a song by ID for editing
exports.getSongById = (req, res) => {
    const songId = req.params.id;

    musicModel.getSongById(songId, (err, result) => {
        if (err) {
            console.error('Error fetching song by ID: ', err);
            return res.status(500).send('Error fetching song by ID');
        }
        res.render('editForm', { song: result[0] });  // Render the edit form, passing the song data
    });
};

exports.updateSong = (req, res) => {
    const songId = req.params.id;  // Get the song ID from the URL parameters
    const updatedSongData = {
        title: req.body.title,
        artist: req.body.artist,
        image_path: req.file ? req.file.path : req.body.existingImagePath  // Check if a new image was uploaded
    };

    musicModel.updateSong(songId, updatedSongData, (err, result) => {
        if (err) {
            console.error('Error updating song: ', err);  // Log error details
            return res.status(500).send('Error updating song');
        }
        res.redirect('/');
    });
};


// Delete a song
exports.deleteSong = (req, res) => {
    const songId = req.params.id;

    musicModel.deleteSong(songId, (err, result) => {
        if (err) {
            console.error('Error deleting song: ', err);
            return res.status(500).send('Error deleting song');
        }
        res.redirect('/');
    });
};
