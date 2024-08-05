<template>
  <div class="system form reset-password-form">
    <div class="form-wrap">
      <div class="form-main">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="旧密码" prop="oldPsw">
            <el-input
              type="password"
              v-model="form.oldPsw"
              placeholder="请输入旧密码"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPsw">
            <el-input
              type="password"
              v-model="form.newPsw"
              placeholder="请输入新密码"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="form.confirmPassword"
              placeholder="请输入再次输入新密码"
              show-password
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-btns">
        <div class="left-btns"></div>
        <div class="left-btns">
          <el-button
            class="btn-create"
            type="primary"
            @click="handleUpdate"
            :loading="submitting"
            >确认</el-button
          >
        </div>
        <div class="right-btns"></div>
      </div>
    </div>
  </div>
</template>

<script>
import formElement from "@/mixins/formElementMixin";
import API from "../axios/api";
import BASIC_API from "@/modules/basic/axios/api";
import { REQUIRED_RULE, PASSWORD } from "@/utils/constant/fieldConfig.js";

import Jsencrypt from "jsencrypt";
export default {
  mixins: [formElement],
  components: {},
  data() {
    let _that = this;
    return {
      form: {
        oldPsw: "",
        newPsw: "",
        confirmPassword: "",
      },
      rules: {
        oldPsw: [REQUIRED_RULE],
        newPsw: PASSWORD.RULES,
        confirmPassword: [
          ...PASSWORD.RULES,
          {
            validator: _that.validConfirmPassword,
            trigger: ["change", "blur"],
          },
        ],
      },
      submitting: false,
      RSA_PUBLIC_KEY: "",
    };
  },
  watch: {},
  created() {
    this.getPublicKey();
  },
  mounted() {
    this.resetFormFields();
  },
  methods: {
    /**
     * 获取公钥
     */
    async getPublicKey() {
      let res = await BASIC_API.getPublicKey();
      this.RSA_PUBLIC_KEY = res.data.data;
    },
    /**
     * 加密登录信息
     */
    zipLoginInfo() {
      const encrypt = new Jsencrypt();
      encrypt.setPublicKey(this.RSA_PUBLIC_KEY);
      let newPsw = encrypt.encrypt(this.form.newPsw);
      let oldPsw = encrypt.encrypt(this.form.oldPsw);
      return {
        newPsw,
        oldPsw,
      };
    },
    /**
     * 判断密码是否一致
     */
    validConfirmPassword(rule, value, callback) {
      if (value && value !== this.form.newPsw) {
        callback(new Error("确认密码与新密码不一致，请重新输入"));
      } else {
        callback();
      }
    },
    // 修改密码
    handleUpdate() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        this.submitting = true;

        let zipInfo = this.zipLoginInfo();
        let formData = new FormData();
        formData.append("oldPsw", zipInfo.oldPsw);
        formData.append("newPsw", zipInfo.newPsw);

        API.updateLoginPassword(formData)
          .then(() => {
            this.$message.success("密码修改成功");
          })
          .catch(() => {})
          .finally(() => {
            this.submitting = false;
            this.resetFormFields();
          });
      });
    },
    // 清空表单
    resetFormFields() {
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang="less">
.system.form.reset-password-form {
  .form-wrap {
    height: calc(100vh - 80px);
    margin: 10px;
    padding: 10px;
    border: 1px solid #d9dbdd;
    border-radius: 4px;
    background-color: #fff;
    & .form-main .el-form {
      // display: flex;
      .el-form-item {
        width: 340px;
        margin: 0 10px;
        margin-top: 10px;
        .el-select {
          width: 100%;
        }
      }
    }
    // 按钮组
    & .form-btns {
      display: flex;
      justify-content: space-between;
      width: 340px;
      margin-top: 30px;
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
