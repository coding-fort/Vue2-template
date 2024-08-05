const express = require("express");
const bodyParser = require("body-parser");
//
const { insertRouter } = require("./util");
// 引入路由
const routes = require("./routes");
// 创建Express应用
const app = express();
app.use(bodyParser.json());
// 插入路由
insertRouter(app, routes);
// 启动服务
app.listen("3000", () => {
  console.log("Server running on port " + 3000);
});

module.exports = app;
