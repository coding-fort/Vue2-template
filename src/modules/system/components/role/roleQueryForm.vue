<template>
  <div class="system form role-query-form">
    <es-query-form :fields.sync="formMapping.list" @query="handleQuery">
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
  import esQueryForm from "@/components/queryForm/queryForm.vue";
  import roleCreateForm from "./roleCreateForm.vue";
  export default {
    components: {
      esQueryForm,
    },
    data() {
      return {
        formMapping: {
          list: [{ key: "name", label: "角色名称" }],
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
        this.$dialog({
          title: "新增角色",
          form: roleCreateForm,
          options: {
            width: "800px",
            confirm: true,
            refresh: true,
            callback: _refTable.handleQueryList,
          },
        });
      },
    },
  };
</script>
