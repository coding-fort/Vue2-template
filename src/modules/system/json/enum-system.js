/** 系统模块 - 枚举管理
 * @version V1.2.0_1.1
 */
/**
 * 枚举对象
 * @typedef {Object} EnumUnit
 * @property {string} label - 枚举名称
 * @property {string} value - 枚举值
 * @property {Array} options - 可用枚举值
 * @version V1.1.0_0915
 * @author ES
 */

/**
 * 操作项
 * @constant {EnumUnit}
 * @author ES
 */
const operateItem = {
  label: "操作项",
  value: "",
  options: [
    {
      label: "登入/登出",
      value: "LOGIN_OUT",
    },
    {
      label: "渠道资料",
      value: "PLATFORM_INFO",
    },
    {
      label: "渠道资料审核",
      value: "PLATFORM_INFO_REVIEW",
    },
    {
      label: "商户资料",
      value: "MERCHANT_INFO",
    },
    {
      label: "商户资料审核",
      value: "MERCHANT_INFO_REVIEW",
    },
    {
      label: "无名录商户导入",
      value: "NON_TRADE_MERCHANT",
    },
    {
      label: "无名录商户审核",
      value: "NON_TRADE_MERCHANT_REVIEW",
    },
    {
      label: "电子交易信息库",
      value: "ORDER_INFO",
    },
    {
      label: "账户管理",
      value: "ACCOUNT_INFO",
    },
    {
      label: "账户流水查询",
      value: "ACCOUNT_ACTION_QUERY",
    },
    {
      label: "外部交易查询",
      value: "EXTERNAL_TRANSACTION_QUERY",
    },
    {
      label: "内部交易查询",
      value: "INTERNAL_TRANSACTION_QUERY",
    },
    {
      label: "结汇列表",
      value: "SETTLE_LIST",
    },
    {
      label: "Billing report",
      value: "BILLING_REPORT",
    },
    {
      label: "Billing report审核",
      value: "BILLING_REPORT_REVIEW",
    },
    {
      label: "Pending processing report",
      value: "PENDING_PROCESSING_REPORT",
    },
    {
      label: "回盘记录",
      value: "FILE_ACK_QUERY",
    },
    {
      label: "回盘重发审核",
      value: "FILE_ACK_REVIEW",
    },
    {
      label: "单位基本情况表",
      value: "COMPANY_BASIC_INFO",
    },
    {
      label: "外管局月报报送",
      value: "SAFE_MONTH_REPORT",
    },
    {
      label: "即期结售汇月报",
      value: "SETTLE_EXCHANGE_MONTH",
    },
    {
      label: "即期结售汇旬报",
      value: "SETTLE_EXCHANGE_TEN",
    },
    {
      label: "BOP报送",
      value: "BOP_REPORT",
    },
    {
      label: "RCPMIS报送",
      value: "RCPMIS_REPORT",
    },
    // {
    //   label: "RCPMIS重发审核",
    //   value: "RCPMIS_REPORT_REVIEW",
    // },
    {
      // label: "个人不占额度登记",
      label: "个人不占额度结汇",
      value: "PERSONAL_QUOTA_REPORT",
    },
    {
      label: "个人不占额度购汇",
      value: "PERSONAL_QUOTA_BUY_REPORT",
    },
    // {
    //   label: "个人不占额度登记重发审核",
    //   value: "PERSONAL_QUOTA_REPORT_REVIEW",
    // },
  ],
};
/**
 * 操作类型
 * @constant {EnumUnit}
 * @author ES
 */
const operateType = {
  label: "操作类型",
  value: "",
  options: [
    {
      label: "登入",
      value: "LOGIN",
    },
    {
      label: "登出",
      value: "LOGOUT",
    },
    {
      label: "新增渠道",
      value: "PLATFORM_ADD",
    },
    {
      label: "查看详情",
      value: "QUERY_DETAIL",
    },
    // {
    //   label: "查看列表",
    //   value: "QUERY_LIST",
    // },
    {
      label: "编辑",
      value: "EDIT",
    },
    {
      label: "禁用",
      value: "DISABLE",
    },
    {
      label: "启用",
      value: "ENABLE",
    },
    {
      label: "冻结",
      value: "FREEZE",
    },
    {
      label: "解冻",
      value: "UNFREEZE",
    },
    {
      label: "预览",
      value: "PREVIEW",
    },
    {
      label: "导出",
      value: "EXPORT",
    },
    {
      label: "导出待审核商户",
      value: "EXPORT_REVIEW_MERCHANT",
    },
    {
      label: "导出账单",
      value: "EXPORT_BILLING_REPORT",
    },
    {
      label: "导入",
      value: "IMPORT",
    },
    {
      label: "导入文件",
      value: "IMPORT",
    },
    {
      label: "导入审核通过商户",
      value: "IMPORT_REVIEWED_MERCHANT",
    },
    {
      label: "核销账单",
      value: "WRITE_OFF_BILLING",
    },
    {
      label: "申请重发",
      value: "RESEND_SUBMIT",
    },
    {
      label: "审核",
      value: "REVIEW",
    },
    {
      label: "审核通过",
      value: "REVIEW_PASS",
    },
    {
      label: "审核拒绝",
      value: "REVIEW_REJECT",
    },
    {
      label: "批量审核",
      value: "BATCH_REVIEW",
    },
    {
      label: "下载",
      value: "DOWNLOAD",
    },
    // {
    //   label: "申请重发",
    //   value: "RESEND_SUBMIT",
    // },
    {
      label: "下载回盘",
      value: "DOWNLOAD_ACK_FILE",
    },
    {
      label: "下载账单",
      value: "DOWNLOAD_BILLING_REPORT",
    },
    {
      label: "下载原文件",
      value: "DOWNLOAD_ORIG_FILE",
    },
  ],
};

import utils from "@/utils/constant/utilsClass";

/**
 * 通过对象方式管理枚举值
 * @class
 * @version V1.2.0_1.1
 * @author ES
 */
class SystemEnums {
  constructor() {
    /**
     * @property {Array} operateItem - 操作项（前端控制）
     */
    this.operateItem = utils.func.appendEnum(operateItem, true);
    /**
     * @property {Array} operateType - 操作类型（前端控制）
     */
    this.operateType = utils.func.appendEnum(operateType, true);
  }
}

/**
 * @exports
 */
export default new SystemEnums();
