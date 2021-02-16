const helper = require('../helper/response')
const {
  getDataCheckoutModel,
  postCheckoutModel,
  postDataCheckoutModel,
  updateStockModel,
  getOrderModel,
  getOrderCountModel,
  MarkDoneModel
} = require('../model/checkout')
const { getDetailProductByIdModel } = require('../model/product')
const qs = require('querystring')

const dataCheckout = []
let subTotalHarga = 0
let transactionId = ''
module.exports = {
  markDone: async (request, response) => {
    try {
      const { id } = request.body
      const result = await MarkDoneModel(id)
      return helper.response(response, 200, 'Order Confirmed', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad request', error)
    }
  },
  getOrder: async (request, response) => {
    try {
      let { page, limit } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      let totalData
      const offset = page * limit - limit
      const result = await getOrderModel(limit, offset)
      if (result) {
        totalData = await getOrderCountModel()
      } else {
        return helper.response(response, 400, 'Get Order Empty', result)
      }
      const totalPage = Math.ceil(totalData / limit)

      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:5000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:5000/product?${prevLink}`
      }
      const newData = {
        result,
        pageInfo
      }
      return helper.response(response, 200, 'Success Get Order', newData)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCheckout: async (request, response) => {
    try {
      const newOrderData = []
      let subtotal = 0
      dataCheckout.push(request.body)
      // hanya untuk menampilkan data secara lengkap
      for (let i = 0; i < dataCheckout.length; i++) {
        const result = await getDataCheckoutModel(
          dataCheckout[i].id_product_detail
        )
        const {
          id_product_detail,
          product_name,
          size_name,
          product_price
        } = result[0]
        const data = {
          id_product_detail,
          product_name,
          size_name,
          quantity: dataCheckout[i].quantity,
          product_price: product_price * dataCheckout[i].quantity,
          deliveryMethod: dataCheckout[i].deliveryMethod
        }
        newOrderData.push(data)
        subtotal = subtotal + data.product_price
        subTotalHarga = subtotal
      }
      console.log(subTotalHarga)
      // end
      return helper.response(response, 200, 'Success Get Checkout', [
        newOrderData,
        { subtotal: subtotal }
      ])
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  removeItem: async (request, response) => {
    try {
      const showData = []

      const { id } = request.params
      const findItem = await dataCheckout.find((x, y) => {
        let dataRemove
        if (x.id_product_detail === id) {
          dataRemove = dataCheckout.splice(y, 1)
        }
        return dataRemove
      })

      // hanya untuk menampilkan data secara lengkap
      for (let i = 0; i < dataCheckout.length; i++) {
        const result = await getDataCheckoutModel(
          dataCheckout[i].id_product_detail
        )
        const {
          id_product_detail,
          product_name,
          size_name,
          product_price
        } = result[0]
        const data = {
          id_product_detail,
          product_name,
          size_name,
          quantity: dataCheckout[i].quantity,
          product_price: product_price * dataCheckout[i].quantity,
          deliveryMethod: dataCheckout[i].deliveryMethod
        }
        showData.push(data)
      }
      // end

      return helper.response(
        response,
        200,
        'Current Item on Checkout',
        showData
      )
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  editItem: async (request, response) => {
    try {
      const showData = []
      const { id } = request.params
      const { deliveryMethod, quantity } = request.body
      const newData = {
        id_product_detail: id,
        deliveryMethod,
        quantity
      }
      // console.log(newData)
      const findItem = await dataCheckout.find((x, y) => {
        let editData
        if (x.id_product_detail === id) {
          editData = dataCheckout.splice(y, 1, newData)
        }
        return editData
      })
      // console.log(findItem)
      // console.log(dataCheckout)
      // hanya untuk menampilkan data secara lengkap
      for (let i = 0; i < dataCheckout.length; i++) {
        const result = await getDataCheckoutModel(
          dataCheckout[i].id_product_detail
        )
        const {
          id_product_detail,
          product_name,
          size_name,
          product_price
        } = result[0]
        const data = {
          id_product_detail,
          product_name,
          size_name,
          quantity: dataCheckout[i].quantity,
          product_price: product_price * dataCheckout[i].quantity,
          deliveryMethod: dataCheckout[i].deliveryMethod
        }
        showData.push(data)
      }
      // end
      return helper.response(
        response,
        200,
        'Current Item on Checkout',
        showData
      )
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postDataCheckout: async (request, response) => {
    try {
      const {
        customer_id,
        transaction_number,
        address,
        payment,
        sub_total,
        tax,
        discount,
        total
      } = request.body
      const transactionData = {
        customer_id,
        transaction_number,
        address,
        payment,
        sub_total,
        tax,
        discount,
        total,
        transaction_created_at: new Date()
      }
      const transactionResult = await postCheckoutModel(transactionData)
      transactionId = transactionResult.transaction_id
      return helper.response(response, 200, 'Checkout success')
    } catch (error) {
      return helper.response(response, 400, 'Checkout failed', error)
    }
  },
  postDetailCheckout: async (request, response) => {
    try {
      const data = request.body
      for (let i = 0; i < data.length; i++) {
        const { product_id, size, quantity, price, delivery } = data[i]
        const objectData = {
          transaction_id: transactionId,
          product_id,
          size,
          quantity,
          price,
          delivery,
          detail_created_at: new Date()
        }
        const result = await postDataCheckoutModel(objectData)
      }

      return helper.response(response, 200, 'Check your transaction on history')
    } catch (error) {
      return helper.response(response, 400, 'Checkout failed', error)
    }

    // const getProductId = await getDetailProductByIdModel(
    //   objectData.id_product_detail
    // )
    // const updateStok = await updateStockModel(
    //   getProductId[0].product_id,
    //   objectData.quantity
    // )
  }
}
