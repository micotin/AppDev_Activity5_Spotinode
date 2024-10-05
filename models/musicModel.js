const db = require('../config/db');

// Function to get all songs
exports.getSongs = (callback) => {
    const query = 'SELECT * FROM music';  // Make sure the table name matches your database
    db.query(query, callback);
};

// Function to add a new song
exports.addSong = (songData, callback) => {
    const query = 'INSERT INTO music SET ?';  // Insert song data into the database
    db.query(query, songData, callback);
};

// Function to get a song by ID
exports.getSongById = (songId, callback) => {
    const query = 'SELECT * FROM music WHERE id = ?';
    db.query(query, [songId], callback);
};

exports.updateSong = (songId, updatedSongData, callback) => {
    const query = 'UPDATE music SET ? WHERE id = ?';  // '?' for parameterized queries
    db.query(query, [updatedSongData, songId], (err, result) => {  // Pass songId as a parameter
        if (err) {
            console.error('Database error updating song:', err);
            return callback(err);
        }
        callback(null, result);
    });
};


// Function to delete a song by ID
exports.deleteSong = (songId, callback) => {
    const query = 'DELETE FROM music WHERE id = ?';
    db.query(query, [songId], callback);
};
