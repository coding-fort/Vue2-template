/**
 * 工具类控件-transform111
 * @namespace TRANSFORM
 * @author ES
 * @version 0.1.1
 * @see Transform
 */

/**
 * @file 工具类控件-process
 * @author ES
 * @version 0.1.1
 * @namespace PROCESS
 * @see Process
 */

/**
 * @file 工具类控件-calc
 * @author ES
 * @version 0.1.1
 * @namespace CALC
 * @see Calc
 */

/**
 * @file 工具类控件-func
 * @author ES
 * @version 0.1.1
 * @namespace FUNC
 * @see Func
 */

import Moment from "moment";
import qs from "qs";

/**
 * 加载配置对象 - LoadEnv
 * @typedef {Object} LoadEnv
 * @property {string} url - 后端请求地址
 * @property {string} rdp - 后端请求地址前置服务，部分接口需要
 * @property {string} config - 请求头配置
 * @property {Function} queryString - 对象转查询字符串
 * @property {Function} checkSupportCurrentModuleUseMock - 使用模拟数据模块
 * @property {string} templateUrl - 模板所在地址
 */

/**
 * 加载配置
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof FUNC
 * @param {Object} env - 系统配置对象
 * @return {LoadEnv}
 */
const loadConfig = (env) => {
  // 说明： 读取配置
  let { VUE_APP_BASE_APIURL, VUE_APP_RDP } = env;

  let url = VUE_APP_BASE_APIURL,
    templateUrl = VUE_APP_BASE_APIURL,
    rdp = VUE_APP_RDP;

  // [调试模式] 是否启用写入配置
  let isImportConfig = env.VUE_APP_IMPORT_CONFIG === "true";
  if (isImportConfig) {
    let { VUE_APP_BASE_APIURL, VUE_APP_SERVER_NAME, VUE_APP_TEMPLATE_DIR } =
      window.config;
    url = VUE_APP_BASE_APIURL + VUE_APP_SERVER_NAME;
    templateUrl = VUE_APP_BASE_APIURL + VUE_APP_TEMPLATE_DIR;
  }

  // [请求配置] 请求头配置
  let config = {
    // formData 表单模式
    form: {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  };

  // [请求参数处理] 对象转查询字符串
  let queryString = (data) => qs.stringify(data);

  // [本地调试用] 使用模拟数据模块，/public/constant/server.js 配置
  let checkSupportCurrentModuleUseMock = (moduleName) => {
    // 说明： 判断当前模块是否启用模拟数据
    if (
      window.config &&
      Object.prototype.hasOwnProperty.call(
        window.config,
        "VUE_APP_USE_MOCK_MODULES"
      ) &&
      Array.isArray(window.config.VUE_APP_USE_MOCK_MODULES)
    )
      return (
        window.config.VUE_APP_USE_MOCK_MODULES.includes(moduleName) ||
        window.config.VUE_APP_USE_MOCK_MODULES.includes("all")
      );
  };

  return {
    url,
    rdp,
    config,
    queryString,
    checkSupportCurrentModuleUseMock,
    templateUrl,
  };
};

/**
 * 节流，n秒内只执行一次事件
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
const throttle = (fn, delay = 200) => {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

/**
 * 防抖，在事件被触发n秒后再执行回调
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
const debounce = (fn, delay = 200) => {
  let time = null; //time用来控制事件的触发
  return function () {
    if (time !== null) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.call(this);
      //利用call(),让this的指针从指向window 转成指向input
    }, delay);
  };
};

/**
 * 多表单校验
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof FUNC
 * @param {Array} formArray - 需要校验$refs.form
 * @returns {Promise}
 */
const multiFormChecksum = (formArray) => {
  function getFormPromise(form) {
    if (form === false) return false;
    if (!form) return Promise.reject();
    return new Promise((resolve) => {
      form.validate((res) => {
        resolve(res);
      });
    });
  }
  // console.log("-----multiFormChecksum invoked");
  // 使用Promise.all去校验结果
  return new Promise((resolve, reject) => {
    Promise.all(formArray.filter(Boolean).map(getFormPromise)).then((res) => {
      const validateResult = res.every((item) => !!item);

      if (validateResult) {
        resolve("表单都校验通过");
      } else {
        reject("表单未校验通过");
      }
    });
  });
};

/**
 * 用于处理条件查询条件赋值情况（含分页）
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof PROCESS
 * @param {Object} form - 表单对象
 * @param {boolean} ignorePager - 是否不返回分页参数
 * @param {boolean} filterCurrentPage - 是否过滤currentPage
 */
const filterParam = function (form, ignorePager, filterCurrentPage) {
  let page = 1,
    limit = 10;
  if (form) {
    for (let key in form) {
      if (!["pageNum", "pageSize", "total"].includes(key)) {
        if (form[key] || form[key] === 0) {
          this[key] = form[key];
        } else {
          this[key] = undefined;
        }
      }
    }
    page = form.pageNum || 1;
    limit = form.pageSize || 10;
    limit = form.pageSize || 10;
  }
  if (!ignorePager) {
    this.page = page;
    this.pageNum = page;
    this.limit = limit;
    this.pageSize = limit;
  }
  if (filterCurrentPage) {
    delete this.page;
    delete this.limit;
    delete this.total;
  }
};

/**
 * 用于处理条件查询条件赋值情况，只处理日期，和空值问题，不处理分页参数
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof PROCESS
 * @param {Object} form
 */
const filterParams = function (form) {
  if (form) {
    // let reg = new RegExp(
    //   /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z$/
    // );

    for (let key in form) {
      if (form[key] || form[key] === 0) {
        this[key] = form[key];
      } else {
        // delete this[key];
        this[key] = undefined;
      }
    }
  }
};

/**
 * 下载文件
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof FUNC
 * @param {string}} url - 文件下载路径
 */
// const fileDownload = function (url) {
//   const iframe = document.createElement("iframe");
//   iframe.name = "exportData";
//   iframe.style.display = "none";
//   iframe.src = url;
//   document.body.appendChild(iframe);
//   setTimeout(() => {
//     document.body.removeChild(iframe);
//   }, 3000);
// };

/**
 * 以文件流的形式下载文件
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof FUNC
 * @param {string} fileBlob - 文件流
 * @param {string} fileType - 文件类型
 * @param {string} fileName - 文件名称
 */
const downloadFileByBlob = function (fileBlob, fileType, fileName = "") {
  let blob = new Blob([fileBlob], {
    type: fileType,
  });
  if (window.navigator.msSaveOrOpenBlob) {
    // navigator.msSaveBlob(blob);
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    let elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
  }
};

/**
 * 通过路径下载文件
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof FUNC
 * @param {string} filepath - 文件下载路径
 * @param {string} fileName - 文件名称
 */
const downloadFileByPath = function (filepath, fileName) {
  let elink = document.createElement("a");
  elink.download = fileName;
  elink.style.display = "none";
  elink.href = filepath;
  document.body.appendChild(elink);
  elink.click();
  document.body.removeChild(elink);
};

/**
 * 查询条件日历字段转换
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof TRANSFORM
 * @param {Array} date - 日期数组
 * @param {Array} dateField - 日期字段，若设置，则会自动赋值到rangeFields 的两个字段上
 * @param {Array} rangeFields - 开始-结束字段
 * @param {string} format - 日期格式，默认：YYYY-MM-DD HH:mm:ss
 * @param {boolean} isYMD - 日期是否为年月日
 * @returns {Array} - 返回格式化后的日期数组
 */
const transformQueryDate = function (
  date,
  dateField,
  rangeFields,
  format = "YYYY-MM-DD HH:mm:ss",
  isYMD
) {
  let transformDate = {};
  // 说明： 空值处理
  if (!date || (date && date.length < 2)) {
    // @version V1.2.0_1.1_01131456 修复执行清空后，查询条件未清空bug
    delete this[rangeFields[0]];
    delete this[rangeFields[1]];
    return {
      start: "",
      end: "",
    };
  }
  // 说明： 格式化
  if (date) {
    transformDate.start = Moment(new Date(date[0])).format(format);
    transformDate.end = Moment(new Date(date[1])).format(format);
    // 说明： 若当前操作只有年月日，则对应添加时分秒
    if (isYMD) {
      transformDate.start += " 00:00:00";
      transformDate.end += " 23:59:59";
    }
  }
  //
  // 说明： 自动处理
  if (
    dateField &&
    rangeFields &&
    rangeFields instanceof Array &&
    rangeFields.length == 2
  ) {
    this[rangeFields[0]] = transformDate.start;
    this[rangeFields[1]] = transformDate.end;
    delete this[dateField];
  }
  return transformDate;
};
/**
 * 增强
 * @param {*} dateField
 * @param {*} rangeFields
 * @param {*} format
 * @param {*} isYMD
 * @returns
 */
const transformQueryTime = function (
  dateField,
  rangeFields,
  format = "YYYY-MM-DD HH:mm:ss",
  isYMD
) {
  let transformDate = {};
  let date = this[dateField];
  // 说明： 空值处理
  if (!date || (date && date.length < 2)) {
    return {
      start: "",
      end: "",
    };
  }
  // 说明： 格式化
  if (date) {
    transformDate.start = Moment(new Date(date[0])).format(format);
    transformDate.end = Moment(new Date(date[1])).format(format);
    // 说明： 若当前操作只有年月日，则对应添加时分秒
    if (isYMD) {
      transformDate.start += " 00:00:00";
      transformDate.end += " 23:59:59";
    }
  }
  //
  // 说明： 自动处理
  if (
    dateField &&
    rangeFields &&
    rangeFields instanceof Array &&
    rangeFields.length == 2
  ) {
    this[rangeFields[0]] = transformDate.start;
    this[rangeFields[1]] = transformDate.end;
    delete this[dateField];
  }
  return transformDate;
};

/**
 * 范围区间字段处理
 * @param {*} dateField
 * @param {*} rangeFields
 * @param {*} isNumber
 * @returns
 */
const transformQueryRange = function (dateField, rangeFields, isNumber = true) {
  let date = this[dateField];
  // 说明： 空值处理
  if (!date || (date && date.length < 2) || !dateField || !rangeFields) return;
  if (!(rangeFields instanceof Array) || rangeFields.length !== 2) return;
  // 说明： 自动处理
  let [start, end] = date;
  if (isNumber) {
    start = +start;
    end = +end;
  }
  this[rangeFields[0]] = start;
  this[rangeFields[1]] = end;
  delete this[dateField];
};

/**
 * 日期字段格式化
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof TRANSFORM
 * @param {string} date - 日期
 * @param {boolean} type - true - 年月日 false - 年月日时分秒
 * @param {string} format - 日期格式化，默认：YYYY-MM-DD HH:mm:ss
 * @returns {string} - 返回格式化后的日期
 */
const formatDate = function (date, type, format) {
  let _date = new Date(date);
  let _format = format ? format : type ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";
  if (_date != "Invalid Date") {
    return Moment(_date).format(_format);
  }
};

/**
 * 数据处理：下拉选项追加option
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof PROCESS
 * @param {*} field
 * @param {*} isAppend 是否追加
 * @param {*} options
 * @param {*} matchField 匹配字段，默认 KEY
 * @param {*} matchOptions 匹配字段，默认 OPTIONS
 * @returns {string} - 返回解析后数值
 */
const unshiftOptions = function (
  field,
  options,
  isAppend,
  matchKey = "KEY",
  matchOptions = "OPTIONS"
) {
  console.log("---utilsClass.unshiftOptions invoked");
  if (!field || !options) return;
  let queryField = this.find((item) => item[matchKey] == field);
  if (!queryField) return;
  let tempOptions = [...queryField[matchOptions]];
  // 说明： 匹配移除重复添加选项
  options.forEach((item) => {
    let _ = tempOptions.find((itm) => itm.value === item.value);
    if (!_) {
      tempOptions.unshift(item);
    }
  });
  //
  let templateOptions = isAppend ? [...tempOptions] : [...options];
  // 说明：置空数据，防止数据重复
  queryField[matchOptions] = [];

  queryField[matchOptions] = templateOptions;
};

/**
 * 统计字符串字节数
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof CALC
 * @param {*} str
 * @param {*} oneChineseCharHasBytesNumber 一个中文字符所占字节数（默认2字节）
 * @returns {void}
 */
const calcByteOfString = function (str, oneChineseCharHasBytesNumber) {
  let len = 0;
  if (!oneChineseCharHasBytesNumber) oneChineseCharHasBytesNumber = 2;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += oneChineseCharHasBytesNumber;
    } else {
      len++;
    }
  }
  return len;
};

