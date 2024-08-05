import Vue from "vue";
import Vuex from "vuex";
import enums from "./enum";
//应用Vuex插件
Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    modules: {
      enums,
    },
  });
}
