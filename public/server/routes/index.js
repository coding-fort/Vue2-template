/**
 * 路由管理
 */

// 引入路由目录中的文件
var commonRouter = require("./common");
var userRouter = require("./user");
var fileRouter = require("./file");

module.exports = [
  {
    path: "/",
    routes: commonRouter,
  },
  {
    path: "/user",
    routes: userRouter,
  },
  {
    path: "/file",
    routes: fileRouter,
  },
];
