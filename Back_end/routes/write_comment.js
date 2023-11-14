const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')

router.post('/write_comments', (req, res) => {
    const user_name = req.body.user_name
    const movie_name = req.body.movie_name
    const movie_comment = req.body.comment
    let user_id
    let movie_id
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
    mysql.query('SELECT id FROM moviez where movie_name =?', [movie_name], (err, results) => {
        if (err) {
            res.status(500).json({message: 'Internal server error'})
        }
        else {
            movie_id = results[0].id
            console.log(movie_id)
        }
    mysql.query('INSERT INTO movie_comments (movie_id, customer_id, Movie_comment, likes, dislikes) VALUES (?, ?, ?, 0, 0)', [movie_id, user_id, movie_comment], (err, results)=> {
        if (err) {
            console.log(results)
            res.status(500).json({message: 'Internal server error'})
        }   
        else {
           mysql.query('SELECT * FROM movie_comments ', (err,resul) => {
            const result = resul[resul.length-1];
            console.log(result)
            res.json({date: result.sent_at})
           })
            
        }
    })
    })
    
} ) 

module.exports = router