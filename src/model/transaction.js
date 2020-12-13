const connection = require('../config/mysql')

module.exports = {
  getTransactionModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT*FROM transaction WHERE customer_id=${userId}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDetailTransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT*FROM transaction_details WHERE transaction_id = ${id}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
