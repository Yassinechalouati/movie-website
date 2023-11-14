const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')


router.post('/comments', (req, res) => {
    const movie_name = req.body.movie_name
    mysql.query('SELECT id FROM moviez where movie_name =? ', [movie_name],  (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            const movie_id = results[0].id
            console.log(movie_id)
            mysql.query('SELECT movie_comments.Movie_comment, movie_comments.likes, movie_comments.dislikes, movie_comments.sent_at, customer.profile_pic, customer.Customer_name FROM moviez JOIN movie_comments ON moviez.id = movie_comments.movie_id AND moviez.id=? JOIN customer ON customer.id = movie_comments.customer_id order by movie_comments.sent_at asc', [movie_id], (err, response) => {
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