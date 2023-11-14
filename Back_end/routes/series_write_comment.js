const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')

router.post('/series_write_comments', (req, res) => {
    const user_name = req.body.user_name
    const series_name = req.body.series_name
    const series_comment = req.body.comment
    let user_id
    let series_id
    mysql.query('SELECT id FROM Customer where Customer_name =? ', [user_name],  (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            user_id = results[0].id
            console.log(user_id)
        }
    })
    mysql.query('SELECT id FROM series where series_name =?', [series_name], (err, results) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'})
        }
        else {
            series_id = results[0].id
            console.log(series_id)
        }
    mysql.query('INSERT INTO series_comments (series_id, customer_id, series_comment, likes, dislikes) VALUES (?, ?, ?, 0, 0)', [series_id, user_id, series_comment], (err, results)=> {
        if (err) {
            console.log(results)
            res.status(500).json({message: 'Internal server error'})
        }   
        else {
           mysql.query('SELECT * FROM series_comments ', (err,resul) => {
            if (err) {
                res.status(500).json({message: 'Internal server error'})
            }
            else {
            const result = resul[resul.length-1];
            console.log(result)
            res.json({date: result.sent_at})
            }
           })
            
        }
    })
    })
    
} ) 

module.exports = router