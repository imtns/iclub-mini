import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import comment from "./modules/comment";
import config from "./modules/config";
import home from "./modules/home";
import auth from "./modules/auth";
import location from "./modules/location";
import curewhite from "./modules/curewhite";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    comment,
    config,
    home,
    auth,
    location,
    curewhite,
  },
});

export default store;
