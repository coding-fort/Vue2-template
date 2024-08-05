// responseResolvePlugin.js

import { errorCodeMap } from "../constant/code";
/**
 *
 * @param {*} error {response, request}
 * @returns
 */
export const responseResolvePlugin = (result, Message = console) => {
  const { code, data, message } = result.data;
  // 匹配到错误码
  if (errorCodeMap[code]) {
    Message.error(message || `${code}: ${errorCodeMap[code]}`);
    return Promise.reject(result);
  }
  //
  return Promise.resolve(data);
};
