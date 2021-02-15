const connection = require('../config/mysql')

module.exports = {
  getTransactionModel: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT*FROM transaction WHERE customer_id=${userId} ORDER BY(transaction_id) DESC`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getTransactionById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT*FROM transaction WHERE transaction_id=${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteTransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM transaction WHERE transaction_id=${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteDetailTransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM transaction_details WHERE transaction_id=${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDetailTransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT product.product_name, product.product_img, transaction_details.size,transaction_details.quantity,
transaction_details.price,transaction_details.delivery FROM transaction_details JOIN product ON transaction_details.product_id = product.product_id  WHERE transaction_details.transaction_id = ${id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
