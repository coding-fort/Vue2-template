<template>
  <div class="basic form login-form">
    <div class="login-type" v-if="0">
      <ul>
        <li>
          <el-button
            :class="loginType == 'account' ? 'active' : ''"
            type="text"
            @click="loginType = 'account'"
          >
            账号登录
          </el-button>
          <el-button
            :class="loginType == 'message' ? 'active' : ''"
            type="text"
            @click="loginType = 'message'"
          >
            短信登录
          </el-button>
        </li>
      </ul>
    </div>
    <div class="login-wrap">
      <div class="login-title">登录</div>
      <div class="login-form form">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="" prop="userName">
            <el-input v-model="form.userName" placeholder="账号">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="密码"
              show-password
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="captchaCode">
            <div class="captcha-code">
              <el-input
                v-model="form.captchaCode"
                maxlength="4"
                placeholder="验证码"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
              <img :src="captchaCodeSrc" @click="getCaptchaCode" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-btns">
        <el-button
          class="btn-submit"
          type="primary"
          @click="onSubmit"
          :loading="submitting"
        >
          登录
        </el-button>
      </div>
      <div class="login-operate">
        <el-checkbox v-model="hadRememberUser">记住用户名</el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
  // import Jsencrypt from "jsencrypt";
  import formElement from "@/mixins/formElementMixin";
  import { Checkbox } from "element-ui";
  import API from "../axios/api";
  import zipMixin from "../mixins/zipMixin";
  export default {
    mixins: [formElement, zipMixin],
    components: {
      "el-checkbox": Checkbox,
    },
    data() {
      return {
        form: {
          userName: "",
          password: "",
          captchaCode: "",
        },
        rules: {
          userName: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          ],
          captchaCode: [
            { required: true, message: "请输入验证码", trigger: "blur" },
          ],
        },
        hadRememberUser: false,
        // 验证码图片地址
        captchaCodeSrc: "",
        // 验证码随机数
        captchaCodeRandom: "",
        //
        submitting: false,
      };
    },
    watch: {
      // 说明：判断是否记住用户名
      hadRememberUser: {
        handler(flag) {
          flag && this.handleRememberUserName();
          !flag && this.handleRememberUserName(1);
        },
        // immediate: true,
      },
    },
    created() {
      this.getPublicKey();
      this.getCaptchaCode();
    },
    mounted() {
      this.autoFillUserName();
    },
    methods: {
      /**
       * 按钮拦截
       */
      keyDown(e) {
        // 如果是回车则执行登录方法
        if (e.keyCode === 13) {
          this.onSubmit();
        }
      },
      /**
       * 获取验证码
       */
      async getCaptchaCode() {
        let params = {};
        this.captchaCodeRandom = params.randomToken = new Date().getTime();
        this.captchaCodeSrc = await API.getCaptchaCode(params);
      },
      /**
       * 登录
       */
      onSubmit() {
        this.$refs["form"].validate(async (valid) => {
          if (!valid) return;
          try {
            await API.userLogin(this.form);
            this.$message.success("登录成功");
            this.$router.push("/");
          } catch (error) {
            this.getPublicKey();
            this.getCaptchaCode();
          }
        });
      },
      /**
       * 记住用户名
       */
      handleRememberUserName() {},
      /**
       * 反显用户名
       */
      autoFillUserName() {},
    },
  };
</script>

<style lang="less">
  @input-focus-border-color: #11a0f8;
  .basic.form {
    .login-wrap {
      & {
        position: absolute;
        right: 100px;
        top: 50%;
        width: 330px;
        margin: -175px 0 0;
        padding: 15px 27px 22px;
        background: rgba(26, 26, 26, 0.7);
        border-radius: 5px;
        color: #fff;
      }
      .login-title {
        margin-bottom: 5px;
        font-size: 13px;
      }
      // 表单
      .login-form {
        .captcha-code {
          display: flex;
          height: 40px;
          img {
            width: 150px;
          }
        }
      }
      // 按钮
      .login-btns {
        width: 100%;
        margin-top: 11px;
        text-align: center;
        .btn-submit {
          width: 100%;
          height: 46px;
          border-radius: 23px;
        }
      }
      // 操作
      .login-operate {
        margin-top: 12px;
        label {
          color: #fff;
        }
      }
      .form {
        input {
          border-radius: 0;
          background: transparent;
          border: unset;
          border-bottom: 1px solid #fff;
          color: #fff;
          text-indent: 10px;
          & + span i {
            font-size: 20px;
          }
          &:focus {
            border-color: @input-focus-border-color;
          }
          &:focus + span i {
            color: @input-focus-border-color;
          }
        }
      }
    }
  }
</style>
