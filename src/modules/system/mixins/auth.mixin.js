import API from "../axios/api";

/**
 * 获取页面权限
 */
export default {
  inject: {
    // getMenuId: {
    //   type: Function,
    //   default: () => () => {},
    // },
  },
  provide() {
    return {
      AUTH: this.AUTH,
    };
  },
  data() {
    return {
      AUTH: { BTN: () => {} },
      permission: "",
    };
  },
  created() {
    // this.queryPageButtons();
    this.AUTH.BTN = this.authBtn;
  },
  methods: {
    /**
     * 查询当前页面权限
     */
    queryPageAuth() {},
    /**
     * 查询当前页面按钮
     */
    async queryPageButtons() {
      let params = {};
      let menuId = 0;

      params.parentId = menuId;
      let res = await API.qryMenusButtons(params);
      let btnsArray = res.data.data;
      this.AUTH.BTN = this.authBtn;
      this.permission = btnsArray.reduce((pre, item) => pre + item.name, "");
      this.$log("-------当前页面按钮权限：", this.permission, menuId);
    },
    /**
     * 查询子菜单
     */
    queryPageMenu() {
      let params = {};
      API.qryMenus(params).then(() => {});
    },
    // 说明：判断权限
    authBtn(btn) {
      if (
        window.config &&
        Object.prototype.hasOwnProperty.call(
          window.config,
          "VUE_APP_IGNORE_BTN_CTRL"
        ) &&
        window.config.VUE_APP_IGNORE_BTN_CTRL
      )
        return true;
      if (!btn) return false;
      return this.permission.indexOf(btn) > -1;
    },
  },
};
