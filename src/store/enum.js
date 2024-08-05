const state = {
  taskDistributeTypeOptions: [
    { label: "单应用", value: 0 },
    { label: "分布式", value: 1 },
  ],
  taskStatusOptions: [
    { label: "未启用", value: 0 },
    { label: "启用", value: 1 },
  ],
  // ... 其他枚举
};

export default {
  namespaced: true,
  state,
};
