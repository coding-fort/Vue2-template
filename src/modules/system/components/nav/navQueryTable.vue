<template>
  <div class="system table nav-query-table">
    <div class="table-wrap">
      <!-- tableData - {{ tableData }} -->
      <div class="table-main">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          v-if="1"
          row-key="value"
          :tree-props="{ children: 'list' }"
        >
          <el-table-column
            v-for="(itm, idx) in tableColumns"
            :key="idx"
            :prop="itm.key"
            :label="itm.label"
            :width="itm.width"
          >
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row['type'] == '0'
                    ? 'primary'
                    : scope.row['type'] == '999'
                    ? 'warning'
                    : 'success'
                "
                v-if="itm.key == 'navType'"
              >
                {{
                  scope.row["type"] == "0"
                    ? "一级菜单"
                    : scope.row["type"] == "999"
                    ? "按钮"
                    : "二级菜单"
                }}
              </el-tag>
              <span v-else>
                {{
                  scope.row[itm.key] == "undefined" ? "" : scope.row[itm.key]
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <nav-operate-btns
                :row="scope.row"
                @add="handleCreate"
                @edit="handleEdit"
                @delete="handleDel"
              ></nav-operate-btns>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pager"></div>
      <div class="table-operate"></div>
    </div>
  </div>
</template>

<script>
import API from "../../axios/api.js";
import navOperateBtns from "./navOperateBtns.vue";
import { Tag, Table, TableColumn } from "element-ui";
import navCreateForm from "./navCreateForm.vue";
export default {
  components: {
    "el-tag": Tag,
    "el-table": Table,
    "el-table-column": TableColumn,
    navOperateBtns,
  },
  data() {
    return {
      tableColumns: [
        {
          key: "value",
          label: "菜单ID",
        },
        {
          key: "name",
          label: "菜单名",
        },
        {
          key: "href",
          label: "前端路由",
          width: 200,
        },
        {
          key: "permission",
          label: "权限标识",
        },
        {
          key: "navType",
          label: "菜单类型",
        },
      ],
      tableData: [],
      treeData: [],
      tablePager: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      activeNames: [],
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
     * 请求：菜单
     */
    handleQueryList() {
      this.tableData = [];
      API.getNavMenu().then((res) => {
        let { trees } = res.data.data;
        this.treeData = trees;
        this.tableData = trees;
      });
    },
    /**
     * 操作：新增
     */
    handleCreate(row) {
      row.navId = row.value;
      // 弹出
      this.$dialog({
        title: `新增${row.type == "0" ? "子菜单" : "按钮"}`,
        form: navCreateForm,
        options: {
          width: "500px",
          mode: row.type == "0" ? "add-sub" : "add-btn",
          data: row,
          confirm: true,
          callback: this.handleQueryList,
        },
      });
    },
    /**
     * 操作：编辑
     */
    handleEdit(row) {
      row.navId = row.value;
      // 弹出
      this.$dialog({
        title: "编辑菜单",
        form: navCreateForm,
        options: {
          width: "500px",
          mode: "edit",
          data: row,
          confirm: true,
          callback: this.handleQueryList,
        },
      });
    },
    // 删除
    handleDel(row) {
      this.$confirm("是否删除当前记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {};
        params.id = row.value;
        API.deleteNavMenu(params).then(() => {
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
    /deep/.el-table__body-wrapper {
      height: calc(100vh - 61px - 64px - 20px - 20px - 60px);
      overflow-y: auto;
    }
  }
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
<style lang="less" scoped>
.system.table {
  @collapse: el-collapse-item;
  /deep/.@{collapse}.is-disabled .@{collapse}__header{
    cursor: default;
  }
  .@{collapse}.is-disabled{
    /deep/.@{collapse}__arrow{
      display: none;
    }
  }

  .first-menu {
    /deep/ .@{collapse}__header{
      position: relative;
    }
  }
  .second-menu {
    /deep/ .@{collapse}__header{
      padding-left: 20px;
    }
  }
  .third-menu{
    /deep/ .@{collapse}__header{
      padding-left: 40px;
    }

  }
}
</style>
