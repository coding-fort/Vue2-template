/* 验证手机号 */
export function isMobile(str) {
  const reg = /^1\d{10}$/;
  return reg.test(str);
}

/* 验证固定电话 */
export function isTel(str) {
  const reg = /^(\d{3,4}-?)?\d{7,8}$/;
  return reg.test(str);
}

/* 验证手机号+固定电话 */
export function isMobileTel(str) {
  const reg = /(^(\d{3,4}-?)?\d{7,8}$)|(^1[3456789]\d{9}$)/;
  return reg.test(str);
}

// 部门名称、角色名称等
// export function isName(str) {
//   // 仅支持输入中英文、数字或常见符号，不可全部为符号
//   // const reg = /^(?![\._\-\/]+$)[a-zA-Z\d\._\-\/\u4e00-\u9fa5\u4dae]+$/
//   const reg = /^(?![\._\-()（）]+$)[a-zA-Z\d\._\-()（）\u4e00-\u9fa5\u4dae]+$/;
//   return reg.test(str);
// }

// 人物 姓名
export function isPersonName(str) {
  const reg = /^([\u4e00-\u9fa5\\·]{1,32}|[a-zA-Z\\·\s]{1,32})$/;
  return reg.test(str);
}

// 企业名称
// export function isCompanyName(str) {
//   const reg = /^[\u4e00-\u9fa5\(\)（）a-zA-Z&]{2,}$/gi;
//   return reg.test(str);
// }

// 验证密码
export function isPassword(str) {
  // 6~16位，至少由字母、数字、符号的任意2类组成
  // const reg =
  // /^(?!\d+$)(?![a-zA-Z]+$)(?![^0-9A-Za-z]+$)[^\u4e00-\u9fa5]{6,16}$/;
  // 匹配至少一个数字，字母，字符串
  /* eslint-disable */
  const reg =
    // /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[.*\S])[^\u4e00-\u9fa5]{8,20}$/;
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.*~\!\\"#\$%&'\(\)\*+,-\./:;<=>?@\[\]\^_`{\|}])[^\u4e00-\u9fa5]{8,20}$/;
  /* eslint-enable */
  return reg.test(str);
}
/**
 * 验证密码：不能出现，三位连续的字母正序或倒序
 */
export function isPasswordRuleChar(str) {
  str = str.toLowerCase();
  const reg =
    /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/;
  const reg_r =
    /zyx|yxw|xwv|wvu|vut|uts|tsr|srq|rqp|qpo|pon|onm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba/;
  const reg_e =
    /qwe|wer|ert|rty|tyu|yui|uio|iop|asd|sdf|dfg|fgh|ghj|hjk|jkl|zxc|xcv|cvb|vbn|bnm|poi|oiu|iuy|uyt|ytr|tre|rew|ewq|lkj|kjh|jhg|hgf|gfd|fds|dsa|mnb|nbv|bvc|vcx|cxz/;
  return reg.test(str) || reg_r.test(str) || reg_e.test(str);
}
/**
 * 验证密码：不能出现，三位连续的数字正序或倒序
 */
export function isPasswordRuleNumber(str) {
  const reg = /012|123|234|345|456|567|678|789/;
  const reg_r = /987|876|765|654|543|432|321|210/;
  return reg.test(str) || reg_r.test(str);
}
/**
 * 验证密码：不能出现，三位连续的键盘特殊符号
 */
export function isPasswordRuleSymbol(str) {
  /* eslint-disable */
  const reg_f =
    /\!@#|@#\$|#\$%|\$%\^|%\^&|\^&\*|&\^%|\^%\$|%\$#|\$#@|#@\!|@\!\*|&\*\(|\(\*&|\*\(\)|\)\(\*/;
  /* eslint-enable */
  return reg_f.test(str);
}

/**
 * 验证密码：不能出现，三位连续的键盘特殊组合
 */
export function isPasswordRuleSpecial(str) {
  str = str.toLowerCase();
  const reg =
    /spdb|1234|5190|51190|8888|password|passwd|admin|zaq|qaz|zaxs|q1q2|1q2w/;
  return reg.test(str);
}

// 验证统一社会信用代码
export function isUSCI(str) {
  const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
  return reg.test(str);
}

// 验证邮箱
export function isEmail(str) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str);
}
// 验证中文邮箱
export function isCnEmail(str) {
  const reg =
    /^[\w\u4e00-\u9fa5]+([-+.][\w\u4e00-\u9fa5]+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str);
}

// 验证身份证号码
export function isIDCard(str) {
  const reg =
    /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
  return reg.test(str);
}

// 验证银行卡号
export function isBankCard(str) {
  const reg = /^[1-9]\d{9,29}$/;
  return reg.test(str);
}

// -------------------------------------
// 验证汉字
export function isHanzi(str) {
  const reg = /^[\u4e00-\u9fa5]{0,}$/;
  return reg.test(str);
}

/**
 *  验证英文和数字
 */
export function isEnglishNumber(str) {
  const reg = /^[A-Za-z0-9]+$/;
  return reg.test(str);
}
// 验证英文和数字至少含一个
export function isBothLetterNumber(str) {
  // 匹配至少一个数字，字母，字符串
  const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]+$/;
  return reg.test(str);
}

// 验证英文字母
export function isEnglishLetter(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
// 验证英文字母与空格
export function isEnglishLetterAndSpace(str) {
  const reg = /^[A-Za-z\s]+$/;
  return reg.test(str);
}

// 验证数字
export function isNumber(str) {
  const reg = /^[0-9]+$/;
  return reg.test(str);
}

// 验证零和非零开头的数字
export function isNumber1(str) {
  const reg = /^(0|[1-9][0-9]*)(\.[0-9]{1,})?$/;
  return reg.test(str);
}

// 验证金额
export function isMoney(str) {
  const reg =
    /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
  return reg.test(str);
}

// 验证账号
export function isAccount(str) {
  // const reg = /^[a-zA-Z][a-zA-Z0-9_]{1,}$/;
  const reg = /^[0-9a-zA-Z]+$/;
  return reg.test(str);
}

// 保留小数
export function inputAmount(value, digital) {
  value = value.replace(/(^\s*)|(\s*$)/g, "");
  if (!value) {
    return "";
  }
  !digital && (digital = 2);
  let reg = /[^\d.]/g;
  // 只能是数字和小数点，不能是其他输入
  value = value.replace(reg, "");

  // 保证第一位只能是数字，不能是点
  value = value.replace(/^\./g, "");
  // 小数只能出现1位
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 小数点后面保留2位
  if (+digital == 2) {
    value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  }
  // 小数点后面保留1位
  if (+digital == 1) {
    value = value.replace(/^(-)*(\d+)\.(\d).*$/, "$1$2.$3");
  }
  return value;
}


