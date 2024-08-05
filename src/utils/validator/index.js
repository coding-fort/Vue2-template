/**
 * 通用校验规则
 * validator/index.js
 */
import {
  isEmail,
  isEnglishLetter,
  isEnglishLetterAndSpace,
  isEnglishNumber,
  isBothLetterNumber,
  isMobile,
  isNumber,
  isNumber1,
  isPassword,
  isPasswordRuleChar,
  isPasswordRuleNumber,
  isPasswordRuleSymbol,
  isPasswordRuleSpecial,
  isTel,
  isMobileTel,
  isPersonName,
  isAccount,
  isIDCard,
} from "./rules";

// 校验邮箱
export const validEmail = (rule, value, callback) => {
  if (value && !isEmail(value)) {
    callback(new Error("请输入正确的邮箱地址"));
  } else {
    callback();
  }
};
// 校验邮箱（批量）
export const validEmailBatch = (rule, value, callback) => {
  if (value) {
    // 说明：检测中文分号
    if (value.indexOf("；") > -1) {
      callback(new Error("请输入英文分隔符"));
    } else {
      let emails = value.split(";");
      let flag = emails.every((itm) => isEmail(itm));
      if (flag) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱地址"));
      }
    }
  } else {
    callback();
  }
};
// 校验手机号
export const validMobile = (rule, value, callback) => {
  if (value && !isMobile(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
};
// 校验手机号（批量）
export const validMobileBatch = (rule, value, callback) => {
  if (value) {
    // 说明：检测中文分号
    if (value.indexOf("；") > -1) {
      callback(new Error("请输入英文分隔符"));
    } else {
      let mobiles = value.split(";");
      let flag = mobiles.every((itm) => isMobile(itm));
      if (flag) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码"));
      }
    }
  } else {
    callback();
  }
};

// 校验数字
export const validNumber = (rule, value, callback) => {
  if (value && !isNumber(value)) {
    callback(new Error("只能输入整数数字"));
  } else {
    callback();
  }
};
// 校验数字（含小数）
export const validFloat = (rule, value, callback) => {
  // console.log("---value:", value);
  if (value && !isNumber1(value)) {
    callback(new Error("只能输入整数或小数"));
  } else {
    callback();
  }
};

// 保留小数
// export const validFloatNumber = (rule, value, callback) => {
//   if (value && !isNaN(value)) {
//     setTimeout(() => {
//       let val = UTIL.inputAmount(value);
//       that.$set(that.form, item.prop, val);
//     });
//   }
//   callback();
// };

// 校验英文字母
export const validEnglishLetter = (rule, value, callback) => {
  if (value && !isEnglishLetter(value)) {
    callback(new Error("只能输入英文字母"));
  } else {
    callback();
  }
};
// 校验英文字母
export const validEnglishLetterAndSpace = (rule, value, callback) => {
  if (value && !isEnglishLetterAndSpace(value)) {
    callback(new Error("只能输入英文字母或空格"));
  } else {
    callback();
  }
};
// 校验英文+数字且至少含1个
export const validBothLetterNumber = (rule, value, callback) => {
  if (value && !isEnglishNumber(value)) {
    callback(new Error("只能输入字母或数字"));
  } else if (value && !isBothLetterNumber(value)) {
    callback(new Error("字母、数字每类至少含有一个"));
  } else {
    callback();
  }
};
export const validEnglishLetterSplit = (rule, value, callback) => {
  if (value) {
    let { limit } = rule;
    let arr = value.split(";");
    let flag = true;
    limit && (flag = arr.every((itm) => itm.length == limit));
    if (limit) {
      if (flag) {
        callback();
      } else {
        callback(new Error(`分隔符前后字母数量必须为${limit}`));
      }
    }
    flag = arr.every((itm) => isEnglishLetter(itm));
    if (flag) {
      callback();
    } else {
      callback(new Error("只能输入英文字母"));
    }
  } else {
    callback();
  }
};
/**
 * 校验英文+数字字母
 */
export const validEnglishNumber = (rule, value, callback) => {
  if (value && !isEnglishNumber(value)) {
    callback(new Error("只能输入数字和英文字母"));
  } else {
    callback();
  }
};

// 校验固话号
export const validTel = (rule, value, callback) => {
  if (value && !isTel(value)) {
    callback(new Error("请输入正确的固话号码"));
  } else {
    callback();
  }
};
// 校验电话号
export const validPhone = (rule, value, callback) => {
  if (value && !isMobileTel(value)) {
    callback(new Error("请输入正确的电话号码"));
  } else {
    callback();
  }
};

// 校验账号
export const validUserName = (rule, value, callback) => {
  if (value && !isAccount(value)) {
    callback(new Error("只支持数字和大小写字母"));
    // callback(new Error("请输入正确的账号"));
  } else {
    callback();
  }
};

// 校验姓名
export const validPersonName = (rule, value, callback) => {
  if (value && !isPersonName(value)) {
    callback(new Error("请输入正确的姓名"));
  } else {
    callback();
  }
};

// 校验身份证号
export const validIdCard = (rule, value, callback) => {
  if (value && !isIDCard(value)) {
    callback(new Error("请输入正确的身份证号"));
  } else {
    callback();
  }
};
// 校验密码
export const validPassword = (rule, value, callback) => {
  if (value && (value.length < 8 || value.length > 20)) {
    callback(new Error("密码长度必须为8~20位"));
  } else if (value && !isPassword(value)) {
    callback(new Error("小写、大写字母、数字、特殊符号4类每类至少含有一个"));
  } else if (value && isPasswordRuleChar(value)) {
    callback(new Error("不能出现三位连续的字母正序或倒序"));
  } else if (value && isPasswordRuleNumber(value)) {
    callback(new Error("不能出现三位连续的数字正序或倒序"));
  } else if (value && isPasswordRuleSymbol(value)) {
    callback(new Error("不能出现三位连续的键盘特殊符号"));
  } else if (value && isPasswordRuleSpecial(value)) {
    callback(new Error("不能出现特殊字符组合"));
  } else {
    callback();
  }
};
// 校验可输入长度限制
export const validInputLenLimit = (rule, value, callback) => {
  let { min, max } = rule;
  min = min || 2;
  max = max || 10;
  if (min === max && value && (value.length < min || value.length > max)) {
    callback(new Error(`可输入字符长度限定${min}位`));
  } else if (value && (value.length < min || value.length > max)) {
    callback(new Error(`可输入字符长度为${min}~${max}`));
  } else {
    callback();
  }
};
// 校验数值范围
export const validInputNumberLimit = (rule, value, callback) => {
  let { min, max, tip } = rule;
  min = min || min === 0 ? min : 2;
  max = max || 10;
  if ((value + "").length > 1 && (value + "").indexOf("0") == 0) {
    callback(new Error(`输入首位不能为0`));
  } else if (value && (value < min || value > max)) {
    callback(new Error(tip ? tip : `可输入数值限定为${min}~${max}`));
  } else {
    callback();
  }
};
// export const validInputNumberLimit2 = (rule, value, callback) => {
//   let { min, max } = rule;
//   // if (min === 0) min = "0";
//   min = min || 2;
//   max = max || 10;
//   if (isNaN(value) || value !== "0") {
//     callback();
//   } else if (value.length > 1 && value.indexOf("0") == 0) {
//     callback(new Error(`输入首位不能为0`));
//   } else {
//     value = +value;
//   }
//   value = +value;
//   if (value < min || value > max) {
//     console.log("----------value:", value, min, max);
//     // callback(new Error(tip ? tip : `可输入数值限定为${min}~${max}`));
//     callback(new Error(`可输入字符长度为222${min}~${max}`));
//   } else {
//     callback();
//   }
// };

export default {
  // 校验邮箱地址
  validEmail,
  validEmailBatch,
  // 校验身份证号
  validIdCard,
  // 校验可输入长度限制
  validInputLenLimit,
  // 校验数值范围
  validInputNumberLimit,
  // 校验手机号
  validMobile,
  validMobileBatch,
  // 校验数字
  validNumber,
  validFloat,
  validEnglishLetter,
  validEnglishLetterAndSpace,
  validBothLetterNumber,
  validEnglishLetterSplit,
  validEnglishNumber,
  // 校验密码
  validPassword,
  // 校验姓名
  validPersonName,
  // 校验用户名
  validUserName,
  // 校验电话号
  validPhone,
  // 校验固话号
  validTel,
};
