const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const mysql = require('../Sql_connection')



// Sign-up endpoint
router.post('/signup', (req, res) => {
  const Customer_name = req.body.Customer_name;
  const profile_pic = req.body.profile_pic;
  const email = req.body.email;
  const password = req.body.password;
  let emailExists = false;
  let usernameExists = false;
  if (Customer_name !== '' && profile_pic !== '' && email !== '' & password !== '') {
    // Hash password
  bcrypt.hash(password, 10)
  .then(hash => {
    // Check if email already exists in database
    mysql.query('SELECT * FROM customer where Email=?', [email], (err, results) => {
      if (err) {
        console.error('Error', err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length > 0)  {
        console.log('Email already exists!')
        emailExists = true;
      }

      // Check if username already exists in database
      mysql.query('SELECT * FROM customer where Customer_name=?', [Customer_name], (err, results) => {
        if (err) {
          console.error('Error', err);
          res.status(500).json({ message: 'Internal server error' });
        } else if (results.length > 0)  {
          console.log('Username already exists!')
          usernameExists = true;
        }

        // If email or username already exists, send response and end function
        if (usernameExists){
          res.json({ message: 'Username already exists!' });
        } 
        else if (emailExists) {
          res.json({ message: 'Email already exists!' });
        } else {

          // Insert new user into MySQL database
          mysql.query('INSERT INTO Customer (Customer_name, Email, pword, profile_pic) VALUES (?, ?, ?, ?)', [Customer_name, email, hash, profile_pic], (err, results) => {
            if (err) {
              console.error('Error inserting new user into MySQL:', err);
              res.status(500).json({ message: 'Internal server error' });
            } else {
              res.json({ message: 'User created successfully' });
            }
          });
        }
      });
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
  }
  else {
    res.json({message: 'fields are empty!'})
  }

  
});

module.exports = router