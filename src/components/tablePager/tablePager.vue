<template>
  <div class="table-pager">
    <!-- pager - {{pager}} -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pager.pageNum"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="pager.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pager.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { Pagination } from "element-ui";
export default {
  components: {
    "el-pagination": Pagination,
  },
  inject: {
    // 说明：实时获取当前查询条件
    getQueryForm: {
      type: Function,
      default: () => () => {},
    },
  },
  props: {
    pager: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        };
      },
    },
  },
  computed: {
    // queryForm: function () {
    //   return this.getQueryForm();
    // },
  },
  data() {
    return {
      // pageNum: 0,
      queryCurrent: false,
      querySize: false,
    };
  },
  methods: {
    handleSizeChange(size) {
      if (!this.querySize) {
        this.querySize = true;
        // 更新pageSize
        this.$emit("query", {
          pageNum: 1,
          pageSize: size,
        });
        setTimeout(() => {
          this.querySize = false;
        }, 500);
      }
    },
    handleCurrentChange(current) {
      if (!this.querySize) {
        this.queryCurrent = true;
        this.$emit("query", {
          pageNum: current,
          pageSize: this.pager.pageSize,
        });
        setTimeout(() => {
          this.queryCurrent = false;
        }, 500);
      }
    },
  },
};
</script>

<style></style>
