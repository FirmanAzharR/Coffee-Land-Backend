const connection = require('../config/mysql')

module.exports = {
  getSubTotalMonth: (filter) => {
    return new Promise((resolve, reject) => {
      if (filter === 'year') {
        connection.query(
          'SELECT COUNT(`transaction_id`) AS total_transaksi, YEAR(transaction_created_at) AS tahun FROM transaction  GROUP BY(YEAR(`transaction_created_at`))',
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      } else {
        connection.query(
          'SELECT COUNT(`transaction_id`) AS total_transaksi, MONTH(transaction_created_at) AS bulan FROM transaction WHERE YEAR(`transaction_created_at`) = YEAR(NOW()) GROUP BY(MONTH(`transaction_created_at`))',
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
        'SELECT SUM(total) AS total_transaksi,COUNT(transaction_id) AS total_transaction FROM transaction WHERE  DATE(`transaction_created_at`) = DATE(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getTransactionYear: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(total) AS total_transaksi,COUNT(transaction_id) AS total_transaction FROM transaction WHERE  YEAR(`transaction_created_at`) = YEAR(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  totalTransaction: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(transaction_id) AS total_transaction FROM transaction',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