/**
 * 获取指定字节长度字符串索引
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof CALC
 * @param {*} str
 * @returns {number}
 */
const calcByteOfIndex = function (str, ellipsis) {
  !ellipsis && (ellipsis = 0);
  let len = 0;
  let index = -1;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
    if (ellipsis && len >= ellipsis && index == -1) {
      index = i;
    }
  }
  return index;
};

/**
 * 统计中文字符数
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof CALC
 * @param {*} str
 * @returns {number}
 */
const countChineseChar = function (str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      count++;
    }
  }
  return count;
};

/**
 * 控制数值小数点前后位数
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof TRANSFORM
 * @param {string|number} value - 待处理值
 * @param {number} digital - 小数点后位数
 * @param {number} decimal - 小数点前位数
 * @returns {string} - 返回解析后数值
 */
const inputDecimal = function (value, digital, decimal) {
  if (!value) {
    return "";
  }
  value = (value + "").replace(/(^\s*)|(\s*$)/g, "");

  !digital && (digital = 2);
  !decimal && (decimal = 0);

  let reg = /[^\d.]/g;
  // 只能是数字和小数点，不能是其他输入
  value = value.replace(reg, "");

  // 保证第一位只能是数字，不能是点
  value = value.replace(/^\./g, "");
  // 小数只能出现1位
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

  // 小数点后面保留2位
  let regStr = `^(-)*(\\d+)\\.(\\d\\d).*$`;
  // 小数点后面保留1位
  if (+digital == 1) regStr = `^(-)*(\\d+)\\.(\\d).*$`;

  value = value.replace(new RegExp(regStr, "g"), "$1$2.$3");
  // 小数点前位数控制
  if (decimal) {
    let valStr = value.split(".");
    let _len = valStr[0].length;
    if (_len > decimal) {
      valStr[0] = valStr[0].substring(0, decimal);
    }
    value = valStr.join(".");
  }

  return value;
};
/**
 * 判断是否含有查询条件
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof FUNC
 * @param {Object} queryForm
 * @returns {boolean}
 */
