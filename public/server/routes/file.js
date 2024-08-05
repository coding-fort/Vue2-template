var express = require("express");
var multiparty = require("multiparty");
var router = express.Router();

/**
 * [API-00001] 上传文件接口
 * @method  POST
 */
router.post("/upload", (req, res) => {
  // 1.创建form对象接收客户端的formdata中的数据：使用formidable模块的IncomingForm
  let form = new multiparty.Form();
  form.parse(req, (err, fields, file) => {
    console.log(file);
    console.log(file.file[0].headers);
    let fileInfo = file.file[0];
    if (fileInfo.originalFilename.indexOf(".xlsx") < 0) {
      res.statusCode = 500;
      res.send({ code: 500, data: {}, msg: "格式错误" });
    } else {
      res.send({ code: 0, data: {}, msg: "操作成功" });
    }
  });
});

module.exports = router;
