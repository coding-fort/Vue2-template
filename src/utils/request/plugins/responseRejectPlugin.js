// responseRejectPlugin.js

import { errorStatusMap } from "../constant/status";
/**
 *
 * @param {*} error {response, request}
 * @returns
 */
export const responseRejectPlugin = (error, Message = console) => {
  let errorMessage = "连接出错!"; // 默认错误信息
  if (error && error.response) {
    // 使用映射表获取错误信息
    errorMessage = errorStatusMap[error.response.status] || errorMessage;
  } else {
    // 更细致的错误处理
    switch (error.message) {
      case "timeout of 60000ms exceeded":
        errorMessage = "访问超时，请稍后重试";
        break;
      case "Network Error":
        errorMessage = "网络连接失败，请检查您的网络后重试";
        break;
    }
  }
  Message.error(errorMessage + " - " + error.message);
  // 构造新的Error对象以保留更多上下文
  return Promise.reject(new Error(errorMessage + " - " + error.message));
};
