<template>
  <div class="es-top-header">
    <el-menu
      default-active="0"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-submenu index="2">
        <template slot="title">欢迎您，{{ userName }}</template>
        <el-menu-item index="2-1" @click.native="$emit('logout')"
          >退出登录</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { Menu, MenuItem, Submenu } from "element-ui";
export default {
  components: {
    "el-menu": Menu,
    "el-menu-item": MenuItem,
    "el-submenu": Submenu,
  },
  props: {
    userName: {
      type: String,
      default: "",
    },
  },
  methods: {
    // 获取登录用户信息
    getUserName() {},
    handleSelect() {},
  },
};
</script>

<style lang="less">
.es-top-header {
  // 重置element-ui 样式
  .el-menu--horizontal > .el-submenu {
    float: right;
  }
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom: unset;
  }
}
</style>