const whetherIncludesQuery = function (queryForm) {
  if (!queryForm) return false;
  let flag = false;
  let _form = { ...queryForm };
  delete _form.currentPage;
  delete _form.pageSize;
  delete _form.total;
  if (JSON.stringify(_form) !== "{}") {
    flag = true;
  }
  if (flag) {
    flag = false;
    for (let key in _form) {
      // 说明：数组
      if (_form[key] instanceof Array && _form[key].length > 0) {
        flag = true;
      }
      // 说明：非数组
      if (!(_form[key] instanceof Array) && _form[key]) {
        flag = true;
      }
    }
  }
  return flag;
};

/**
 * 追加“全部”选项
 * @function
 * @memberof FUNC
 * @param {EnumUnit} enumUnit - EnumUnit
 * @param {boolean} isAppend - 是否追加“全部选项”，默认追加
 * @returns {Array}
 * @version 0.1.1
 * @author ES
 */
const appendAllEnum = (enumUnit, isAppend = true) => {
  if (!enumUnit) return [];
  if (Object.prototype.hasOwnProperty.call(enumUnit, "options")) {
    let options = enumUnit.options;
    if (isAppend) {
      let isExists = options.find((itm) => itm.value === "");
      if (!isExists) options.unshift({ label: "全部", value: "" });
    }
    return enumUnit.options;
  } else {
    return [];
  }
};

