const connection = require('../config/mysql')

module.exports = {
  getSubTotalMonth: (filter) => {
    return new Promise((resolve, reject) => {
      if (filter === 'year') {
        connection.query(
          'SELECT SUM(subtotal) AS subtotal_transaksi FROM TRANSACTION WHERE  YEAR(`transaction_created_at`) = YEAR(NOW())',
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      } else {
        connection.query(
          'SELECT SUM(subtotal) AS subtotal_transaksi FROM TRANSACTION WHERE  MONTH(`transaction_created_at`) = MONTH(NOW())',
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      }
    })
  },
  getTransactionNow: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(subtotal) AS subtotal_transaksi,COUNT(transaction_id) AS total_transaction FROM TRANSACTION WHERE  DATE(`transaction_created_at`) = DATE(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getTransactionYear: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(subtotal) AS subtotal_transaksi,COUNT(transaction_id) AS total_transaction FROM TRANSACTION WHERE  YEAR(`transaction_created_at`) = YEAR(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  totalTransaction: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(transaction_id) AS total_transaction FROM TRANSACTION',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
