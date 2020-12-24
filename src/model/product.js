const connection = require('../config/mysql')

module.exports = {
  getProductModel: (limit, offset, category, search, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
    `SELECT product.product_id,  product.category_id,product.product_name,product.product_discon, product_details.product_price FROM product INNER JOIN category ON product.category_id = category.id_category INNER JOIN product_details ON product.product_id = product_details.id_product INNER JOIN size ON product_details.id_size = size.size_id WHERE product.category_id LIKE '%${category}%' AND product.product_name LIKE '%${search}%' GROUP BY product.product_id ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
    (error, result) => {
      !error ? resolve(result) : reject(new Error(error))
    }
      )
    })
  },
  getProductCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total_product FROM product',
        (error, result) => {
          !error ? resolve(result[0].total_product) : reject(new Error(error))
        }
      )
    })
  },
  getProductByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
    `SELECT*FROM product INNER JOIN category ON product.category_id = category.id_category INNER JOIN product_details ON product.product_id = product_details.id_product INNER JOIN size ON product_details.id_size = size.size_id WHERE product.product_id = ${id}`,
    (error, result) => {
      !error ? resolve(result) : reject(new Error(error))
    }
      )
    })
  },
  getDetailProductByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
    `SELECT product.product_id,product.category_id,product.product_name, product_details.id_size, size.size_name ,product_details.product_price FROM product INNER JOIN category ON product.category_id = category.id_category INNER JOIN product_details ON product.product_id = product_details.id_product INNER JOIN size ON product_details.id_size = size.size_id WHERE product_details.id_product_detail = ${id}`,
    (error, result) => {
      !error ? resolve(result) : reject(new Error(error))
    }
      )
    })
  },
  postProductModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (error, result) => {
        if (!error) {
          const insertResult = {
            product_id: result.insertId,
            ...data
          }
          resolve(insertResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  postDetailProductModel: (id, size, price, date, status) => {
    return new Promise((resolve, reject) => {
      const data = {
        id_product: id,
        id_size: size,
        product_price: price,
        p_detail_created_at: date,
        p_detail_status: status
      }
      connection.query(
        'INSERT INTO product_details SET ?',
        data,
        (error, result) => {
          if (!error) {
            const insertResult = {
              product_id: result.insertId,
              ...data
            }
            resolve(insertResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchProductModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE product SET ? WHERE product_id = ?',
        [data, id],
        (error, result) => {
          if (!error) {
            const updateResult = {
              product_id: id,
              ...data
            }
            resolve(updateResult)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  patchDetailProductModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE product_details SET ? WHERE id_product_detail = ?',
        [data, id],
        (error, result) => {
          if (!error) {
            const updateResult = {
              product_id: id,
              ...data
            }
            resolve(updateResult)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  deleteProductModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
    `DELETE FROM product WHERE product_id = ${id}`,
    (error, result) => {
      if (!error) {
        const updateResult = {
          product_id: id,
          ...data
        }
        resolve(updateResult)
      } else {
        reject(error)
      }
    }
      )
    })
  },
  deleteDetailProductModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
    `DELETE FROM product_details WHERE id_product = ${id}`,
    (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    }
      )
    })
  }
}
