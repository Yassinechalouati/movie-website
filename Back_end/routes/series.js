const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')

router.post('/series', (req, res) => {
    mysql.query('SELECT * FROM series ', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            const series = results;
            res.json({series: series})
        }
    })
} ) 

module.exports = router
