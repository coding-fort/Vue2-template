<template>
  <div class="system table user-query-table">
    <div class="table-wrap">
      <div class="table-main">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column
            v-for="(itm, idx) in tableColumns"
            :key="idx"
            :prop="itm.key"
            :label="itm.label"
            :width="itm.width"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.row)"
                text="编辑"
                type="text"
                size="small"
              />
              <el-button
                @click="handleDel(scope.row)"
                text="删除"
                type="text"
                size="small"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pager">
        <table-pager
          :pager="tablePager"
          @query="handleQueryList"
          @update="handleChangePager"
        ></table-pager>
      </div>
      <div class="table-operate"></div>
    </div>
  </div>
</template>

<script>
  import formElement from "@/mixins/formElementMixin";
  import API from "../../axios/api.js";
  import { Table, TableColumn } from "element-ui";
  import userCreateForm from "./userCreateForm.vue";
  import tablePager from "@/components/tablePager/tablePager";
  export default {
    mixins: [formElement],
    components: {
      "el-table": Table,
      "el-table-column": TableColumn,
      "table-pager": tablePager,
    },
    data() {
      return {
        tableColumns: [
          {
            key: "mobile",
            label: "手机号码",
          },
          {
            key: "loginName",
            label: "登录账号",
          },
          {
            key: "name",
            label: "姓名",
          },
          {
            key: "role",
            label: "角色",
          },
          {
            key: "createDate",
            label: "添加时间",
            width: 180,
          },
          {
            key: "updateDate",
            label: "最后修改时间",
          },
        ],
        tableData: [],
        tablePager: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
      };
    },
    watch: {},
    created() {
      this.handleQueryList();
    },
    mounted() {},
    methods: {
      // 设置当前列表展示数据条数
      handleChangePager(pager) {
        Object.assign(this.tablePager, pager);
      },
      /**
       * 查询列表
       */
      handleQueryList(queryForm) {
        let params = {};
        // console.log("-----------------queryForm:", queryForm);
        if (!queryForm) {
          params.page = 1;
          params.limit = 10;
        } else {
          params.mobile = queryForm.mobile || undefined;
          params.name = queryForm.name || undefined;
          params.page = queryForm.pageNum;
          params.limit = queryForm.pageSize || 10;
        }
        API.getUserList(params).then((res) => {
          let { data, count } = res;
          this.tableData = data.map((itm) => {
            return itm;
          });
          this.tablePager = {
            pageNum: params.page,
            pageSize: params.limit,
            total: count,
          };
        });
      },
      /**
       * 操作：编辑
       */
      handleEdit(row) {
        let params = {};
        params.id = row.id;
        API.getUserInfo(params).then((res) => {
          let { data } = res.data;
          // 弹出
          this.$dialog({
            title: "编辑用户",
            form: userCreateForm,
            options: {
              width: "430px",
              mode: "edit",
              data: data,
              confirm: true,
              callback: this.handleQueryList,
            },
          });
        });
      },
      /**
       * 操作：删除
       */
      handleDel(row) {
        this.$confirm("是否删除当前记录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let params = new FormData();
          params.append("id", row.id);
          API.deleteUserInfo(params).then(() => {
            this.$message.success("删除成功");
            this.$nextTick(() => {
              this.handleQueryList();
            });
          });
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .system.table {
    .table-wrap {
      margin: 10px;
      padding: 10px;
      border: 1px solid #d9dbdd;
      border-radius: 4px;
      background-color: #fff;
      & .table-main {
        button.el-button {
          padding-top: 5px;
          padding-bottom: 5px;
          & i {
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
