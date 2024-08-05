/**
 * 静态配置项
 * 说明： 按地址栏区分环境，加载不同的地址
 */

/**
 * 动态获取请求地址
 */
const dynamicCreateRequest = () => {
  // 使用更安全的方式初始化和访问配置
  const config = window.config || {};
  const hasDevServer =
    "VUE_APP_DEV_SERVER" in config && config.VUE_APP_DEV_SERVER;
  const hasProdServer =
    "VUE_APP_PROD_SERVER" in config && config.VUE_APP_PROD_SERVER;

  // 如果配置存在，则继续处理
  if (hasDevServer || hasProdServer) {
    const protocol = location.protocol; // 获取当前协议
    const hostname = location.hostname; // 获取当前主机名
    const port = location.port ? `:${location.port}` : "";
    const href = `${protocol}//${hostname}${port}`; // 安全构建当前页面的URL

    console.log("----enabledEnvConfig:", href);

    // 初始化API URL
    config.VUE_APP_BASE_APIURL = "";

    // 使用映射表来优化环境判断逻辑，提高可维护性
    const serverMap = {
      [config.VUE_APP_DEV_SERVER]: "DEV RUNNING....",
      [config.VUE_APP_PROD_SERVER]: "PROD RUNNING....",
    };

    Object.entries(serverMap).some(([server, message]) => {
      if (href === server) {
        console.log(message);
        config.VUE_APP_BASE_APIURL = server;
        return true; // 中止遍历
      }
      return false; // 继续遍历
    });
  }
};

export default dynamicCreateRequest;
