/**
 * 全局请求配置
 */

// 导入自定义请求类
import Request from "@/utils/request/http";
// 导入请求前拦截插件
import { requestBeforePlugin as requestBefore } from "./plugins/requestBeforePlugin";
// 导入响应成功拦截插件
import { responseResolvePlugin as responseResolve } from "./plugins/responseResolvePlugin";
// 导入响应失败拦截插件
import { responseRejectPlugin as responseReject } from "./plugins/responseRejectPlugin";

// 导入Element UI的Message组件，用于显示消息
import { Message } from "element-ui";

// 定义全局HTTP配置
const globalHttpConfig = {
  interceptors: {
    requestBefore,
    responseResolve,
    responseReject,
  },
};

// 创建请求实例
const http = new Request(globalHttpConfig);

// 注册Message插件到请求实例
http.use((that) => {
  that.Message = Message;
});

// 导出默认的请求实例
export default http;
