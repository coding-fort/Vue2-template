/**
 * 加载配置
 * @param {*} env
 * @returns
 */
export const loadConfig = (env) => {
  // 初始化配置变量
  const { VUE_APP_BASE_APIURL: baseUrl, VUE_APP_IMPORT_CONFIG } = env;
  let url = baseUrl;

  // 校验关键变量是否完整和有效
  if (!baseUrl) {
    throw new Error("基础URL（VUE_APP_BASE_APIURL）未设置");
  }

  // [调试模式] 是否启用写入配置
  const shouldImportConfig = VUE_APP_IMPORT_CONFIG === "true";
  const isDevelopment = window?.config?.VUE_APP_DEV_SERVER;
  const isProduction = window?.config?.VUE_APP_PROD_SERVER;

  // 安全地访问window.config，避免异常
  const safeGetConfig = (key) => {
    try {
      return window.config[key];
    } catch (error) {
      console.error(`读取配置项 ${key} 时出错:`, error);
      return undefined;
    }
  };

  if (shouldImportConfig && !isProduction && !isDevelopment) {
    const serverName = safeGetConfig("VUE_APP_SERVER_NAME");
    if (serverName) {
      url = baseUrl + serverName;
    }
  }
  if (isDevelopment) {
    const serverName = safeGetConfig("VUE_APP_SERVER_NAME");
    url = "/dev" + (serverName ? serverName : "");
  }
  if (isProduction) {
    const serverName = safeGetConfig("VUE_APP_SERVER_NAME");
    url = "/prod" + (serverName ? serverName : "");
  }

  // 请求配置
  const config = {
    form: {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  };

  // 对象转查询字符串
  const queryString = (data) => {
    try {
      return new URLSearchParams(data).toString();
    } catch (error) {
      console.error("转换查询字符串时出错:", error);
      throw error; // 或者根据实际情况处理错误
    }
  };

  return {
    url,
    config,
    queryString,
  };
};

/**
 * 安全地访问window.config，避免异常
 * @param {*} key
 * @returns
 */
const safeGetConfig = (key) => {
  try {
    return window.config[key];
  } catch (error) {
    console.error(`读取配置项 ${key} 时出错:`, error);
    return undefined;
  }
};

/**
 * 动态获取请求地址
 */
export const dynamicCreateRequest = () => {
  // 使用更安全的方式初始化和访问配置
  const config = window.config || {};
  // 初始化配置变量
  const baseUrl = process.env.VUE_APP_BASE_APIURL;
  const { VUE_APP_IMPORT_CONFIG } = process.env;
  const serverName = safeGetConfig("VUE_APP_SERVER_NAME") || ""; // 提供默认值以避免空字符串问题
  let url = baseUrl + serverName;
  // 校验关键变量是否完整和有效
  if (!baseUrl) {
    throw new Error("基础URL（VUE_APP_BASE_APIURL）未设置");
  }
  // [调试模式] 是否启用写入配置
  const shouldImportConfig = VUE_APP_IMPORT_CONFIG === "true";
  // 如果配置存在，则继续处理
  if (shouldImportConfig) {
    const protocol = location.protocol; // 获取当前协议
    const hostname = location.hostname; // 获取当前主机名
    const port = location.port ? `:${location.port}` : "";
    const href = `${protocol}//${hostname}${port}`; // 安全构建当前页面的URL
    // 使用严格比较
    const isDevelopment = config.VUE_APP_DEV_SERVER === href;
    const isProduction = config.VUE_APP_PROD_SERVER === href;

    // 根据环境设置URL
    if (isDevelopment) {
      url = "/dev" + (serverName ? serverName : "");
      console.log('"DEV RUNNING...."');
    }
    if (isProduction) {
      url = "/prod" + (serverName ? serverName : "");
      console.log('"PROD RUNNING...."');
    }
    return url;
  }
};

/**
 * 动态获取请求头
 */
export const dynamicCreateContentType = () => {
  // 请求配置
  const config = {
    form: {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  };

  return config;
};