/**
 * 对象合并（深拷贝）
 * @function
 * @memberof FUNC
 * @param {Object} source - source
 * @param {Object} target - target
 * @returns {Object}
 * @version 0.1.1
 * @author ES
 */
const assignObject = (source, target) => {
  return { ...source, ...target };
};

/**
 * 对象转数组
 * @function
 * @memberof FUNC
 * @param {Object} obj - 待转对象
 * @returns {Array}
 * @version 0.1.1
 * @author ES
 */
const objToArr = (obj) => {
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key]);
  }
  return arr;
};

/**
 * 数组转对象
 * @function
 * @memberof FUNC
 * @param {Array} arr - 待转数组
 * @returns {Object}
 * @version 0.1.1
 * @author ES
 */
const arrToObj = (arr) => {
  let obj = {};
  arr.forEach((itm) => {
    obj[itm.key] = itm;
  });
  return obj;
};

/**
 * 判断对象是否为空对象
 * @function
 * @memberof FUNC
 * @param {Object} obj
 * @param {boolean} isArray - 是否为数组
 * @returns {boolean}
 * @version 0.1.1
 * @author ES
 */
const isEmpty = (obj, isArray) => {
  if (!obj) return false;
  if (isArray) return obj.length === 0;
  return JSON.stringify(obj) === "{}";
};

