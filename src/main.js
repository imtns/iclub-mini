import App from "./App";
// 全局分享

// vuex store
import store from "./store/store";
// 引入自定义的具体钩子实现
import hooks from "./store/hooks";
// 自定义全局钩子，需结合store使用
import CustomHook from "spa-custom-hooks";

// Api函数polyfill（目前为实验版本，如不需要，可删除！）';
import Polyfill from "./polyfill/polyfill";

// 全局mixins，用于实现setData等功能，请勿删除！';
import Mixin from "./polyfill/mixins";
import MixinReport from "./mixin/report";
import Share from "./mixin/share.js";
// import MixinToken from './mixin/token'
// import Tabbar from './custom-tab-bar'
import Vue from "vue";
// import uView from 'uview-ui'
// 埋点上报
import Tracker from "./utils/report";
import { trackConfig } from "./mixin/config";
import { detectWebp, redirectLogin } from "./utils/tools";

import EventBus from "@/utils/eventbus";
// Vue.use(uView)
// eslint-disable-next-line no-new
const tk = new Tracker({ tracks: trackConfig });
Vue.prototype.$elementTracker = tk.extraPageMethods && tk.extraPageMethods[0]; // 挂载$elementTracker到vue
Vue.prototype.bus = EventBus;
Vue.prototype.goLogin = redirectLogin;
uni.$detectWebp = detectWebp();
Polyfill.init();

Vue.use(CustomHook, hooks, store);
Vue.filter("price", (v) => Number(v).toFixed(2));
Vue.mixin(MixinReport);
Vue.mixin(Mixin);
Vue.mixin(Share);
// Vue.mixin(MixinToken)
Vue.config.productionTip = false;
App.mpType = "app";
App.store = store;
Vue.prototype.$onLaunched = new Promise((resolve) => {
  Vue.prototype.$isResolve = resolve;
});
const app = new Vue({
  ...App,
});
app.$mount();
