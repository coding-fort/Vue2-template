<template>
  <div class="es-table table-wrap">
    <div class="table-main">
      <slot name="table-head"></slot>
      <el-table
        ref="table"
        :data="list"
        :stripe="stripe"
        :border="border"
        :span-method="spanMethod"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 说明： 单行表头 -->
        <template v-if="!multipleHeader">
          <el-table-column type="selection" width="55" v-if="select">
          </el-table-column>
          <template v-for="(itm, idx) in columns">
            <!-- 默认 -->
            <el-table-column
              v-if="!$scopedSlots[itm.key]"
              :key="idx"
              :prop="itm.key"
              :label="`${itm.label}`"
              :width="itm.width"
              header-align="center"
              align="center"
              :fixed="fixedArray.includes(itm.key) ? 'right' : false"
            >
            </el-table-column>
            <!-- 插槽 -->
            <el-table-column
              :class-name="`es-table-column__${itm.key}`"
              v-if="$scopedSlots[itm.key]"
              :key="idx"
              :prop="itm.key"
              :label="itm.label"
              :width="itm.width"
              header-align="center"
              align="center"
              :fixed="fixedArray.includes(itm.key) ? 'right' : false"
            >
              <template slot-scope="scope">
                <slot
                  :name="itm.key"
                  :row="scope.row"
                  :column="scope.column"
                  :$index="scope.$index"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <el-table-column
            v-if="$scopedSlots.operate && !ignoreOperate"
            :fixed="operateFixed"
            label="操作"
            header-align="center"
            align="center"
            :width="operateWidth"
          >
            <template slot-scope="scope">
              <slot
                name="operate"
                :row="scope.row"
                :column="scope.column"
                :$index="scope.$index"
              ></slot>
            </template>
          </el-table-column>
        </template>
        <!-- 说明： 多行表头 -->
        <template v-else>
          <el-table-column label="selection" align="center" v-if="select">
            <el-table-column type="selection" width="55"> </el-table-column>
          </el-table-column>
          <template>
            <el-table-column
              v-for="(itm, idx) in columns"
              :key="idx"
              align="center"
              :label="itm.label_EN"
              :width="itm.width"
              :fixed="fixedArray.includes(itm.key) ? 'right' : false"
            >
              <!-- 默认 -->
              <el-table-column
                v-if="!$scopedSlots[itm.key]"
                :key="idx"
                :prop="itm.key"
                :label="`${itm.label}`"
                :width="itm.width"
                header-align="center"
                align="center"
                :fixed="fixedArray.includes(itm.key) ? 'right' : false"
              >
              </el-table-column>
              <!-- 插槽 -->
              <el-table-column
                :class-name="`es-table-column__${itm.key}`"
                v-if="$scopedSlots[itm.key]"
                :key="idx"
                :prop="itm.key"
                :label="itm.label"
                :width="itm.width"
                header-align="center"
                align="center"
                :fixed="fixedArray.includes(itm.key) ? 'right' : false"
              >
                <template slot-scope="scope">
                  <slot
                    :name="itm.key"
                    :row="scope.row"
                    :column="scope.column"
                    :$index="scope.$index"
                  ></slot>
                </template>
              </el-table-column>
            </el-table-column>
          </template>
          <el-table-column
            :fixed="operateFixed"
            label="OPERATION"
            align="center"
            :width="operateWidth"
            v-if="$scopedSlots.operate && !ignoreOperate"
          >
            <el-table-column
              :fixed="operateFixed"
              label="操作"
              header-align="center"
              align="center"
              :width="operateWidth"
            >
              <template slot-scope="scope">
                <slot
                  name="operate"
                  :row="scope.row"
                  :column="scope.column"
                  :$index="scope.$index"
                ></slot>
              </template>
            </el-table-column>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="table-pager" v-if="!ignorePager">
      <table-pager
        :pager="tablePager"
        @query="(form) => handleQueryList(form, true)"
      ></table-pager>
    </div>
    <div class="table-operate"></div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import tablePager from "@/components/tablePager/tablePager";
