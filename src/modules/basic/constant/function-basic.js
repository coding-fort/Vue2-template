/**
 * 基础（公共）模块-组件函数拆分
 */

import api from "_basic/axios/api";

/**
 * 审核
 * @param {Object} param0 - 审核组件返回参数
 * @param {Function} callback - 动态调整请求参数回调函数
 * @param {boolean} isBatchCheck - 是否批量审核
 * @version V1.1.0_0915
 */
function audit({ operate, advice, busiName }, callback, isBatchCheck) {
  return new Promise((resolve) => {
    let params = {
      // 审核意见
      auditOpinion: advice,
      // 审核结果 3-通过 4-拒绝
      auditResult: operate == "pass" ? 3 : 4,
      // 审核状态 2-初审 3-复审
      auditStatus: 3,
      // 审核类型 1-渠道 2-商户 3-用户 4-角色
      auditType: 1,
      // 业务id
      bizIds: [this.data.id],
      // 业务名称 @version V1.2.0_1.1
      busiName,
      // 操作类型 add-新增 update-更新 delete-删除
      operateType: this.data.operateType,
      // 查询条件json 字符串
      queryParams: "",
    };
    // 说明: 动态变动审核参数
    callback && callback(params);

    // 说明: 动态变动审核接口, 兼容批量审核
    let type = isBatchCheck ? "batchAudit" : "audit";

    this.$log("---handleAuditCheck:", params);
    executeReq(type, params).then(() => {
      resolve();
      this.$message.success("审核成功");
      // 说明： formDailog.handleClose - ignoreConfirm, forceRefresh
      this.$emit("close", false, true);
    });
  });
}
/**
 * 批量审核
 * @param {Object} args - 审核组件返回参数
 * @param {Function} callback - 动态调整请求参数回调函数
 */
function batchAudit(args, callback) {
  this.audit(args, callback, true);
}

/**
 * 执行请求
 * @param {*} type
 */
function executeReq(type, params) {
  if (!params) params = {};
  let _api = {
    audit: api.audit,
    batchAudit: api.batchAudit,
  };
  return new Promise((resolve) => {
    _api[type](params).then(() => {
      resolve();
    });
  });
}



export default {
  audit,
  batchAudit,
};
