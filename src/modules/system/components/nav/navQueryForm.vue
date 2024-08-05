<template>
  <div class="system form nav-query-form">
    <es-query-form @query="handleQuery" :config="{ queryBtn: '刷新' }">
      <template slot="left-btns">
        <el-button
          class="btn-create"
          text="新增"
          type=""
          @click="handleCreate"
        />
      </template>
    </es-query-form>
  </div>
</template>

<script>
  import queryForm from "@/components/queryForm/queryForm.vue";
  import navCreateForm from "./navCreateForm.vue";
  export default {
    components: {
      "es-query-form": queryForm,
    },

    methods: {
      /**
       * [操作] 查询
       */
      handleQuery(form) {
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
        this.$dialog({
          title: "新增一级菜单",
          form: navCreateForm,
          options: {
            width: "500px",
            confirm: true,
            callback: _refTable.handleQueryList,
          },
        });
      },
    },
  };
</script>
