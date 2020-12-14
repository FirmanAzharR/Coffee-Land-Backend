const mysql = require('mysql')
require('dotenv').config({ path: '../../.env' })

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERS,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  timeout: process.env.DB_TIME
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('You are now Connected ...')
})

module.exports = connection
