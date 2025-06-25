import App from './App'
// 全局分享

// vuex store
import store from './store/store'
// 引入自定义的具体钩子实现
import hooks from './store/hooks'
// 自定义全局钩子，需结合store使用
import CustomHook from 'spa-custom-hooks'

// Api函数polyfill（目前为实验版本，如不需要，可删除！）';
import Polyfill from './polyfill/polyfill'

// import MixinToken from './mixin/token'
// import Tabbar from './custom-tab-bar'
import Vue from 'vue'
// import uView from 'uview-ui'
// 埋点上报

Polyfill.init()

Vue.use(CustomHook, hooks, store)
// Vue.mixin(MixinToken)
Vue.config.productionTip = false
App.mpType = 'app'
App.store = store
Vue.prototype.$onLaunched = new Promise((resolve) => {
  Vue.prototype.$isResolve = resolve
})
const app = new Vue({
  ...App
})
app.$mount()
