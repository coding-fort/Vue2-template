/**
 * 基础模块
 */
const moduleName = "basic";
const router = {};

import loginPage from "../views/login";
import basicIndex from "../views/index";
import loadingPage from "../views/loading";

/**
 * 路由
 */
router.routes = [
  /**登录***/
  {
    path: "/login",
    name: "login",
    component: loginPage,
    meta: { module: moduleName, title: "登录" },
  },
  {
    path: "/",
    name: "basic-index",
    component: basicIndex,
    meta: { module: moduleName, title: "首页" },
    children: [],
  },
  {
    path: "/loading",
    name: "loading",
    component: loadingPage,
    meta: { module: moduleName, title: "登录中" },
  },
];

/**
 * 路由前置钩子
 */
router.beforeEach = (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
};

/**
 * 路由异常钩子
 */
router.onError = (error) => {
  console.log(error);
};

export default router;
