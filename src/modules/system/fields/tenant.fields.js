/**
 * 报送模块-BOP报送
 */
import Rules from "@/utils/validator";

// 输入框默认可输入长度
const DEFAULT_LEN = 32;

// 必填校验
export const REQUIRED_RULE = {
  required: true,
  message: "该字段为必填项",
  trigger: ["change", "blur"],
};
// 整数
export const ONLY_INTEGER_NUMBER_RULE = [
  {
    validator: Rules.validNumber,
    trigger: ["change", "blur"],
  },
  {
    validator: Rules.validInputNumberLimit,
    min: 1,
    max: 9999999999999,
    tip: "不能小于0",
    trigger: ["change", "blur"],
  },
];

/**  */
/** ################################################################################ **/
/** */
// 商户编号
export const MERCHANT_NO = {
  label: "商户编号",
  key: "merchant_no",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 操作类型
export const ACTIONTYPE = {
  label: "操作类型",
  key: "operation_type",
  type: "select",
  width: 200,
  len: DEFAULT_LEN,
  options: [
    {
      label: "新增",
      value: "add",
    },
    {
      label: "修改",
      value: "update",
    },
    {
      label: "删除",
      value: "delete",
    },
  ],
  rules: [REQUIRED_RULE],
};
// 公司名称
export const COMPANY_NAME = {
  label: "公司名称",
  key: "company_name",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 公司名称（英文）
export const COMPANY_NAME_EN = {
  label: "公司名称（英文）",
  key: "company_name_en",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 商户名称
export const STORE_NAME = {
  label: "商户名称",
  key: "store_name",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// store_url
export const STORE_URL = {
  label: "store_url",
  key: "store_url",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 商户类型
export const MERCHANT_TYPE = {
  label: "商户类型",
  key: "merchant_type",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [
    {
      label: "居民个人",
      value: 1,
    },
    {
      label: "中资机构",
      value: 2,
    },
    {
      label: "外资机构",
      value: 3,
    },
    {
      label: "个体工商户",
      value: 4,
    },
  ],
  rules: [],
};
// individual_name
export const INDIVIDUAL_NAME = {
  label: "individual_name",
  key: "individual_name",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// individual_id_type
export const INDIVIDUAL_ID_TYPE = {
  label: "individual_id_type",
  key: "individual_id_type",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// individual_id_no
export const INDIVIDUAL_ID_NO = {
  label: "individual_id_no",
  key: "individual_id_no",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// individual_no_front_picid
export const INDIVIDUAL_NO_FRONT_PICID = {
  label: "individual_no_front_picid",
  key: "individual_no_front_picid",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// individual_no_back_picid
export const INDIVIDUAL_NO_BACK_PICID = {
  label: "individual_no_back_picid",
  key: "individual_no_back_picid",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// individual_no_hand_picid
export const INDIVIDUAL_NO_HAND_PICID = {
  label: "individual_no_hand_picid",
  key: "individual_no_hand_picid",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// company_unique_no
export const COMPANY_UNIQUE_NO = {
  label: "company_unique_no",
  key: "company_unique_no",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// company_qualify_pic_id
export const COMPANY_QUALIFY_PIC_ID = {
  label: "company_qualify_pic_id",
  key: "company_qualify_pic_id",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// id_name
export const ID_NAME = {
  label: "id_name",
  key: "id_name",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// id_no_type
export const ID_NO_TYPE = {
  label: "id_no_type",
  key: "id_no_type",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// id_no
export const ID_NO = {
  label: "id_no",
  key: "id_no",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// corp_id_no_front_picid
export const CORP_ID_NO_FRONT_PICID = {
  label: "corp_id_no_front_picid",
  key: "corp_id_no_front_picid",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// corp_no_back_picid
export const CORP_NO_BACK_PICID = {
  label: "corp_no_back_picid",
  key: "corp_no_back_picid",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// corp_no_hand_picid
export const CORP_NO_HAND_PICID = {
  label: "corp_no_hand_picid",
  key: "corp_no_hand_picid",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// contacts
export const CONTACTS = {
  label: "contacts",
  key: "contacts",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// phone
export const PHONE = {
  label: "phone",
  key: "phone",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// branch_code
export const BRANCH_CODE = {
  label: "branch_code",
  key: "branch_code",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// bop_flag
export const BOP_FLAG = {
  label: "bop_flag",
  key: "bop_flag",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 行业属性代码
export const INDUSTRY_ATTR_CODE = {
  label: "行业属性代码",
  key: "industry_attr_code",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 经济类型代码
export const ECONOMIC_CODE = {
  label: "经济类型代码",
  key: "economic_code",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 投资者国别
export const INVESTOR_COUNTRY = {
  label: "投资者国别",
  key: "investor_country",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 省份编号
export const CUST_ADDR_PROVINCE = {
  label: "单位省份编号",
  key: "cust_addr_province",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
// 市级编号
export const CUST_ADDR_CITY = {
  label: "单位市级编号",
  key: "cust_addr_city",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//区级编号
export const CUST_ADDR_AREA = {
  label: "单位区级编号",
  key: "cust_addr_area",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//详细地址
export const CUST_ADDR_DETAIL = {
  label: "单位详细地址",
  key: "cust_addr_detail",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//常驻国家代码
export const COUNTRY_CODE = {
  label: "常驻国家代码",
  key: "country_code",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//company_type
export const COMPANY_TYPE = {
  label: "company_type",
  key: "company_type",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//is_taxfree
export const IS_TAXFREE = {
  label: "is_taxfree",
  key: "is_taxfree",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_id1
export const BANK_ID_1 = {
  label: "bank_id1",
  key: "bank_id1",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_account_name1
export const BANK_ACCOUNT_NAME_1 = {
  label: "bank_account_name1",
  key: "bank_account_name1",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_name1
export const BANK_NAME_1 = {
  label: "bank_name1",
  key: "bank_name1",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_code1
export const BANK_CODE_1 = {
  label: "bank_code1",
  key: "bank_code1",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_number1
export const BANK_NUMBER_1 = {
  label: "bank_number1",
  key: "bank_number1",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//swift_code1
export const SWIFT_CODE_1 = {
  label: "swift_code1",
  key: "swift_code1",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//************************************** */
//bank_id2
export const BANK_ID_2 = {
  label: "bank_id2",
  key: "bank_id2",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_account_name2
export const BANK_ACCOUNT_NAME_2 = {
  label: "bank_account_name2",
  key: "bank_account_name2",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_name2
export const BANK_NAME_2 = {
  label: "bank_name2",
  key: "bank_name2",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_code2
export const BANK_CODE_2 = {
  label: "bank_code2",
  key: "bank_code2",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_number2
export const BANK_NUMBER_2 = {
  label: "bank_number2",
  key: "bank_number2",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//swift_code2
export const SWIFT_CODE_2 = {
  label: "swift_code2",
  key: "swift_code2",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//******************************* */

//bank_id3
export const BANK_ID_3 = {
  label: "bank_id3",
  key: "bank_id3",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_account_name3
export const BANK_ACCOUNT_NAME_3 = {
  label: "bank_account_name3",
  key: "bank_account_name3",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_name3
export const BANK_NAME_3 = {
  label: "bank_name3",
  key: "bank_name3",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_code3
export const BANK_CODE_3 = {
  label: "bank_code3",
  key: "bank_code3",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//bank_number3
export const BANK_NUMBER_3 = {
  label: "bank_number3",
  key: "bank_number3",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};
//swift_code3
export const SWIFT_CODE_3 = {
  label: "swift_code3",
  key: "swift_code3",
  type: "input",
  width: 200,
  len: DEFAULT_LEN,
  options: [],
  rules: [],
};

export const TENANT_COLUMNS = [
  MERCHANT_NO,
  ACTIONTYPE,
  COMPANY_NAME,
  COMPANY_NAME_EN,
  STORE_NAME,
  STORE_URL,
  MERCHANT_TYPE,
  INDIVIDUAL_NAME,
  INDIVIDUAL_ID_TYPE,
  INDIVIDUAL_ID_NO,
  INDIVIDUAL_NO_FRONT_PICID,
  INDIVIDUAL_NO_BACK_PICID,
  INDIVIDUAL_NO_HAND_PICID,
  COMPANY_UNIQUE_NO,
  COMPANY_QUALIFY_PIC_ID,
  ID_NAME,
  ID_NO_TYPE,
  ID_NO,
  CORP_ID_NO_FRONT_PICID,
  CORP_NO_BACK_PICID,
  CORP_NO_HAND_PICID,
  CONTACTS,
  BRANCH_CODE,
  BOP_FLAG,
  INDUSTRY_ATTR_CODE,
  ECONOMIC_CODE,
  INVESTOR_COUNTRY,
  CUST_ADDR_PROVINCE,
  CUST_ADDR_CITY,
  CUST_ADDR_AREA,
  CUST_ADDR_DETAIL,
  COUNTRY_CODE,
  COMPANY_TYPE,
  IS_TAXFREE,
  BANK_ID_1,
  BANK_ACCOUNT_NAME_1,
  BANK_NAME_1,
  BANK_CODE_1,
  BANK_NUMBER_1,
  SWIFT_CODE_1,
  //
  BANK_ID_2,
  BANK_ACCOUNT_NAME_2,
  BANK_NAME_2,
  BANK_CODE_2,
  BANK_NUMBER_2,
  SWIFT_CODE_2,
  //
  BANK_ID_3,
  BANK_ACCOUNT_NAME_3,
  BANK_NAME_3,
  BANK_CODE_3,
  BANK_NUMBER_3,
  SWIFT_CODE_3,
];
