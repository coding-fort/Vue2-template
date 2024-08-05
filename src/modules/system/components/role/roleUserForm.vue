<template>
  <div class="system form role-user-form">
    <div class="form-wrap">
      <div class="form-main">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item
            label="当前角色下"
            prop="user"
            :class="FIELDS.ROLENAME.chgFlag ? 'had-change' : ''"
          >
            <el-transfer
              v-model="form.user"
              v-loading="loading"
              :data="transferData"
            >
            </el-transfer>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-btns">
        <div class="left-btns"></div>
        <div class="center-btns">
          <el-button
            class="btn-create"
            type="primary"
            @click="handleCreate"
            :loading="submitting"
            >确定</el-button
          >
          <el-button class="btn-query" type="" @click="handleClose"
            >取消</el-button
          >
        </div>
        <div class="right-btns"></div>
      </div>
    </div>
  </div>
</template>

<script>
import formElement from "@/mixins/formElementMixin";
import { Transfer } from "element-ui";
import {
  NAME_R as ROLENAME,
  REQUIRED_RULE,
} from "@/utils/constant/fieldConfig.js";
import API from "../../axios/api";
export default {
  mixins: [formElement],
  components: {
    "el-transfer": Transfer,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    mode: {
      type: String,
    },
  },
  data() {
    return {
      transferData: [],

      FIELDS: {
        ROLENAME,
        REMARKS: {},
        ROLEAUTH: {},
      },
      form: {
        user: [],
      },
      rules: {
        user: [REQUIRED_RULE],
      },
      treeData: [],
      loading: true,
      submitting: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    data: {
      handler: function (_data) {
        this.form.id = _data.id;
        // this.form.roleName = _data.name;
        // this.form.remarks = _data.remarks;
        // this.form.roleAuth = _data.menuIds;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    tempTreeNodes: () => {
      return;
    },
  },
  created() {
    this.resetFieldsConfig();
    this.getRoleUser();
  },
  mounted() {
    // this.echoTreeNodes();
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit("confirm");
    },
    /**
     * 获取角色用户列表
     */
    getRoleUser() {
      this.loading = true;
      let params = {};
      params.roleId = this.data.id;
      API.getRoleUserList(params)
        .then((res) => {
          this.loading = false;
          this.transferData = res.data.data.map((itm) => {
            return { key: itm.id, label: itm.name };
          });
        })
        .catch((err) => {
          this.$log("--------------getRoleUser:", err);
          this.loading = false;
        });
    },
    /**
     *
     */
    handleCreate() {},
    // 字段变动
    handleFieldChange(val, fieldKey) {
      if (this.mode == "add") return;
      let _key = fieldKey.toUpperCase();
      switch (fieldKey) {
        case "realName":
          _key = "NAME";
          break;
      }
      if (this.data[fieldKey] !== val) {
        this.$set(this.FIELDS[_key], "chgFlag", true);
      } else {
        this.$set(this.FIELDS[_key], "chgFlag", undefined);
      }
    },
    // 重置字段配置
    resetFieldsConfig() {
      for (let key in this.FIELDS) {
        this.$set(this.FIELDS[key], "chgFlag", undefined);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.system.form.role-user-form {
  .form-wrap {
    margin: 10px;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    & .form-main .el-form {
      .el-form-item {
        // width: 340px;
        display: flex;
        flex-direction: column;
        margin: 0;
        margin-top: 10px;
        .el-select {
          width: 100%;
        }
        /deep/label {
          color: #606266;
        }
        &.had-change {
          /deep/label {
            color: #f56c6c;
          }
        }
        .el-transfer {
          /deep/.el-transfer-panel {
            width: 300px;
          }
          /deep/.el-transfer__buttons {
            padding: 0 10px;
            button {
              padding: 10px;
            }
          }
        }
      }
    }
    // 按钮组
    & .form-btns {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      & button {
        height: 32px;
        padding: 0px 40px;
        border-radius: 16px;
      }
      .left-btns {
      }
      .right-btns {
      }
    }
  }
}
</style>