/**
 * 复制内容到剪贴板
 * @function
 * @memberof FUNC
 * @param {String} waitText
 * @version 1.2.0
 * @author ES
 */
const copyToClipboard = async (waitText, callback) => {
  if (!waitText) return;
  try {
    await navigator.clipboard.writeText(waitText);
    console.log("复制成功", new Date().toLocaleTimeString());
    callback();
  } catch (err) {
    // 浏览器禁用了非安全域（安全域：如 https 协议的地址、127.0.0.1 或 localhost ）的 navigator.clipboard 对象
    console.warn(
      "复制成功，注：当前浏览器环境为非安全域",
      new Date().toLocaleTimeString()
    );
    // 创建text area
    const textArea = document.createElement("textarea");
    textArea.value = waitText;
    // 使text area不在viewport，同时设置不可见
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
      callback();
    });
  }
};

/**
 * 获取日期时间
 * @function
 * @memberof FUNC
 * @param {String} type
 * @version 1.2.0.0_0504
 * @author ES
 */
const getDatetime = (type) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  if (type == "date")
    return `${year}${month < 10 ? "0" + month : month}${
      day < 10 ? "0" + day : day
    }`;
  if (type == "date-reverse")
    return `${day < 10 ? "0" + day : day}${
      month < 10 ? "0" + month : month
    }${year}`;
  if (type == "time")
    return `${hour < 10 ? "0" + hour : hour}${min < 10 ? "0" + min : min}${
      sec < 10 ? "0" + sec : sec
    }`;
  return `${year}${month < 10 ? "0" + month : month}${
    day < 10 ? "0" + day : day
  }${hour < 10 ? "0" + hour : hour}${min < 10 ? "0" + min : min}${
    sec < 10 ? "0" + sec : sec
  }`;
};

/**
 * @summary 解析枚举值
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof TRANSFORM
 * @param {string|number|boolean} value - 待解析枚举值
 * @param {Array} options - 枚举可选值
 * @param {string} labelField - label 字段，默认label
 * @param {boolean} type - 是否逆向解析，返回value
 * @returns {string|number|boolean} - 返回解析值
 */
const transformOption = function (value, options, labelField = "label", type) {
  // 说明：使用恒等过滤0的情况
  if (!value && value !== 0) return;
  // 说明：不用恒等，匹配数字0或字符串0
  if (!type) {
    let option = options.find((item) => item.value === value);
    if (option) return option[labelField];
  }
  // 说明： 逆向解析
  if (type) {
    let option = options.find((item) => item.label === value);
    if (option) return option["value"];
  }
};

/**
 * 解析金额
 * @author ES
 * @version 0.1.1
 * @function
 * @memberof TRANSFORM
 * @param {string|number} value - 待解析金额
 * @param {number} decimal - 保留小数位
 * @param {boolean} type - 逆向解析
 * @returns {string} - 返回解析后金额
 */
