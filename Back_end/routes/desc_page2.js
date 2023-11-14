const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')

router.post('/description-series', (req, res) => {
    const series_name = req.body.series_name
    mysql.query('SELECT * FROM series where series_name =? ', [series_name],  (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            const series = results[0];
            res.json({series: series})
        }
    })
} ) 

module.exports = router
