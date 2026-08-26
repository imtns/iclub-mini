import { ls, lsGet, lsDel } from '@/utils/util'
import report from '@/utils/report/report'
import { getCurrentAppId } from '@/utils'
import { wxGetOpenId } from '@/http/wx'

export default {
  methods: {
    $hiddenPhone(phone) {
      const userInfo = lsGet('userInfo')
      const phoneNumber = phone || userInfo.phone
      return phoneNumber.substring(0, 3) + '****' + phoneNumber.substring(7)
    },

    /**
     * 转义符换成普通字符
     * @param {*} str
     * @returns
     */
    escape2Html(str) {
      if (!str) return str
      const arrEntities = {
        lt: '<',
        gt: '>',
        nbsp: ' ',
        amp: '&',
        quot: '"'
      }
      return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
        return arrEntities[t]
      })
    },
    /**
     * 普通字符转换成转义符
     * @param {*} sHtml
     * @returns
     */
    html2Escape(sHtml) {
      if (!sHtml) return sHtml
      return sHtml.replace(/[<>&"]/g, function (c) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;'
        }[c]
      })
    },
    /**
     * setData polyfill 勿删!!!
     * 用于转换后的uniapp的项目能直接使用this.setData()函数
     * @param {*} obj
     * @param {*} callback
     */
    setData(obj, callback) {
      const that = this
      const handleData = (tepData, tepKey, afterKey) => {
        let tepData2 = tepData
        tepKey = tepKey.split('.')
        tepKey.forEach((item) => {
          if (tepData[item] === null || tepData[item] === undefined) {
            const reg = /^[0-9]+$/
            tepData[item] = reg.test(afterKey) ? [] : {}
            tepData2 = tepData[item]
          } else {
            tepData2 = tepData[item]
          }
        })
        return tepData2
      }
      const isFn = function (value) {
        return typeof value == 'function' || false
      }
      Object.keys(obj).forEach(function (key) {
        const val = obj[key]
        key = key.replace(/\]/g, '').replace(/\[/g, '.')
        let front, after
        const indexAfter = key.lastIndexOf('.')
        if (indexAfter != -1) {
          after = key.slice(indexAfter + 1)
          front = handleData(that, key.slice(0, indexAfter), after)
        } else {
          after = key
          front = that
        }
        if (front.$data && front.$data[after] === undefined) {
          Object.defineProperty(front, after, {
            get() {
              return front.$data[after]
            },
            set(newValue) {
              front.$data[after] = newValue
              // eslint-disable-next-line no-prototype-builtins
              if (that.hasOwnProperty('$forceUpdate')) {
                that.$forceUpdate()
              }
            },
            enumerable: true,
            configurable: true
          })
          front[after] = val
        } else {
          that.$set(front, after, val)
        }
      })
      // this.$forceUpdate();
      isFn(callback) && this.$nextTick(callback)
    },
    /**
     * 解析事件里的动态函数名，这种没有()的函数名，在uniapp不被执行
     * 比如：<view bindtap="{{openId==undefined?'denglu':'hy_to'}}">立即</view>
     * @param {*} exp
     */
    parseEventDynamicCode(exp) {
      // eslint-disable-next-line no-eval
      if (typeof eval('this.' + exp) === 'function') {
        // eslint-disable-next-line no-eval
        eval('this.' + exp + '()')
      }
    },
    /**
     * 用于处理对props进行赋值的情况
     */
    deepClone(target) {
      return JSON.parse(JSON.stringify(target))
    },
    /**
     * storage存储 - 可以区分环境
     */
    ls,
    /**
     * storage获取 - 可以区分环境
     */
    lsGet,
    lsDel,
    getOpenId() {
      return new Promise((resolve) => {
        // 已获取过则不再获取
        if (lsGet('openId') && lsGet('unionId')) {
          this.$store.dispatch('setOpenId', { openid: lsGet('openId'), unionid: lsGet('unionId') })
          resolve()
          return
        }
        const that = this
        uni.login({
          success(data) {
            if (data.errMsg === 'login:ok') {
              console.log('wx.login了', data)
              wxGetOpenId({
                appId: getCurrentAppId(),
                code: data.code
              })
                .then((res) => {
                  that.$store.dispatch('setOpenId', { openid: res.openId, unionid: res.unionId })
                  ls('openId', res.openId || '')
                  ls('unionId', res.unionId || '')
                  resolve()
                })
                .catch(() => {
                  resolve()
                })
            }
          },
          fail(err) {
            console.log('登录获取openid失败', err)
            resolve()
          }
        })
      })
    }
  }
}
