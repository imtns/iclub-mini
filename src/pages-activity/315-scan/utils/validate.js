/**
 * 校验手机号：11位数字且以1开头
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  return /^1\d{10}$/.test(String(phone || ''))
}

/**
 * 校验收货地址表单
 * @param {{ receiverName: string, phone: string, detailAddress: string }} form
 * @returns {true | string} true 表示通过；返回字符串为未通过的提示信息
 */
export function validateAddress(form) {
  if (!form.receiverName || !form.receiverName.trim()) return '请输入收货人姓名'
  if (!form.phone) return '请输入联系电话'
  if (!validatePhone(form.phone)) return '请输入正确的手机号'
  if (!form.detailAddress || !form.detailAddress.trim()) return '请输入详细地址'
  return true
}