const transformMoney = function (value, decimal, type) {
  // 说明：使用恒等过滤0的情况
  if (!value && value !== 0) return;
  // 说明： 逆向解析
  if (type) {
    return +value.replaceAll(",", "");
  }
  // 说明： 反复解析问题
  if (typeof value === "string") value = +value.replaceAll(",", "");
  // 说明：非数值不处理（若注释，则返回“0.00”）
  if (isNaN(value)) return;
  !decimal && decimal !== 0 && (decimal = 2);
  // 说明：不用恒等，匹配数字0或字符串0
  value = (value + "").replace(/[^0-9+-Ee.]/g, "");
  var n = !isFinite(+value) ? 0 : +value;
  var prec = !isFinite(+decimal) ? 0 : Math.abs(decimal);
  var sep = ",";
  var dec = ".";
  var s = "";
  var toFixedFix = function (n, prec) {
    var k = Math.pow(1, prec);
    return (
      "" +
      parseFloat(
        // Math.ceil(parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
        parseFloat((n * k).toFixed(prec * 2)).toFixed(prec * 2)
      )
    );
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

/**
 * @summary 汇总：数据处理
 * @author ES
 * @version 0.1.1
 * @see TRANSFORM
 */
class Transform {
  constructor() {
    /**
     * 查询条件日历字段转换， See {@link TRANSFORM.transformQueryDate}
     * @property {function} queryDate
     * @function
     * @example
     *   transform.queryDate(['2022-07-21', '2022-07-31'], 'date', ['start', 'end'])
     */
    this.queryDate = transformQueryDate;
    this.queryTime = transformQueryTime;
    /**
     * 查询区间字段转换， See {@link TRANSFORM.transformQueryRange}
     * @property {function} queryRange
     * @function
     * @example
     *   transform.queryRange('date', ['start', 'end'])
     */
    this.queryRange = transformQueryRange;
    /**
     * 日期字段格式化， See {@link TRANSFORM.formatDate}
     * @property {function} date
     * @function
     */
    this.date = formatDate;
    /**
     * 解析枚举值， See {@link TRANSFORM.transformOption}
     * @property {function} option
     * @function
     */
    this.option = transformOption;
    /**
     * 解析金额， See {@link TRANSFORM.transformMoney}
     * @property {function} money
     * @function
     */
    this.money = transformMoney;
    /**
     * 控制数值小数点前后位数，See {@link TRANSFORM.inputDecimal}
     * @property {function} decimal
     * @function
     */
    this.decimal = inputDecimal;
  }
}

/**
 * @summary 汇总：字段转换/解析
 * @author ES
 * @version 0.1.1
 * @see PROCESS
 */
class Process {
  constructor() {
    /**
     * 数据处理：下拉选项追加option， See {@link PROCESS.unshiftOptions}
     * @property {function} unshiftOptions
     * @function
     * @example
     *   process.unshiftOptions({})
     */
    this.unshiftOptions = unshiftOptions;
    /**
     * 用于处理条件查询条件赋值情况（只处理日期，和空值问题，不处理分页参数）， See {@link PROCESS.filterParams}
     * @property {function} filterParams
     * @function
     * @example
     *   process.params({})
     */
    this.params = filterParams;
    /**
     * 用于处理条件查询条件赋值情况，含分页， See {@link PROCESS.filterParam}
     * @property {function} filterParam
     * @function
     * @example
     *   process.param({})
     */
    this.param = filterParam;
  }
}

/**
 * @summary 汇总：统计
 * @author ES
 * @version 0.1.1
 * @see CALC
 */
class Calc {
  constructor() {
    /**
     * 数据处理：统计字符串字节数， See {@link CALC.calcByteOfString}
     * @property {function} byte
     * @function
     * @example
     *   calc.byte({})
     */
    this.byte = calcByteOfString;
    /**
     * 数据处理：获取指定字节长度字符串索引， See {@link CALC.calcByteOfIndex}
     * @property {function} byteIndex
     * @function
     * @example
     *   calc.byteIndex({})
     */
    this.byteIndex = calcByteOfIndex;
    /**
     * 数据处理：统计中文字符数， See {@link CALC.countChineseChar}
     * @property {function} countChinese
     * @function
     * @example
     *   calc.countChinese({})
     */
    this.countChinese = countChineseChar;
  }
}

/**
 * @summary 汇总：功能操作
 * @author ES
 * @version 0.1.1
 * @see FUNC
 */
class Func {
  constructor() {
    /**
     * 功能操作：节流，n秒内只执行一次事件， See {@link FUNC.throttle}
     * @property {function} byte
     * @function
     * @example
     *   func.throttle({})
     */
    this.throttle = throttle;
    /**
     * 功能操作：防抖，在事件被触发n秒后再执行回调， See {@link FUNC.debounce}
     * @property {function} byte
     * @function
     * @example
     *   func.debounce({})
     */
    this.debounce = debounce;
    /**
     * 功能操作：多表单校验， See {@link FUNC.multiFormChecksum}
     * @property {function} byte
     * @function
     * @example
     *   func.multiForm({})
     */
    this.multiForm = multiFormChecksum;
    /**
     * 功能操作：判断是否含有查询条件， See {@link FUNC.whetherIncludesQuery}
     * @property {function} queryIsEmpty
     * @function
     * @example
     *   func.queryIsEmpty({})
     */
    this.queryIsEmpty = whetherIncludesQuery;
    /**
     * 功能操作：加载配置， See {@link FUNC.loadConfig}
     * @property {function} loadConfig
     * @function
     * @example
     *   func.loadConfig({})
     */
    this.loadConfig = loadConfig;
    /**
     * 功能操作：下载文件， See {@link FUNC.downloadFileByPath}
     * @property {function} downloadByPath
     * @function
     * @example
     *   func.downloadByPath({})
     */
    this.downloadByPath = downloadFileByPath;
    /**
     * 功能操作：以文件流的形式下载文件， See {@link FUNC.downloadFileByBlob}
     * @property {function} downloadByBlob
     * @function
     * @example
     *   func.downloadByBlob({})
     */
    this.downloadByBlob = downloadFileByBlob;
    /**
     * 功能操作：追加“全部”选项， See {@link FUNC.appendAllEnum}
     * @property {function} appendEnum
     * @function
     */
    this.appendEnum = appendAllEnum;
    /**
     * 功能操作：合并， See {@link FUNC.assignObject}
     * @property {function} assign
     * @function
     */
    this.assign = assignObject;
    /**
     * 功能操作：对象转数组， See {@link FUNC.objToArr}
     * @property {function} toArr
     * @function
     */
    this.toArr = objToArr;
    /**
     * 功能操作：数组转对象， See {@link FUNC.arrToObj}
     * @property {function} toObj
     * @function
     */
    this.toObj = arrToObj;
    /**
     * 功能操作：判断是否为空， See {@link FUNC.isEmpty}
     * @property {function} isEmpty
     * @function
     */
    this.isEmpty = isEmpty;
    /**
     * 功能操作：复制内容到剪贴板， See {@link FUNC.copyToClipboard}
     * @property {function} copyToClipboard
     */
    this.copyToClipboard = copyToClipboard;
    /**
     * 功能操作：获取日期时间， See {@link FUNC.getDatetime}
     * @property {function} getDatetime
     */
    this.getDatetime = getDatetime;
  }
}

/**
 * @summary 缓存
 * @author ES
 * @version 0.1.1
 */
class CustomStorage {
  constructor() {
    /**
     * @property {Function} set - 缓存数据
     * @function
     * @example
     *   storage.set('name', 'zhangsan')
     */
    this.set = function (key, value) {
      if (key) {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    };
    /**
     * @property {Function} get - 取出缓存数据
     * @function
     * @example
     *   storage.get('name')
     */
    this.get = function (key) {
      let flag = Object.prototype.hasOwnProperty.call(sessionStorage, key);
      if (flag) {
        return JSON.parse(sessionStorage.getItem(key));
      }
    };
    /**
     * @property {Function} remove - 清除缓存数据
     * @function
     * @example
     *   storage.remove('name')
     */
    this.remove = function (key) {
      let flag = Object.prototype.hasOwnProperty.call(sessionStorage, key);
      if (flag) {
        sessionStorage.removeItem(key);
      }
    };
    /**
     * @property {Function} size - 当前缓存使用情况
     * @function
     * @example
     *   storage.size()
     */
    this.size = function () {
      var obj = "";
      obj = window.sessionStorage;
      if (obj !== "") {
        var size = 0;
        for (let item in obj) {
          if (Object.property.hasOwnProperty.call(obj, item)) {
            size += obj.getItem(item).length;
          }
        }
        console.log("当前已用存储：" + (size / 1024).toFixed(2) + "KB");
      }
    };
    /**
     * @property {LocalStorage} local - localStorage
     * @example storage.local.set('name', 'zhangsan')
     * @example storage.local.get('name')
     * @example storage.local.remove('name')
     */
    this.local = new LocalStorage();
  }
}

/**
 *
 *  localStorage 缓存
 * @author ES
 * @version 0.1.1
 */
class LocalStorage {
  constructor() {
    /**
     * @property {Function} set - 缓存数据
     * @function
     * @example
     *   storage.set('name', 'zhangsan')
     */
    this.set = function (key, value) {
      if (key) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    };
    /**
     * @property {Function} get - 取出缓存数据
     * @function
     * @example
     *   storage.get('name')
     */
    this.get = function (key) {
      let flag = Object.prototype.hasOwnProperty.call(localStorage, key);
      if (flag) {
        return JSON.parse(localStorage.getItem(key));
      }
    };
    /**
     * @property {Function} remove - 清除缓存数据
     * @function
     * @example
     *   storage.remove('name')
     */
    this.remove = function (key) {
      let flag = Object.prototype.hasOwnProperty.call(localStorage, key);
      if (flag) {
        localStorage.removeItem(key);
      }
    };
  }
}

export default {
  transform: new Transform(),
  process: new Process(),
  calc: new Calc(),
  func: new Func(),
  storage: new CustomStorage(),
};
