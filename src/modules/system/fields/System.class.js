/** 系统管理 - 字段配置 */

import utils from "@/utils/constant/utilsClass";

import systemEnums from "@/modules/system/json/enum-system";

// 输入框默认可输入长度
const DEFAULT_LEN = 32;

/**
 * 字段对象
 * @typedef {Object} FormField
 * @property {string} label - 字段名称
 * @property {string} key - 字段
 * @property {string} type - 字段类型
 * @property {number} len - 字段最大可输入长度（表单字段使用）
 * @property {Array} options - 可用枚举值
 * @property {Array} rules - 字段校验规则
 * @property {number} width - 字段宽度（列表字段使用）
 * @version V1.1.0_0915
 * @author ES
 */

/** ################################################################################ **/
/**
 * 系统日志
 * @version V1.2.0_1.1
 */
/**
 * 操作时间
 * @constant {FormField}
 */
const operateTime = {
  label: "操作时间",
  type: "datetimerange",
  webKey: "operateTime",
  key: "requestDate",
};
/**
 * 操作员
 * @constant {FormField}
 */
const operator = {
  label: "操作员",
  webKey: "operator",
  key: "requestUserid",
  len: DEFAULT_LEN,
};
/**
 * IP 地址
 * @constant {FormField}
 */
const ipAddr = {
  label: "IP 地址",
  webKey: "ipAddr",
  key: "requestIp",
  len: DEFAULT_LEN,
};
/**
 * 操作项
 * @constant {FormField}
 */
const operateItem = {
  label: "操作项",
  webKey: "operateItem",
  key: "operateItem",
  type: "select",
  options: systemEnums.operateItem,
};
/**
 * 操作类型
 * @constant {FormField}
 */
const operateType = {
  label: "操作类型",
  webKey: "operateType",
  key: "actionType",
  type: "select",
  options: systemEnums.operateType,
};
/**
 * 操作描述
 * @constant {FormField}
 */
const operateDesc = {
  label: "操作描述",
  webKey: "operateDesc",
  key: "afterData",
};

/***********************************/
/**
 * 系统列表-条件查询
 * @constant {Array}
 * @version V1.2.0_1.1
 */
const queryInfos = [operateTime, operator, ipAddr, operateItem, operateType];

/**
 * 系统列表
 * @constant {Array}
 * @version V1.2.0_1.1
 */
const listTableColumns = [
  utils.func.assign(operateTime, { type: "datetime", width: 180 }),
  utils.func.assign(operator, { width: 150 }),
  utils.func.assign(ipAddr, { width: 150 }),
  utils.func.assign(operateItem, { type: "enum", width: 200 }),
  utils.func.assign(operateType, { type: "enum", width: 200 }),
  utils.func.assign(operateDesc, { key: "shortParam" }),
];
/**
 * 系统日志 - 详情
 * @constant {Array}
 * @version V1.2.0_1.1
 */
const logInfos = [
  operateTime,
  operator,
  ipAddr,
  utils.func.assign(operateItem, { type: "enum" }),
  utils.func.assign(operateType, { type: "enum" }),
];

/**
 * 通过对象方式管理字段
 * @class
 * @author ES
 */
class System {
  constructor() {
    /**
     * 条件查询
     * @property {Object} query
     */
    this.query = {
      log: queryInfos,
    };
    /**
     * 列表字段
     * @property {Object} table
     */
    this.table = {
      log: listTableColumns,
    };
    /**
     * 详情字段
     * @property {Object} info
     */
    this.info = {
      // 详情字段，自动给枚举值key 添加Name
      log: logInfos.map((col) => {
        if (col.type == "enum" && col.key.indexOf("Name") < 0)
          col.key = `${col.key}Name`;
        return col;
      }),
    };
    /**
     * 解析对象
     * @property {Object} transform
     */
    this.transform = utils.transform;
    /**
     * 解析枚举值
     * @param {*} table
     * @param {*} webKey
     * @param {*} row
     */
    this.transOption = (table, webKey, row) => {
      let colField = table.find((col) => col.webKey == webKey);
      if (colField && colField.type == "enum") {
        let { key, options } = colField;
        let _key = key.substring(0, key.length - 4);
        row[key] = utils.transform.option(row[_key], options);
      }
    };
    /**
     * 解析日期
     * @param {*} table
     * @param {*} webKey
     * @param {*} row
     * @param {*} isDatetime
     */
    this.transDate = (table, webKey, row, isDatetime = true) => {
      let colField = table.find((col) => col.webKey == webKey);
      if (colField && ["date", "datetime"].includes(colField.type)) {
        let { key } = colField;
        let isDate = colField.type == "date" || !isDatetime;
        row[key] = utils.transform.date(row[key], isDate);
      }
    };
    /**
     * 数组转对象
     *
     * @property {Function} toObj
     */
    this.toObj = utils.func.toObj;
    /**
     * 追加“全部”选项
     *
     * @property {Function} appendEnum
     */
    this.appendEnum = utils.func.appendEnum;
    /**
     * 判断是否为空
     *
     * @property {Function} isEmpty
     */
    this.isEmpty = utils.func.isEmpty;
  }
}

/**
 * @exports
 */
export default new System();
