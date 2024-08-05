export default {
  inject: {
    mode: {
      type: String,
      default: "add",
    },
  },
  computed: {
    /**
     * 新增模式
     */
    isAddMode: function () {
      return this.mode === "add";
    },
    /**
     * 编辑模式
     */
    isEditMode: function () {
      return this.mode === "edit";
    },
    /**
     * 详情模式
     */
    isInfoMode: function () {
      return this.mode === "info";
    },
    /**
     * 审核模式
     */
    isCheckMode: function () {
      return this.mode === "check";
    },
  },
};
