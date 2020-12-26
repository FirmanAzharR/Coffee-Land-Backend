const {
  getTransactionModel,
  getDetailTransaction
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
  }
}
