const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')


router.post('/series-comments', (req, res) => {
    const series_name = req.body.series_name
    mysql.query('SELECT id FROM series where series_name =? ', [series_name],  (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            const series_id = results[0].id
            console.log(series_id)
            mysql.query('SELECT series_comments.series_comment, series_comments.likes, series_comments.dislikes, series_comments.sent_at, customer.profile_pic, customer.Customer_name FROM series JOIN series_comments ON series.id = series_comments.series_id AND series.id=? JOIN customer ON customer.id = series_comments.customer_id order by series_comments.sent_at asc', [series_id], (err, response) => {
                console.log(response)
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                }
                else if (response.length !== 0) {
                    const comments = response
                    res.json({message : comments})
                }
                else {
                    res.json({message : 'no comments'})
                }
            })
        }
    })
} ) 

module.exports = router