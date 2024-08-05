/**
 * 工具类
 */

/**
 * 插入路由
 * @param {*} app
 * @param {*} routes
 */
const insertRouter = (app, routes = []) => {
  routes.forEach((route) => {
    app.use(route.path, route.routes);
  });
};

/**
 * 生成随机公钥字符串
 * @param {*} len 公钥字符串长度
 * @returns string
 */
const generateRandomPublicKey = (len = 64) => {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var maxPos = chars.length;
  var pwd = "";
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

module.exports = {
  insertRouter,
  generateRandomPublicKey,
};
