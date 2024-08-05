const path = require("path");
const resolve = (dir) => path.join(__dirname, ".", dir);

module.exports = {
  publicPath: "./",
  outputDir: "Pay2China",
  // outputDir: "PAY2CHINA",
  // outputDir: "manager-web",
  // 根据当前环境配置代码检查行为
  // 在生产环境禁用代码检查，以提高构建速度
  // 在开发环境启用代码检查，以保证代码质量
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  filenameHashing: true,
  /**
   * 根据环境配置Webpack的开发工具
   * @param {Object} config - Webpack的配置对象
   */
  configureWebpack: (config) => {
    // 根据当前环境设置不同的源映射（source map）策略
    if (process.env.NODE_ENV === "development") {
      // 开发环境中使用cheap-module-eval-source-map，平衡了开发时的性能和调试需要
      config.devtool = "cheap-module-eval-source-map"; // 开发环境
    } else {
      // 生产环境中使用source-map，以确保在生产环境中的错误能够被准确地追踪到源代码
      config.devtool = "source-map"; // 生产环境
    }
  },
  chainWebpack: (config) => {
    // 添加hash
    config.output.filename("js/[name].[hash].js").end();
    // 项目名
    config.plugin("html").tap((args) => {
      args[0].title = "后台业务系统";
      return args;
    });
    config.resolve.alias.set("@", resolve("src"));
  },
  devServer: {
    disableHostCheck: true,
    allowedHosts: ["localhost"],
    open: true,
    port: 8080,
    overlay: {
      errors: true,
    },
    // 跨域代理配置
    proxy: {
      // [调试] 开发环境
      "/dev": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/dev": "" },
      },
      // [调试] 开发环境
      "/prod": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/prod": "" },
      },
      // [仿真] 本地模拟数据
      "/mock": {
        target: process.env.VUE_APP_BASE_APIURL,
      },
    },
  },
};
