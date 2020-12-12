const { getCouponModel, getCouponByIdModel, postCouponByIdModel, deleteCouponByIdModel, patchCouponByIdModel } = require('../model/coupon')

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
  },
  postCoupon: async (request, response) => {
    const { coupon_code, product_id, coupon_discon, coupon_start, coupon_end, coupon_information, coupon_status } = request.body

    const data = {
      coupon_code,
      product_id,
      coupon_discon,
      coupon_start,
      coupon_end,
      coupon_information,
      coupon_created_at: new Date(),
      coupon_status
    }

    try {
      const result = await postCouponByIdModel(data)
      helper.response(response, 200, 'coupon inserted succesfully', result)
    } catch (error) {
      console.log(error)
      helper.response(response, 400, 'coupon not inserted', error)
    }
  },
  deleteCoupon: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCouponByIdModel(id)
      if (result.length > 0) {
        const deleteResult = await deleteCouponByIdModel(id)
        return helper.response(response, 200, 'Success Delete Product', deleteResult)
      } else {
        return helper.response(response, 200, `failed ,id ${id} Not Found Product`, result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchCoupon: async (request, response) => {
    const { coupon_code, product_id, coupon_discon, coupon_start, coupon_end, coupon_information, coupon_status } = request.body

    const data = {
      coupon_code,
      product_id,
      coupon_discon,
      coupon_start,
      coupon_end,
      coupon_information,
      coupon_updated_at: new Date(),
      coupon_status
    }

    const { id } = request.params

    try {
      const result = await patchCouponByIdModel(data, id)
      helper.response(response, 200, 'coupon updated succesfully', result)
    } catch (error) {
      console.log(error)
      helper.response(response, 400, 'coupon not updated', error)
    }
  }
}
