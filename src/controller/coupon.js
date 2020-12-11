const { getCouponModel, getCouponByIdModel } = require('../model/coupon')

const helper = require('../helper/response')

module.exports = {
  getCoupon: async (request, response) => {
    try {
      const result = await getCouponModel()
      return helper.response(response, 200, 'Success Get Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCouponById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCouponByIdModel(id)
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get Product', result)
      } else {
        return helper.response(response, 200, `failed ,id ${id} Not Found Product`, result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  }

}
