/** 基础模块 */
/** 全局公共-操作类型（前端控制） */
export const opetateTypeOptions = {
  label: "操作类型",
  value: "",
  options: [
    {
      label: "全部",
      value: "",
    },
    {
      label: "新增",
      value: "add",
    },
    {
      label: "编辑",
      value: "update",
    },
    {
      label: "删除",
      value: "delete",
    },
  ],
};
/** 全局公共-启用状态（前端控制） */
export const enableTypeOptions = {
  label: "启用状态",
  value: "",
  options: [
    {
      label: "关闭",
      value: 0,
    },
    {
      label: "开启",
      value: 1,
    },
  ],
};

/** 全局公共-审核状态（前端控制） */
export const checkStatusOptions = {
  label: "审核状态",
  value: "",
  options: [
    {
      label: "初审",
      value: 1,
    },
    {
      label: "复核",
      value: 2,
    },
  ],
};
/** 全局公共-审核结果（前端控制） */
export const checkResultOptions = {
  label: "审核结果",
  value: "",
  options: [
    {
      label: "待审核",
      value: 1,
    },
    {
      label: "审核拒绝",
      value: 2,
    },
    {
      label: "通过",
      value: 3,
    },
    {
      label: "拒绝",
      value: 4,
    },
  ],
};

/** 全局公共-文件处理状态（前端控制） */
export const fileTypeOptions = {
  label: "文件处理状态",
  value: "",
  options: [
    {
      label: "待处理",
      value: 0,
    },
    {
      label: "处理成功",
      value: 1,
    },
    {
      label: "处理失败",
      value: 2,
    },
  ],
};

/** 商户管理-是否选中枚举（前端控制） */
export const basicYONOptions = {
  label: "是否选中",
  value: "",
  options: [
    {
      label: "是",
      value: 1,
    },
    {
      label: "否",
      value: 0,
    },
  ],
};
/** 商户管理-是否生成（前端控制） */
export const basicGONOptions = {
  label: "是否选中",
  value: "",
  options: [
    {
      label: "生成",
      value: 1,
    },
    {
      label: "不生成",
      value: 2,
    },
  ],
};
/** 商户管理-是否启用（前端控制） */
export const basicEONOptions = {
  label: "是否选中",
  value: "",
  options: [
    {
      label: "启用",
      value: 1,
    },
    {
      label: "禁用",
      value: 0,
    },
  ],
};
