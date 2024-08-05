import qs from "qs";
import api from "@/utils/request";

// import { contentType } from "@/utils/request/constant/contentType";

export default {
  /** 登录 */
  /** # [查询] 获取公钥 */
  getPublicKey: (data = {}) => api.get(`/getPublicKey`, data),
  /** # [登录]  */
  userLogin: (data) => api.post(`/login`, data),
  /** # 退出登录 */
  userLogout: (data) => api.post(`/logout`, data),

  /** 修改用户密码 */
  resetPassword: (data) => api.post(`/sys/user/resetPwd`, data),
  /** 获取验证码 */
  getCaptchaCode: (data) => api.get(`/getCaptcha?${qs.stringify(data)}`),
  /** 检查是否需要验证码 */
  // username=admin
  checkCaptchaIsNeed: (data) =>
    api.get(`/user/captchaValidateFlag?${qs.stringify(data)}`),

  /** 首页 */
  /** # [查询] 获取当前登录用户信息 */
  getUserInfo: (data) => api.get(`/user/getUserInfo`, data),

  /** 文件操作 */
  /** # [变更] 文件上传 */
  uploadFile: (data) =>
    api.post(`/sys/file/upload`, data, { timeout: 1800000 }),

  downloadFile: (data) => {
    // 说明：参数传递为当前行数据
    let params = {
      fileId: data.id,
      bizType: data.bizType,
      isProcessFile: data.isProcessFile || 0,
    };
    // @version V1.2.0_1.1
    if (!params.bizType) delete params.bizType;
    // 说明： 判断是否含fileType 字段
    if (data.fileType) {
      params.fileType = data.fileType;
    }

    return api.post(`/sys/file/download`, api.form(params), {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        // "Content-Type": "application/json; application/octet-stream",
      },
      responseType: "blob",
    });
  },
  /** [查询] 上传/下载文件记录 */
  // operateType: 操作类型 1-导入 2-导出
  /* bizType: 业务类型 
      1-商户信息 2-商户影像信息 3-电子交易信息库 4-账户 5-账户流水 
      6-导入审核通过商户 7-支付-外部交易查询 8-支付-内部交易查询 9-即期结售汇月报 10-即期结售汇旬报 
      11-单位基本基本情况报表 12-RCPMIS报送 13-导出待审核商户 14-上送文件回盘信息 15-其他文件回盘信息 
      16-商户-导出 17-支付-结汇 18-支付-手续费 
    */
  getFileList: (data) => api.post(`/sys/file/list`, data),

  /** 公共接口 */
  /**
   * [查询] 审核记录
   * @param {*} data
   * @param  auditType:number 审核类型：1-渠道 2-商户 3-用户 4-角色
   * @param  bizId:number 业务id
   * @param  pageNum:number
   * @param  pageSize:number
   * @returns
   */
  getCheckResultList: (data) => api.post(`/sys/audit/list`, data),
  /**
   * [操作] 审核
   * @param {*} data
   * @param auditResult: number 审核操作 3-通过 4-拒绝
   * @param busiName: string 业务名称
   * @returns
   */
  audit: (data) => api.post(`/sys/audit/bizAudit`, data),
  /** 批量审核 */
  /**
   * [操作] 批量审核
   * @param {*} data
   * @param auditResult: number 审核操作 3-通过 4-拒绝
   * @returns
   */
  batchAudit: (data) =>
    api.post(`/sys/audit/batchBizAudit`, data, { timeout: 30000 }),

  /**
   * 获取图片路径
   * @param {*} data
   * @returns
   */
  previewImage: (data) => {
    return `/sys/file/picturePreview?${qs.stringify(data)}`;
  },
};
