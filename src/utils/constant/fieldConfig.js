/**
 * 全局表单字段配置
 */
import Rules from "../validator";
import Len from "./fieldLength";

export const REQUIRED_RULE = {
  required: true,
  message: "该字段为必填项",
  trigger: ["change", "blur"],
};

// 默认字段
export const BASIC = {
  LABEL: "默认字段",
  KEY: "basic",
  LEN: Len.BASIC,
  ICON: "el-icon-default",
  RULES: [REQUIRED_RULE],
};
// 手机号
export const MOBILE = {
  LABEL: "手机号码",
  KEY: "tel",
  LEN: Len.MOBILE,
  ICON: "el-icon-mobile",
  RULES: [
    {
      validator: Rules.validMobile,
      trigger: ["change", "blur"],
    },
  ],
};
export const MOBILE_R = {
  LABEL: MOBILE.LABEL,
  KEY: MOBILE.KEY,
  LEN: MOBILE.LEN,
  ICON: MOBILE.ICON,
  RULES: [REQUIRED_RULE, ...MOBILE.RULES],
};
// 登录账号
export const LOGIN_NAME = {
  LABEL: "登录账号",
  KEY: "loginName",
  LEN: Len.LOGIN_NAME,
  ICON: "el-icon-user",
  RULES: [
    {
      validator: Rules.validUserName,
      trigger: ["change", "blur"],
    },
    {
      validator: Rules.validInputLenLimit,
      min: 6,
      max: 50,
      trigger: ["change", "blur"],
    },
  ],
};
export const LOGIN_NAME_R = {
  LABEL: LOGIN_NAME.LABEL,
  KEY: LOGIN_NAME.KEY,
  LEN: LOGIN_NAME.LEN,
  ICON: LOGIN_NAME.ICON,
  RULES: [REQUIRED_RULE, ...LOGIN_NAME.RULES],
};
// 姓名
export const NAME = {
  LABEL: "姓名",
  KEY: "name",
  LEN: Len.NAME,
  ICON: "el-icon-user",
  RULES: [
    {
      validator: Rules.validPersonName,
      trigger: ["change", "blur"],
    },
  ],
};
export const NAME_R = {
  LABEL: NAME.LABEL,
  KEY: NAME.KEY,
  LEN: NAME.LEN,
  ICON: NAME.ICON,
  RULES: [REQUIRED_RULE, ...NAME.RULES],
};
// 身份证号
export const ID_CARD = {
  LABEL: "身份证号",
  KEY: "idCard",
  LEN: Len.ID_CARD,
  ICON: "el-icon-postcard",
  RULES: [
    {
      validator: Rules.validIdCard,
      trigger: ["change", "blur"],
    },
  ],
};
export const ID_CARD_R = {
  LABEL: ID_CARD.LABEL,
  KEY: ID_CARD.KEY,
  LEN: ID_CARD.LEN,
  ICON: ID_CARD.ICON,
  RULES: [REQUIRED_RULE, ...ID_CARD.RULES],
};
// 角色
export const ROLE = {
  LABEL: "角色",
  KEY: "role",
  LEN: Len.ROLE,
  ICON: "el-icon-postcard",
  RULES: [
    {
      validator: Rules.validIdCard,
      trigger: ["change", "blur"],
    },
  ],
};
export const ROLE_R = {
  LABEL: ROLE.LABEL,
  KEY: ROLE.KEY,
  LEN: ROLE.LEN,
  ICON: ROLE.ICON,
  RULES: [REQUIRED_RULE, ...ROLE.RULES],
};
// 密码
export const PASSWORD = {
  LABEL: "密码",
  KEY: "password",
  LEN: Len.PASSWORD,
  ICON: "el-icon-lock",
  RULES: [
    REQUIRED_RULE,
    {
      validator: Rules.validPassword,
      trigger: ["change", "blur"],
    },
  ],
};
