<template>
  <div class="system form user-query-form">
    <es-query-form :fields.sync="formMapping.list" @query="handleQuery">
    </es-query-form>
  </div>
</template>

<script>
  import esQueryForm from "@/components/queryForm/queryForm.vue";
  import userCreateForm from "./userCreateForm.vue";

  export default {
    components: {
      esQueryForm,
    },
    data() {
      return {
        formMapping: {
          list: [
            { key: "mobile", label: "手机号码" },
            { key: "name", label: "姓名" },
          ],
        },
      };
    },
    methods: {
      /**
       * [操作] 查询
       */
      handleQuery(form) {
        // 说明：传递查询条件到表格组件
        this.$emit("update:queryForm", form);
        let params = {};
        let _refTable = this.$parent.$refs["query-table"];
        _refTable.tablePager.currentPage = 1;
        Object.assign(params, form, _refTable.tablePager);
        _refTable.handleQueryList(params);
      },
      /**
       * [操作] 新增
       */
      handleCreate() {
        let _refTable = this.$parent.$refs["query-table"];
        // 弹出
        this.$dialog({
          title: "新增用户",
          form: userCreateForm,
          options: {
            width: "430px",
            mode: "add",
            confirm: true,
            callback: _refTable.handleQueryList,
          },
        });
      },
    },
  };
</script>
