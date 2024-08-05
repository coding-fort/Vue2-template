import Vue from "vue";
import Router from "vue-router";

// 基础模块
import basic from "@/modules/basic/router";
// 系统模块
import system from "@/modules/system/router";

Vue.use(Router);

// 将模块路由整合到基础模块中
let childrenRoutes = basic.routes.find((item) => item.path == "/");
childrenRoutes.children = [...system.routes];

const router = new Router({
  routes: [...basic.routes],
});

router.beforeEach(basic.beforeEach);

router.onError(basic.onError);

export default router;
