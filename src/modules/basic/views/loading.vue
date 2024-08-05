<template>
  <div
    class="basic loading"
    v-loading="true"
    element-loading-text="拼命加载中"
  ></div>
</template>
<script>
  export default {
    watch: {
      $route: {
        handler(route) {
          setTimeout(() => {
            let query = route.query;
            // 说明： 无登录状态或退出跳转页面
            let redirectUrl = "";
            // 说明： 配置位置 /public/constant/server.js
            if (
              window.config &&
              Object.prototype.hasOwnProperty.call(
                window.config,
                "VUE_APP_REDIRECT_URL"
              ) &&
              window.config.VUE_APP_REDIRECT_URL
            ) {
              redirectUrl = window.config.VUE_APP_REDIRECT_URL;
            }
            // 说明： 登录成功跳转
            if (query.SM_USER) {
              console.log("-----登录成功跳转：");
              this.$router.push("/");
            }
            // 说明： 登录失败跳转
            if (!query.SM_USER && redirectUrl)
              window.location.replace(redirectUrl);
          }, 350);
        },
        immediate: true,
      },
    },
  };
</script>
<style lang="less" scoped>
  .basic.loading {
    width: 100vw;
    height: 100vh;
  }
</style>
