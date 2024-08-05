<template>
  <div class="system form user-create-form">
    <div class="form-wrap">
      <div class="form-main">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="form.mobile" :maxlength="FIELDS.MOBILE.LEN">
            </el-input>
          </el-form-item>
          <el-form-item
            label="登录账号"
            prop="loginName"
            :class="FIELDS.LOGIN_NAME.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.loginName"
              :disabled="mode === 'edit'"
              :maxlength="FIELDS.LOGIN_NAME.LEN"
              @change="(val) => handleFieldChange(val, 'loginName')"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="姓名"
            prop="name"
            :class="FIELDS.NAME.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.name"
              :maxlength="FIELDS.NAME.LEN"
              @change="(val) => handleFieldChange(val, 'name')"
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item
            label="身份证号码"
            prop="idCard"
            :class="FIELDS.IDCARD.chgFlag ? 'had-change' : ''"
          >
            <el-input
              v-model="form.idCard"
              placeholder=""
              :maxlength="FIELDS.IDCARD.LEN"
              @change="(val) => handleFieldChange(val, 'idCard')"
            >
            </el-input>
          </el-form-item> -->
          <el-form-item
            label="分行权限"
            prop="accountBranch"
            :class="FIELDS.ACCOUNTBRANCH.chgFlag ? 'had-change' : ''"
          >
            <el-select
              v-model="form.accountBranch"
              multiple
              placeholder="请选择"
              @change="(val) => handleFieldChange(val, 'accountBranch')"
            >
              <el-option
                v-for="item in bankBranchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="角色"
            prop="role"
            :class="FIELDS.ROLE.chgFlag ? 'had-change' : ''"
          >
            <el-select
              v-model="form.role"
              multiple
              placeholder="请选择"
              @change="(val) => handleFieldChange(val, 'role')"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
import { Select, Option } from "element-ui";
import {
  ID_CARD_R as IDCARD,
  MOBILE_R as MOBILE,
  LOGIN_NAME_R as LOGIN_NAME,
  NAME_R as NAME,
  REQUIRED_RULE,
} from "@/utils/constant/fieldConfig.js";
import API from "../../axios/api";
export default {
  mixins: [formElement],
  components: {
    "el-select": Select,
    "el-option": Option,
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
      canalBankOptions: [],
      FIELDS: {
        IDCARD,
        MOBILE,
        LOGIN_NAME,
        NAME,
        ROLE: {},
        ACCOUNTBRANCH: {},
      },
      form: {
        mobile: "",
        loginName: "",
        name: "",
        // idCard: "",
        role: [],
        accountBranch: [],
      },
      rules: {
        mobile: MOBILE.RULES,
        // len:6-50
        loginName: LOGIN_NAME.RULES,
        name: NAME.RULES,
        // idCard: IDCARD.RULES,
        role: [REQUIRED_RULE],
        accountBranch: [REQUIRED_RULE],
      },
      bankBranchOptions: [],
      roleOptions: [
        {
          value: "",
          label: "请选择",
        },
        {
          value: "1",
          label: "运营业务拓展岗",
        },
        {
          value: "2",
          label: "运营数据报送岗",
        },
        {
          value: "3",
          label: "运营合规管理岗",
        },
        {
          value: "4",
          label: "运营资金清算岗",
        },
      ],
    };
  },
  watch: {
    data: {
      handler: function (_data) {
        if (JSON.stringify(_data) != "{}") {
          Object.assign(this.form, _data);
          this.form.role = _data.roleIds;
          this.form.accountBranch = _data.orgIds.map((item) => +item);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getRoleOfUserList();
    this.resetFieldsConfig();
  },
  mounted() {},
  methods: {
    /**
     * 获取角色列表
     */
    async getRoleOfUserList() {
      this.roleOptions = [];
      let res = await API.getRoleOfUserList();
      let { data } = res.data;
      this.roleOptions = data.map((itm) => {
        return { value: itm.id, label: itm.name };
      });
      res = await API.getOrgList();
      this.bankBranchOptions = res.data.data.map((itm) => {
        return { value: itm.id, label: itm.orgName };
      });

      // this.$log("-------------------getRoleOfUserList:", res);
    },
    // 新增
    handleCreate() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        let params = {};

        params.mobile = this.form.mobile;
        params.loginName = this.form.loginName;
        params.name = this.form.name;
        params.roleId = this.form.role.join(",");
        // 说明：分行权限
        params.orgId = this.form.accountBranch.join(",");

        this.mode == "edit" && (params.id = this.data["id"]);
        let _api = this.mode == "edit" ? "updateUserInfo" : "saveUserInfo";
        API[_api](params).then((res) => {
          this.$message.success(this.mode == "edit" ? "修改成功" : "新增成功");
          this.$emit("close", false, true);
          // 说明： 新增成功弹窗展示密码
          if (this.mode == "add") {
            this.$alert(res.data.data, "用户新增成功", {
              confirmButtonText: "确定",
            });
          }
        });
      });
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
      this.canalBankOptions.options = this.canalBankOptions.options.filter(
        (item) => item.value != "310115100102"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.system.form.user-create-form {
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
