/**
 * 响应状态码
 * 接口请求成功后，响应对象中code
 */

export default {
  // 200: "请求成功",
  SUCCESS: 200,
  // 400: "请求错误",
  ERROR: 400,
  // 401: "未授权，请登录",
  UNAUTHORIZED: 401,
  // 403: "拒绝访问",
  FORBIDDEN: 403,
  // 404: "请求地址出错",
  NOT_FOUND: 404,
  // 408: "请求超时",
  TIMEOUT: 408,
  // 500: "服务器内部错误",
  INTERNAL_SERVER_ERROR: 500,
  // 501: "服务未实现",
  NOT_IMPLEMENTED: 501,
  // 502: "网关错误",
  BAD_GATEWAY: 502,
  // 503: "服务不可用",
  SERVICE_UNAVAILABLE: 503,
  // 504: "网关超时",
  GATEWAY_TIMEOUT: 504,
  // 505: "HTTP版本不受支持",
};

// 状态码与错误消息映射表
export const errorCodeMap = {
  400: "请求错误",
  401: "登录状态异常",
  403: "拒绝访问",
  404: "请求资源不存在",
  408: "请求超时",
  500: "服务器错误",
  501: "服务未实现",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
  505: "HTTP版本不受支持",
};
