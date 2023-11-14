const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')

router.post('/movies', (req, res) => {
    mysql.query('SELECT * FROM moviez ', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            const movies = results;
            res.json({movies: movies})
        }
    })
} ) 

module.exports = router
