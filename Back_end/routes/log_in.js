const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('../Sql_connection')



// Secret key for JWT
const secretKey = 'mysecretkey';



// Login endpoint
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email in database
  mysql.query('SELECT * FROM Customer WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }else if (results.length === 0) {
      // User not found
      res.json({ message: 'Invalid email' });
    }
    else {
      const user = results[0];
    console.log(password, user )

    // Compare password hash
    bcrypt.compare(password, user.pword)
      .then(match => {
        if (!match) {
          // Passwords don't match
          res.json({ message: 'Invalid password' });
        } else {
          // Passwords match, create and send JWT
          res.json({ message: 'in', user: user.Customer_name, picture: user.profile_pic});
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
    }

    

    
  });
});

module.exports = router
