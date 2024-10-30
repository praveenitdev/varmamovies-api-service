const db = require('../db');

// Get all movies
const getMovies = (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// Get movie by ID
const getMovieById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
};

// Create a new movie
const createMovie = (req, res) => {
    const { title, genre, director, release_year } = req.body;
    db.query(
        'INSERT INTO movies (url, title, genre, director, release_year) VALUES (?, ?, ?, ?, ?)',
        [title, genre, director, release_year],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, title, genre, director, release_year });
        }
    );
};

// Update a movie
const updateMovie = (req, res) => {
    const { id } = req.params;
    const { url, title, genre, director, release_year } = req.body;
    db.query(
        'UPDATE movies SET url = ?, title = ?, genre = ?, director = ?, release_year = ? WHERE id = ?',
        [url, title, genre, director, release_year, id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ url, id, title, genre, director, release_year });
        }
    );
};

// Delete a movie
const deleteMovie = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Movie deleted successfully.' });
    });
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
