const { request } = require('./request')

module.exports = {
  // 获取门店列表
  getAllShopList: (data) => request('/iclub-api/api/companyStore/welfareStoreList', 'POST', data, false, true),
  // 获取所有商品列表
  getAllProductList: (data) => request('/iclub-api/api/welfareProduct/query', 'POST', data, false, true),
  // 根据门店ID获取商品列表
  getProductListByStoreId: (data) => request('/iclub-api/api/welfareProduct/queryCompanyStoreProductList', 'POST', data, false, true),
  // 我的产品福利
  getMyBenefitsList: () => request('/iclub-api/api/welfareDetail/list'),
  // 我的福利金使用记录
  getMyBenefitsUseList: (params) => request('/iclub-api/api/welfareDetail/welfareUsageList', 'get', params),
  // 福利金使用详情
  getBenefitsUseDetail: (params) => request(`/iclub-api/api/welfareOrder/queryWelfareOrder/${params}`, 'get', params, true, true),
  // 转赠福利
  transferBenefis: (data) => request('/iclub-api/api/welfareDetail/transfer', 'POST', data, false, true, false, false),
  // 获取验证码
  getPhoneCode: () => request('/iclub-api/api/welfareOrder/getVerifyCode', 'POST'),
  // 获取治疗部位
  getTreatSiteList: () => request('/iclub-api/api/welfareOrder/queryTreatSiteList'),
  // 获取门店列表
  getStoreList: (data) => request('/iclub-api/api/companyStore/queryWelFareStoreList', 'POST', data, false, true),
  // 判断用户是否拥有过福利金
  checkFuliFlag: (data) => request('/iclub-api/api/welfareDetail/welfareFlag', 'POST', data, false, true),
  // 核销福利金
  useBenefitsMoney: (data) => request('/iclub-api/api/welfareOrder/add', 'POST', data, false, true),
  // 获取门店医生详情
  getDoctorInfo: (id) => request(`/iclub-api/api/companyStoreDoctor/get/${id}`),
  // 核销前判断未评价
  checkUnReview: () => request('/iclub-api/api/welfareDetail/checkWelfare', 'POST', {}, false, true, true, false),
  // 提交核销评价
  submitReview: (data) => request('/iclub-api/api/welfareDetail/submitCommont', 'POST', data, false, true, false, false),
  // 评价详情
  getReviewDetail: (data) => request('/iclub-api/api/welfareDetail/getWelfareOrderCommentDetail', 'POST', data, false, true, false, false)
}
