const connection = require('../config/mysql')

module.exports = {
  getDataCheckoutModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT product_details.id_product_detail,product.product_name,size.size_name,product_details.product_price FROM product INNER JOIN product_details ON product.product_id = product_details.id_product INNER JOIN size ON product_details.id_size=size.size_id WHERE product_details.id_product_detail = ${id}`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}