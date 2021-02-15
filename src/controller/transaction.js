const {
  getTransactionModel,
  getDetailTransaction,
  deleteTransaction,
  deleteDetailTransaction,
  getTransactionById
} = require('../model/transaction')

const helper = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getTransaction: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getTransactionModel(id)
      client.setex('gettransaction', 3600, JSON.stringify(result))
      return helper.response(
        response,
        200,
        `Success Get Transaction id_customer ${id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getTransactionById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getTransactionById(id)
      return helper.response(
        response,
        200,
        `Success Get Transaction id_customer ${id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getDetailTransaction: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getDetailTransaction(id)
      client.setex(`gettransaction:${id}`, 3600, JSON.stringify(result))
      return helper.response(
        response,
        200,
        `Success Get Detail Transaction transaction_id ${id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteTransactions: async (request, response) => {
    try {
      const { id } = request.params
      const cek = await getTransactionById(id)
      if (cek.length > 0) {
        const detail = await deleteDetailTransaction(id)
        const trans = await deleteTransaction(id)
        return helper.response(
          response,
          200,
          'Your History Deleted successfully'
        )
      } else {
        return helper.response(response, 400, 'Transaction Not found', error)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
