import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Message, MessageBox } from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

//
import store from "@/store";
// 挂载全局变量
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
