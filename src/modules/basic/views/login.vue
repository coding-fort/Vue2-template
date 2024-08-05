<template>
  <div class="basic login">
    <div class="login-main">
      <div class="left"></div>
      <div class="right">
        <login-form />
      </div>
    </div>
    <p class="login-footer">
      <a target="_blank" href="http://beian.miit.gov.cn/">
        {{ copyRightInfo }}
      </a>
    </p>
  </div>
</template>

<script>
  import loginForm from "../form/loginForm.vue";
  import INFO from "@/assets/constant";
  export default {
    components: { loginForm },
    data() {
      return {
        copyRightInfo: INFO.copyRightInfo,
      };
    },
    created() {},
    mounted() {},
    methods: {
      /**
       * 获取配置文件中配置的版权信息
       * @version V1.1.0_0915
       */
      getConfigCopyRight() {
        if (!window.config) return;
        if (
          Object.prototype.hasOwnProperty.call(
            window.config,
            "VUE_APP_COPY_RIGHT"
          )
        ) {
          this.copyRightInfo = window.config.VUE_APP_COPY_RIGHT;
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .basic.login {
    width: 100vw;
    height: 100vh;
    background: url("../../../assets/imgs/basic/bg.login.png") 100% 100%
      no-repeat;
    background-position: 0 0;
    background-size: cover;
    .login-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      padding: 23px 100px 20px;
      background: #3b4248;
      text-align: center;
      a {
        color: #d3cfcf;
        font-size: 14px;
        letter-spacing: 0.5px;
      }
    }
  }
</style>
