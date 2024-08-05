import axios from "axios";
import { dynamicCreateRequest } from "@/utils/constant/utils";
import { contentType } from "./constant/contentType";

export default class Http {
  constructor({ interceptors, opt }) {
    this.responseResolve = interceptors.responseResolve || null;
    this.responseReject = interceptors.responseReject || null;
    this.requestBefore = interceptors.requestBefore || null;
    this.opt = opt || {};
    this.request = null;
    // 错误提示方法，在实例化时，通过use 方法设置；默认为 console
    this.Message = console;
    this.init();
  }
  use(fn) {
    if (typeof fn === "function") fn(this);
  }
  beforeInit(cb) {
    if (typeof cb === "function") {
      return cb();
    }
    return true;
  }

  defaultConfig() {
    // 假设 VUE_APP_TIMEOUT 已经在环境或全局配置中被安全地设置
    let timeout = process.env.VUE_APP_TIMEOUT || 30000;
    return Object.assign(
      {},
      {
        timeout,
        withCredentials: true,
        ...contentType.json,
      },
      this.opt
    );
  }

  init() {
    this.request = axios.create(this.defaultConfig());
    this.request.interceptors.request.use(
      (config) => {
        config.url = `${dynamicCreateRequest()}${config.url}`;

        return this.requestBefore
          ? this.requestBefore(config, this.Message)
          : config;
      },
      (error) => {
        // 提供更细致的错误处理逻辑，例如错误日志记录
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
      }
    );

    this.request.interceptors.response.use(
      (response) =>
        this.responseResolve
          ? this.responseResolve(response, this.Message)
          : response,
      (error) => {
        // console.log("====", error.response.status);
        // 提供更细致的错误处理逻辑，例如错误日志记录
        console.error("Error in response interceptor:", error);
        return this.responseReject
          ? this.responseReject(error, this.Message)
          : Promise.reject(error);
      }
    );
  }

  requestHandler({ url, method, data, config }) {
    return this.request({
      url,
      method,
      data,
      ...config,
    });
  }

  get(url, params, config) {
    return this.requestHandler({ url, method: "GET", params, config });
  }

  post(url, data, config) {
    return this.requestHandler({ url, method: "POST", data, config });
  }

  put(url, data, config) {
    return this.requestHandler({ url, method: "PUT", data, config });
  }

  delete(url, data, config) {
    return this.requestHandler({ url, method: "DELETE", data, config });
  }

  form(data) {
    let _data = new FormData();
    if (Object.keys(data).length > 0) {
      Object.entries(data).forEach(([key, value]) => {
        _data.append(key, value);
      });
    }
    return _data;
  }
}
