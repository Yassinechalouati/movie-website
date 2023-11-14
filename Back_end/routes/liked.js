const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')


router.post('/like', (req, res) => {
    const user_name = req.body.user_name
    mysql.query('SELECT id FROM customer where Customer_name =? ', [user_name],  (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            const user_id = results[0].id
            console.log(user_id)
            mysql.query('SELECT DISTINCT series.series_name, series.series_pic FROM series JOIN series_list ON series.id = series_list.series_id JOIN customer ON customer.id = series_list.customer_id AND customer.id=?', [user_id], (err, response) => {
                console.log(response)
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                }
                else if (response.length !== 0) {
                    const series_liked = response
                    mysql.query('SELECT DISTINCT moviez.movie_name, moviez.movie_pic FROM moviez JOIN movies_list ON moviez.id = movies_list.moviez_id JOIN customer ON customer.id = movies_list.customer_id AND customer.id=?', [user_id], (error, ress) => {
                        if (error) {
                            console.log(error)
                        }
                        else if (ress.length !== 0) {
                            const moviez_liked = ress
                            res.json ({series_liked: series_liked, movies_liked:moviez_liked})
                        }
                        else {
                            const moviez_liked = ress
                            res.json ({series_liked: series_liked, movies_liked:moviez_liked})
                        }
                    } )
                }
                else {
                    mysql.query('SELECT DISTINCT moviez.movie_name, moviez.movie_pic FROM moviez JOIN movies_list ON moviez.id = movies_list.moviez_id JOIN customer ON customer.id = movies_list.customer_id AND customer.id=?', [user_id], (error, ress) => {
                        if (error) {
                            console.log(error)
                        }
                        else if (ress.length !== 0) {
                            const moviez_liked = ress
                            res.json ({series_liked: [], movies_liked:moviez_liked})
                        }
                    } )
                }
            })
        }
    })
} ) 

module.exports = router