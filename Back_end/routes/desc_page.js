const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')

router.post('/description', (req, res) => {
    const movie_name = req.body.movie_name
    mysql.query('SELECT * FROM moviez where movie_name =? ', [movie_name],  (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            const movies = results[0];
            res.json({movies: movies})
        }
    })
} ) 

module.exports = router
