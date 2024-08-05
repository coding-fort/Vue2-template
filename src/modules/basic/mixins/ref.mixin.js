/**
 * 公共获取query/table ref
 */
export default {
  data() {
    return {
      // 是否已经执行查询按钮
      hadClickQuery: false,
      // 当前查询表单
      hadQueryForm: {},
      //
      hadCleaned: false,
      //
      refQuery: undefined,
      refTable: undefined,
      // refPager: undefined,
      // refForm: undefined,
      // @version V1.2.0_1.1 交易币种为日元或韩元，移除小数位
      withoutFormatCurrency: ["JPY", "KRW"],
    };
  },
  computed: {
    getRefForm: function () {
      return () => {
        if (!this.refQuery) return {};
        return this.refQuery.form;
      };
    },
    getRefPager: function () {
      return () => {
        if (!this.refTable)
          return {
            pageNum: 1,
            pageSize: 10,
            total: 0,
          };
        return this.refTable.tablePager;
      };
    },
    // 说明： 动态获取条件查询控件中的hadClickQuery 标识
    getRefFormClickQuery: function () {
      return () => {
        let refForm = this.$parent.$refs["query-form"];
        if (!refForm) return false;
        return refForm.hadClickQuery;
      };
    },
    // 说明： 动态获取
    refForm: function () {
      return this.getRefForm();
    },
    // 说明： 动态获取
    refPager: function () {
      return this.getRefPager();
    },
  },
  mounted() {
    this.initRefs();
  },

  methods: {
    /**
     * [初始化] 列表/表单
     */
    initRefs() {
      // 说明： 部分弹窗无子组件$refs
      if (!this.$parent.$refs["query-form"]) return;
      // if (!this.refQuery)
      this.refQuery = this.$parent.$refs["query-form"].$refs["query-form"];
      this.refTable = this.$parent.$refs["query-table"].$refs["es-table"];

      // this.refForm = this.refQuery.form;
      // this.refPager = this.refTable.tablePager;
    },
    /**
     * [操作] 刷新列表
     */
    handleRefreshList() {
      this.refTable.handleQueryList();
    },
    /**
     * [预处理] 列表查询前数据处理
     * @param {*} params
     * @param {*} queryForm
     * @param {*} callback
     */
    beforeQuery(params, queryForm, callback) {
      // 说明： 获取当前条件/分页
      if (this.refTable) params.pageSize = this.refPager.pageSize;
      // 说明： 判断是否点击查询以控制读取新的查询条件还是旧的查询条件
      let _hadQuery = this.getRefFormClickQuery();
      let _refForm = _hadQuery ? this.refForm : this.hadQueryForm;
      // 说明： 合并参数
      Object.assign(params, _refForm, queryForm);
      // 说明： 预留
      callback && callback(params);
      //
      if (!params.pageNum) params.pageNum = 1;
      // 说明： 过滤
      this.$process.params.call(params, params);
    },
    /**
     * [查询] 条件查询
     * @param {*} form
     */
    handleQuery(form) {
      if (!form) form = {};
      this.hadClickQuery = true;
      this.hadQueryForm = JSON.parse(JSON.stringify(form));
      //
      let params = form;
      params.pageNum = 1;
      this.refTable.handleQueryList(params);
    },
    /**
     * [操作] 重置已查询标识
     */
    resetHadClickQuery() {
      this.hadClickQuery = false;
    },
    /**
     * [操作] 清除字段
     */
    clearQuery() {
      this.hadQueryForm = {};
      this.refQuery.handleResetFields();
    },
    /**
     * [操作] 检查是否已经查询
     * 使用：  if (!this.checkChecked()) return;
     * 说明： 使用ref.mixin.js 时可以调用，若表单查询条件为空，或者选择条件后未点击查询时返回false
     */
    checkChecked(ignoreQuery) {
      let form = this.hadQueryForm;
      let flag = true;
      delete form.pageNum;
      delete form.pageSize;
      if (JSON.stringify(form) === "{}") flag = false;
      //
      if (flag) {
        flag = false;
        for (let key in form) {
          let isArray = Array.isArray(form[key]) && form[key].length != 0;
          if (
            !flag &&
            (form[key] || form[key] === "" || form[key] === 0 || isArray)
          )
            flag = true;
        }
      }
      if (!flag && !ignoreQuery) {
        this.$message.error("请按条件查询后再执行操作");
      }
      // 说明： 拦截无数据情况
      if (flag) {
        this.$log("------this.refPager", this.refPager);
        let { total } = this.refPager;

        if (!total) {
          this.$message.error("当前查询条件无数据，不可操作");
          flag = false;
        }
      }
      return flag;
    },
    /**
     * 交易币种为日元或韩元，移除小数位
     * @param {*} data
     * @param {*} currencyKeys
     * @param {*} amountKeys
     * @version V1.2.0_1.1
     */
    transWithoutFormatCurrency(data, currencyKeys, amountKeys) {
      // 判断
      if (!data || !currencyKeys || !amountKeys) return;
      let currencyType = typeof currencyKeys,
        amountType = typeof amountKeys,
        isSingle = false,
        isMultiple = false;
      if (currencyType == "string" && amountType == "string") isSingle = true;
      if (currencyType == "object" && amountType == "object") {
        currencyType = currencyKeys instanceof Array;
        amountType = amountKeys instanceof Array;
        if (currencyType && amountType) isMultiple = true;
      }

      // 单个字段处理
      if (isSingle) {
        if (!data[currencyKeys] || !data[amountKeys]) return;
        if (this.withoutFormatCurrency.includes(data[currencyKeys])) {
          data[amountKeys] = data[amountKeys].split(".")[0];
        }
      }
      // 多个字段处理
      if (isMultiple) {
        currencyKeys.forEach((currencyKey, index) => {
          if (!data[currencyKey] || !data[amountKeys[index]]) return;
          if (this.withoutFormatCurrency.includes(data[currencyKey])) {
            data[amountKeys[index]] = data[amountKeys[index]].split(".")[0];
          }
        });
      }
    },
  },
};
