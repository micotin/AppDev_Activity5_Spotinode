const db = require('../config/db'); // Adjust the path as necessary

exports.getAllSongs = (req, res) => {
    // Fetch songs from the database and render the index page
    db.query('SELECT * FROM songs', (err, results) => {
        if (err) throw err;
        res.render('index', { queue: results, playlists: [] }); // You might want to fetch playlists as well
    });
};

exports.addSongForm = (req, res) => {
    res.render('add');
};

exports.addSong = (req, res) => {
    const { title, artist, album } = req.body;
    const file_path = req.file.path; // This should now work if multer is set up correctly

    db.query('INSERT INTO songs (title, artist, album, file_path) VALUES (?, ?, ?, ?)', [title, artist, album, file_path], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};


exports.editSongForm = (req, res) => {
    const songId = req.params.id;
    db.query('SELECT * FROM songs WHERE id = ?', [songId], (err, results) => {
        if (err) throw err;
        res.render('edit', { song: results[0] });
    });
};

exports.editSong = (req, res) => {
    const songId = req.params.id;
    const { title, artist, album } = req.body;

    db.query('UPDATE songs SET title = ?, artist = ?, album = ? WHERE id = ?', [title, artist, album, songId], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};
