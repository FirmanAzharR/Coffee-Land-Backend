const connection = require('../config/mysql')

module.exports = {
  getDataCheckoutModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT product_details.id_product_detail,product.product_name,size.size_name,product_details.product_price FROM product INNER JOIN product_details ON product.product_id = product_details.id_product INNER JOIN size ON product_details.id_size=size.size_id WHERE product_details.id_product_detail = ${id}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  postCheckoutModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transaction SET ?', data, (error, result) => {
        const insertResult = {
          transaction_id: result.insertId,
          ...data
        }
        !error ? resolve(insertResult) : reject(new Error(error))
      })
    })
  },
  postDataCheckoutModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO transaction_details SET ?', data, (error, result) => {
        const insertResult = {
          ...data
        }
        !error ? resolve(insertResult) : reject(new Error(error))
      })
    })
  },
  updateStockModel: (id, stock) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE product SET product_stock=product_stock-${stock} WHERE product_id =${id}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
