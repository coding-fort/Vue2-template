<template>
  <div class="system form role-create-form">
    <div class="form-wrap">
      <div class="form-main">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item
            label="角色名称"
            prop="roleName"
            :class="FIELDS.ROLENAME.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.roleName"
              :maxlength="FIELDS.ROLENAME.LEN"
              @change="(val) => handleFieldChange(val, 'roleName')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            prop="remarks"
            :class="FIELDS.REMARKS.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.remarks"
              :maxlength="FIELDS.REMARKS.LEN"
              @change="(val) => handleFieldChange(val, 'remarks')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="角色权限"
            prop="roleAuth"
            :class="FIELDS.ROLEAUTH.chgFlag ? 'had-change' : ''"
            class="role-auth"
          >
            <div class="tree-container">
              <el-tree
                v-loading="loading"
                :data="treeData"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
                @check-change="handleTreeNodeChange"
              >
              </el-tree>
            </div>
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
          <el-button class="btn-query" type="" @click="$emit('close')"
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
import { Tree } from "element-ui";
import {
  NAME_R as ROLENAME,
  REQUIRED_RULE,
} from "@/utils/constant/fieldConfig.js";
import API from "../../axios/api";
export default {
  mixins: [formElement],
  components: {
    "el-tree": Tree,
  },
  inject: {
    mode: {
      type: String,
    },
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      FIELDS: {
        ROLENAME,
        REMARKS: {},
        ROLEAUTH: {},
      },
      form: {
        roleName: "",
        remarks: "",
        roleAuth: [],
      },
      rules: {
        roleName: ROLENAME.RULES,
        roleAuth: [REQUIRED_RULE],
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
        this.form.roleName = _data.name;
        this.form.remarks = _data.remarks;
        this.form.roleAuth = _data.menuIds;
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
    this.getRoleAuth();
  },
  mounted() {
    this.echoTreeNodes();
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit("confirm");
    },
    /**
     * 获取权限树
     */
    getRoleAuth() {
      this.loading = true;
      API.getNavMenu()
        .then((res) => {
          let { trees } = res.data.data;
          this.treeData = [];
          trees.forEach((item) => {
            let level_1 = {};
            level_1.id = item.value;
            level_1.label = item.name;
            level_1.children = [];
            if (item.list && item.list.length > 0) {
              item.list.forEach((itm) => {
                let level_2 = {};
                level_2.id = itm.value;
                level_2.label = itm.name;
                level_2.children = [];
                if (itm.list && itm.list.length > 0) {
                  itm.list.forEach((im) => {
                    let level_3 = {};
                    level_3.id = im.value;
                    level_3.label = im.name;
                    level_2.children.push(level_3);
                  });
                }
                level_1.children.push(level_2);
              });
            }
            this.treeData.push(level_1);
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 操作：新增/修改
     */
    handleCreate() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        let params = {};
        params.name = this.form.roleName;
        params.remarks = this.form.remarks || '';
        this.mode == "edit" && (params.id = this.form.id);
        let ref = this.$refs["tree"];
        // 说明：将父级id 也一并传递到后端
        params.authMenuIds = [
          ...this.form.roleAuth,
          ...ref.getHalfCheckedKeys(),
        ].join(",");
        let _api = this.mode == "add" ? "saveRoleInfo" : "updateRoleInfo";
        this.submitting = true;
        API[_api](params).then((/*res*/) => {
          this.$message.success(this.mode == "edit" ? "修改成功" : "新增成功");
          this.$emit("close", false, true);
          this.$nextTick(() => {
            this.submitting = false;
          });
        });
      });
    },
    // 树形权限变动
    handleTreeNodeChange() {
      let _tree = this.$refs["tree"];
      let checkedNodes = _tree.getCheckedKeys();
      this.form.roleAuth = checkedNodes;

      // 判断是否变动
      if (this.mode == "edit") {
        let _auth = this.data["roleAuth"];
        let _nodes = checkedNodes;
        if (JSON.stringify(_auth) !== JSON.stringify(_nodes)) {
          this.$set(this.FIELDS["ROLEAUTH"], "chgFlag", true);
        } else {
          this.$set(this.FIELDS["ROLEAUTH"], "chgFlag", undefined);
        }
      }
    },
    // 树形权限节点回显
    echoTreeNodes() {
      if (this.mode != "add" && this.form.roleAuth) {
        this.$refs.tree.setCheckedKeys(this.form.roleAuth);
      }
    },
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
.system.form.role-create-form {
  .form-wrap {
    margin: 10px;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    & .form-main .el-form {
      .el-form-item {
        width: 340px;
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
        &.role-auth {
          width: 100%;
          /deep/.el-form-item__content {
            margin-top: 40px;
          }
          .tree-container {
            height: 250px;
            border: 1px solid #ddd;
            overflow: auto;
            .el-tree {
              /deep/.el-tree-node__children .el-tree-node__children {
                display: flex;
                flex-wrap: wrap;
              }
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
