// requestBeforePlugin.js

import tokenPlugin from "./tokenPlugin";

/**
 *
 * @param {*} error {response, request}
 * @returns
 */
export const requestBeforePlugin = (config) => {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + tokenPlugin().getToken(),
  };
  //
  return config;
};
