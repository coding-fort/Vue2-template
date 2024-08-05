<template>
  <div class="system form nav-create-form">
    <!-- form - {{form}} -->
    <div class="form-wrap">
      <div class="form-main">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item
            label="父级ID"
            prop="parentId"
            :class="FIELDS.NAME.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.parentId"
              readonly
              :maxlength="FIELDS.NAME.LEN"
              @change="(val) => handleFieldChange(val, 'parentId')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="菜单/按钮ID"
            prop="navId"
            :class="FIELDS.NAME.chgFlag ? 'had-change' : ''"
            v-if="mode == 'edit'"
          >
            <el-input
              v-model="form.navId"
              readonly
              :maxlength="FIELDS.NAME.LEN"
              @change="(val) => handleFieldChange(val, 'navId')"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="菜单类型" prop="type">
            <el-tag
              :type="
                form.type == '0' ? '' : form.type == '1' ? 'success' : 'warning'
              "
              >{{
                form.type == "0"
                  ? "一级菜单"
                  : form.type == "1"
                  ? "二级菜单"
                  : "按钮"
              }}</el-tag
            >

            <el-radio-group v-model="form.type" size="small" v-if="0">
              <el-radio
                :label="itm.value"
                border
                v-for="(itm, idx) in typeOptions"
                :key="idx"
                :disabled="itm.disabled"
                >{{ itm.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="菜单/按钮名"
            prop="name"
            :class="FIELDS.IDCARD.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.name"
              placeholder=""
              :maxlength="FIELDS.IDCARD.LEN"
              @change="(val) => handleFieldChange(val, 'name')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="
              ['add-sub', 'edit'].includes(mode) &&
              form.parentId != '0' &&
              form.type == '1'
            "
            label="前端路由"
            prop="href"
            :class="FIELDS.IDCARD.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.href"
              placeholder=""
              @change="(val) => handleFieldChange(val, 'href')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="权限标识"
            prop="permission"
            :class="FIELDS.NAME.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.permission"
              @change="(val) => handleFieldChange(val, 'permission')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="排序"
            prop="sort"
            :class="FIELDS.NAME.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.sort"
              @change="(val) => handleFieldChange(val, 'sort')"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-btns">
        <div class="left-btns"></div>
        <div class="center-btns">
          <el-button class="btn-create" type="primary" @click="handleCreate"
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
import { Tag } from "element-ui";
import {
  ID_CARD_R as IDCARD,
  MOBILE_R as MOBILE,
  NAME_R as NAME,
  REQUIRED_RULE,
} from "@/utils/constant/fieldConfig.js";
import API from "../../axios/api";
export default {
  mixins: [formElement],
  components: {
    "el-tag": Tag,
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
        IDCARD,
        MOBILE,
        NAME,
        ROLE: {},
      },
      form: {
        parentId: "",
        navId: "",
        type: "",
        permission: "",
        sort: "",
        name: "",
        href: "",
      },
      rules: {
        name: [REQUIRED_RULE],
        sort: [REQUIRED_RULE],
      },
      typeOptions: [
        {
          label: "一级菜单",
          value: "0",
          disabled: true,
        },
        {
          label: "二级菜单",
          value: "1",
          disabled: true,
        },
        {
          label: "按钮",
          value: "999",
          disabled: true,
        },
      ],
    };
  },
  watch: {
    data: {
      handler: function (_data) {
        if (this.mode == "edit" && _data) {
          Object.assign(this.form, _data);
        } else if (JSON.stringify(_data) == "{}") {
          this.form.parentId = "0";
        } else {
          this.form.parentId = _data.navId;
        }
      },
      deep: true,
      immediate: true,
    },
    mode: {
      handler: function (_mode) {
        if (_mode == "add") {
          this.form.type = "0";
        }
        if (_mode == "add-btn") {
          this.form.type = "999";
        }
        if (_mode == "add-sub") {
          this.form.type = "1";
        }
      },
      immediate: true,
    },
  },
  created() {
    this.resetFieldsConfig();
  },
  mounted() {},
  methods: {
    // 新增/修改
    handleCreate() {
      let params = new FormData();
      params.append("name", this.form.name);
      params.append("type", this.form.type);
      params.append("parentId", this.form.parentId);
      params.append("id", this.form.navId);
      params.append("href", this.form.href || "");
      params.append("sort", this.form.sort);
      params.append("permission", this.form.permission || "");

      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        let _api = this.mode == "edit" ? "updateNavMenu" : "createNavMenu";
        API[_api](params).then((/*res*/) => {
          this.$message.success(this.mode == "edit" ? "修改成功" : "新增成功");
          this.$emit("close", true);
        });
      });
    },
    // 字段变动
    handleFieldChange(val, fieldKey) {
      let num = 1;
      if (num === 1) return;
      if (this.mode == "add") return;
      let _key = fieldKey.toUpperCase();
      switch (fieldKey) {
        case "realName":
          _key = "NAME";
          break;
      }
      if (this.data[fieldKey] !== val && this.FIELDS[_key]) {
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
.system.form.nav-create-form {
  .form-wrap {
    margin: 10px;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    & .form-main .el-form {
      .el-form-item {
        // width: 340px;
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
