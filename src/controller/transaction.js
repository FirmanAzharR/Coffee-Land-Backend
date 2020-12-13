const { getTransactionModel, getDetailTransaction } = require('../model/transaction')

const helper = require('../helper/response')

module.exports = {
  getTransaction: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getTransactionModel(id)
      return helper.response(response, 200, `Success Get Transaction id_customer ${id}`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getDetailTransaction: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getDetailTransaction(id)
      return helper.response(response, 200, `Success Get Detail Transaction transaction_id ${id}`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