export default {
  name: "EsTable",
  components: {
    "el-table": Table,
    "el-table-column": TableColumn,
    tablePager,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    response: {
      type: Object,
      default: () => ({}),
    },
    loading: Boolean,
    stripe: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
    operateWidth: {
      type: Number,
      default: 100,
    },
    select: {
      type: Boolean,
      default: false,
    },
    // 说明： 控制右侧固定字段数组，数组中的字段，添加fixed=right
    fixedArray: {
      type: Array,
      default: () => [],
    },
    // 说明： 是否有多行表头
    multipleHeader: {
      type: Boolean,
      default: false,
    },
    ignorePager: {
      type: Boolean,
      default: false,
    },
    spanMethod: {
      type: Function,
      default: () => () => {},
    },
    operateFixed: {
      type: String,
      default: "right",
    },
    // @version V1.2.0_1.1 禁用操作列
    ignoreOperate: Boolean,
    // @version V1.2.0_1.1 禁用格式化
    ignoreFormat: Boolean,
  },
  data() {
    return {
      list: [],
      tablePager: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  watch: {
    /** 请求放回结果 */
    response: {
      handler(res) {
        if (res) {
          this.initColumns();
          // 说明： 使用深拷贝，否则会触发死循环
          let { dataList, pageNum, pageSize, total } = JSON.parse(
            JSON.stringify(this.response)
          );
          // this.$log(
          //   `---------pager - pageNum: ${pageNum}, pageSize: ${pageSize}, total: ${total}`
          // );
          // 说明： 数据处理
          this.handleProcess(dataList);
          this.$emit("process", dataList);
          this.list = dataList;

          if (!this.ignorePager)
            this.tablePager = {
              pageNum,
              pageSize,
              total,
            };
        }
      },
      // immediate: true,
      deep: true,
    },
  },
  created() {
    // this.initColumns();
  },
  methods: {
    /**
     * [初始化]
     */
    initColumns() {
      let pendingInitFields = this.columns.filter((item) =>
        ["enum"].includes(item.type)
      );
      // 说明： 为枚举值类型字段变更为解析字段（添加Name）
      pendingInitFields.forEach((item) => {
        let field = this.columns.find((itm) => itm.key === item.key);
        // 说明： 未追加
        if (field.key.indexOf("Name") < 0) {
          field.key = field.key + "Name";
        }
      });
    },
    /**
     * [分页查询]
     *
     * @modify 20230221 添加isPagerChange，用于监控是否变更分页参数引起的查询
     */
    handleQueryList(queryForm, isPagerChange) {
      this.$emit("query", queryForm, isPagerChange);
    },
    /**
     * [数据处理]
     */
    handleProcess(list) {
      // 说明： 过滤需要内部处理的数据
      let pendingFields = this.columns.filter((item) =>
        ["date", "datetime", "money", "count"].includes(item.type)
      );
      pendingFields.forEach((field) => {
        return list.map((item) => {
          // @version V1.2.0_1.1 禁用格式化
          if (this.ignoreFormat) return item;
          if (["datetime"].includes(field.type)) {
            item[field.key] = this.$transform.date(item[field.key]);
          }
          if (["date"].includes(field.type)) {
            item[field.key] = this.$transform.date(item[field.key], 1);
          }
          if (["money"].includes(field.type)) {
            item[field.key] = this.$transform.money(item[field.key]);
          }
          if (["count"].includes(field.type)) {
            item[field.key] = this.$transform.money(item[field.key], 0);
          }
          return item;
        });
      });
    },
    /**
     * 复选
     */
    handleSelectionChange(val) {
      this.$emit("select", val);
    },
    handleClearSelection() {
      this.$refs["table"].clearSelection();
    },
  },
};
</script>
<style lang="less" scoped>
.es-table.table-wrap {
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
</style>
