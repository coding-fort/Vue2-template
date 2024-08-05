export default {
  data() {
    return {
      // 是否为模块首页
      isModuleIndex: false,
    };
  },
  /**
   * 路由进入钩子
   */
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.judgeIsModuleIndexPage(vm, to);
    });
  },
  /**
   * 路由变动钩子
   */
  beforeRouteUpdate(to, from, next) {
    this.judgeIsModuleIndexPage(this, to);
    next();
  },
  methods: {
    /**
     * 判断当前路由是否为模块首页
     */
    judgeIsModuleIndexPage(that, to) {
      let moduleName = to.meta.module ? to.meta.module : that.$options.module;
      that.isModuleIndex = to.path == `/${moduleName}` ? true : false;
    },
  },
};
