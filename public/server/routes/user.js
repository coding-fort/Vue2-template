var express = require("express");
var router = express.Router();

// 引入svg-captcha

/**
 * [API-00001] 获取用户信息
 */
router.get("/getUserInfo", (req, res) => {
  res.json({
    code: 200,
    data: {
      userName: "admin",
      userId: "1",
      userRole: "admin",
    },
    message: "",
  });
});
/**
 * [API-00002] 获取用户菜单
 */
router.post("/getUserMenus", (req, res) => {
  const data = require("../data/user/menu.json");
  res.json({
    code: 200,
    data: data,
    message: "",
  });
});
/**
 * [API-00003] 获取用户列表
 */
router.get("/qryPage", (req, res) => {
  const data = require("../data/user/list.json");
  res.json({
    code: 200,
    data,
    message: "",
  });
});

module.exports = router;
