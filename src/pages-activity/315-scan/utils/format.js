/**
 * 星星数量格式化：正数 → '+N颗'，负数 → '-N颗'，0 → '0颗'
 * @param {number} num
 * @returns {string}
 */
export function formatStarAmount(num) {
  if (num > 0) return `+${num}颗`
  if (num < 0) return `${num}颗`
  return '0颗'
}

/**
 * 星星角标显示：超过99显示 '99+'，否则返回字符串数字
 * @param {number} num
 * @returns {string}
 */
export function formatStarCount(num) {
  return num > 99 ? '99+' : String(num || 0)
}

/**
 * int64 时间戳（ms）格式化为 'yyyy-MM-dd HH:mm:ss'
 * @param {number} ts - 毫秒时间戳
 * @returns {string}
 */
export function formatTimestamp(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}
