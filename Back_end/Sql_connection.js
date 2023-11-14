const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yassine123456789',
  database: 'movies_project'
})

connection.connect()

connection.query('SELECT* FROM customer;', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0])
})

module.exports = connection