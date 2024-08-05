const express = require("express");
// 引入svg-captcha
const svgCaptcha = require("svg-captcha");
const router = express.Router();
const { generateRandomPublicKey } = require("../util");

// 创建一个缓存对象
const cache = {};
/**
 * [API-00001] 获取公钥
 */
router.get("/getPublicKey", (req, res) => {
  // 生成一个64进制随机数
  // res.status(500);
  res.json({
    code: 200,
    data: {
      publicKey: generateRandomPublicKey(64),
    },
  });
});

/**
 * [API-00002] 登录
 */
router.post("/login", (req, res) => {
  console.log(req.body, cache.captcha);
  const { userName, password, captchaCode } = req.body;
  //
  // 1. 登录成功
  if (
    userName === "admin" &&
    password === "123456" &&
    captchaCode.toUpperCase() === cache.captcha
  ) {
    res.json({
      code: 200,
      data: {},
      message: "登录成功",
    });
  }
  // 2. 登录失败
  // res.status(500);
  res.json({
    code: 500,
    data: {},
    message: "用户名或密码或验证码错误",
  });
  cache.captcha = "";
});

/**
 * [API-00003] 退出登陆
 */
router.post("/logout", (req, res) => {
  res.json({
    code: 200,
    data: {},
    message: "退出成功",
  });
  cache.captcha = "";
});
/**
 * [API-00004] 获取验证码
 */
router.get("/getCaptcha", (req, res) => {
  // 生成验证码
  const captcha = svgCaptcha.create({
    size: 4, // 字符数
    ignoreChars: "zxcvbnmasdfghjklqwertyuiop", // 过滤字符
    noise: 0, // 干扰线条数
    color: false,
    background: "#fff", // 背景颜色
  });
  let svgCode = captcha.data;
  // 将SVG代码转换为UTF-8编码的字节数组
  const utf8Bytes = new TextEncoder().encode(svgCode);
  // 将字节数组编码为Base64
  const base64Svg =
    "data:image/svg+xml;base64," +
    btoa(String.fromCharCode.apply(null, utf8Bytes));
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  cache.captcha = captcha.text;
  res.send({ code: 0, data: base64Svg });
});

module.exports = router;
