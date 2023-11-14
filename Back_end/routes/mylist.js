const express = require('express');
const router = express.Router()
const mysql = require('../Sql_connection')

router.post('/movies_mylist', (req, res)=> {
    const movie_name = req.body.movies_name
    const user_name = req.body.customer_name
    let movie_id
    let user_id 
    mysql.query('SELECT id FROM Customer where Customer_name =? ', [user_name],  (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
        else {
            user_id = results[0].id
            console.log(user_id) 
            mysql.query('SELECT id FROM moviez where movie_name =? ', [movie_name],  (err, resul) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                }
                else {
                    movie_id = resul[0].id
                    console.log(movie_id)
                    mysql.query('INSERT INTO movies_list (customer_id, moviez_id, isLiked) VALUES (?, ?, 1)', [user_id, movie_id],  (err, resu) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Internal server error' });
                        }
                        else {
                            res.json({message:'liked'})
                        }
                        
                    })
                }
            })
        }
    })

    

   

    
})

module.exports= router 