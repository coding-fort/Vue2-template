/**
 * content-type 枚举
 */
// 使用const声明内容类型枚举，确保这些常量在初始化后不会被改变
const CONTENT_TYPE = {
  APPLICATION_JSON: "application/json",
  APPLICATION_FORM_URLENCODED: "application/x-www-form-urlencoded",
  MULTIPART_FORM_DATA: "multipart/form-data",
};

// 直接导出contentType对象，避免不必要的函数调用开销，并且使用const声明以体现这些值不应该被改变
export const contentType = {
  json: { headers: { "content-type": CONTENT_TYPE.APPLICATION_JSON } },
  form: {
    headers: { "content-type": CONTENT_TYPE.APPLICATION_FORM_URLENCODED },
  },
  multi: { headers: { "content-type": CONTENT_TYPE.MULTIPART_FORM_DATA } },
};
