<template>
  <div class="es-nav-menu">
    <el-button
      v-if="!isCollapse"
      class="es-nav-button__spread"
      :icon="spreadBtnIcon"
      plain
      size="mini"
      @click="handleSpreadAll"
    >
      {{ spreadBtnTxt }}
    </el-button>
    <el-button
      @click="handleCollapse"
      class="collapse-btn"
      :class="isCollapse ? 'is-collapse' : ''"
    ></el-button>
    <el-menu
      :default-active="activeMenu"
      :default-openeds="openMenu"
      class="el-menu-vertical"
      @select="handleSelect"
      @open="handleOpen"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :router="true"
    >
      <el-submenu :index="itm.index" v-for="(itm, idx) in menuList" :key="idx">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ itm.name }}</span>
        </template>
        <el-menu-item
          :index="it.index"
          :key="id"
          :route="`${it.href}`"
          v-for="(it, id) in itm.subMenu"
          >{{ it.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import { Menu, MenuItem, Button, Submenu } from "element-ui";
  export default {
    components: {
      "el-menu": Menu,
      "el-menu-item": MenuItem,
      "el-button": Button,
      "el-submenu": Submenu,
    },
    props: {
      isCollapse: {
        type: Boolean,
        default: false,
      },
      menuList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        activeMenu: "0",
        // 说明： 当前展开菜单索引数组
        openMenu: [],
        // 说明： 全部菜单索引
        spreadMenu: [],
        // 说明： 是否全部展开
        isSpread: false,
        spreadBtnTxt: "",
        spreadBtnIcon: "",
      };
    },
    watch: {
      menuList: {
        handler(list) {
          this.spreadMenu = list.map((itm) => itm.index);
        },
        immediate: true,
      },
      /**
       * 说明： 监听isSpread，控制展示元素
       */
      isSpread: {
        handler(flag) {
          this.spreadBtnTxt = flag ? "全部收起" : "全部展开";
          this.spreadBtnIcon = flag ? "el-icon-minus" : "el-icon-plus";
          this.openMenu = flag
            ? JSON.parse(JSON.stringify(this.spreadMenu))
            : [];
        },
        immediate: true,
      },
      /**
       * 说明： 监听openMenu，判断当前是否已全部展开/收起，控制isSpread
       */
      openMenu: {
        handler(list) {
          let len = list.length;
          if (len == this.spreadMenu.length) {
            this.isSpread = true;
          }
          if (len === 0) {
            this.isSpread = false;
          }
        },
        immediate: true,
      },
    },
    created() {},
    mounted() {},
    methods: {
      /**
       * 菜单选择
       * @param {string} index - 当前菜单索引
       */
      handleSelect(index) {
        this.activeMenu = index;
      },
      /**
       * 菜单打开
       * @param {string} index - 当前菜单索引
       */
      handleOpen(index) {
        if (!this.openMenu.includes(index)) {
          this.openMenu.push(index);
        }
      },
      handleClose() {},
      // 展开/收起侧栏
      handleCollapse() {
        this.$emit("update:is-collapse", !this.isCollapse);
      },
      /**
       * 菜单全部展开
       */
      handleSpreadAll() {
        this.isSpread = !this.isSpread;
      },
    },
  };
</script>

<style lang="less">
  @baseColor: #90a4ae;
  @baseBgColor: #2a3842;
  @baseSubColor: #1a2d38;
  @baseSubBgColor: #1a2d38;
  @baseBorderColor: hsla(0, 0%, 100%, 0.06);

  @activeColor: #fff;
  @activeBgColor: #47565f;

  .es-nav-menu {
    height: calc(100vh - 60px);
    overflow: auto;
    // 全部展开/全部收起按钮
    .es-nav-button__spread {
      width: 100%;
      padding: 10px 15px;
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid @baseBorderColor;
      font-size: 14px;
      text-align: left;
      color: #90a4ae !important;
      background-color: #2a3842 !important;
      &:hover {
        color: #fff !important;
        background-color: #2a3842 !important;
      }
      &:hover,
      &:focus {
        border-color: @baseBorderColor !important;
      }
      i {
        padding: 1px;
        border: 1px solid @baseBorderColor;
      }
    }
    // 菜单
    .el-menu-vertical {
      background-color: #2a3842 !important;
      height: calc(100% - 40px);
      overflow: auto;
    }
    // 含子菜单
    li.el-submenu {
      &:hover {
        .el-submenu__title,
        i {
          color: #fff !important;
        }
      }
      .el-submenu__title {
        background-color: @baseBgColor !important;
        border-bottom: 1px solid @baseBorderColor !important;
        color: @baseColor !important;
      }
      li.el-menu-item {
        background-color: @baseSubBgColor !important;
        // hover 样式
        .hover-menu-before();
        &:hover {
          background-color: @activeBgColor !important;
          box-shadow: unset !important;
        }
        // 子菜单内阴影
        &:first-of-type {
          box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.2) inset;
        }
        &:last-of-type {
          box-shadow: 0 -2px 2px 1px rgba(0, 0, 0, 0.2) inset;
        }
        &.is-active {
          background-color: #47565f !important;
          box-shadow: unset !important;
        }
      }
      // 菜单展开
      &.is-opened {
        .el-submenu__title {
          color: #fff !important;
        }
      }
    }
    // 单菜单
    li.el-menu-item {
      background-color: @baseBgColor !important;
      border-bottom: 1px solid @baseBorderColor !important;
      color: @baseColor !important;
      &:hover {
        color: @activeColor !important;
        i {
          color: @activeColor !important;
        }
      }
    }
    // 收起菜单
    ul.el-menu--collapse {
      width: 48px;
      .el-tooltip,
      .el-submenu__title {
        padding: 0 12px !important;
        & > i {
          font-size: 24px;
        }
        .hover-menu-before();
      }
    }
    // 收起/展开按钮
    .collapse-btn {
      position: absolute;
      // top: 22px;
      top: 75px;
      left: 270px;
      // z-index: 100;
      width: 20px;
      // height: 37px;
      margin-left: 0 !important;
      padding-left: 3px;
      padding-right: 3px;
      border-radius: 3px;
      border: 0;
      background-color: #e6e7e8;
      transition: 0.25s all ease-in-out;
      &:hover {
        background-color: #82cbf8;
      }
      &::before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        transform: rotateZ(-45deg);
      }
      &.is-collapse {
        left: 48px;
        &::before {
          transform: translateX(-4px) rotateZ(135deg);
        }
      }
    }

    // 菜单hover 条形
    .hover-menu-before {
      &::before {
        content: "";
        border-left: 5px solid #11a0f8;
        position: absolute;
        left: 0;
        top: 0;
        bottom: -1px;
        transform: scaleY(0.6);
        opacity: 0;
        transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
          opacity 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      &:hover::before {
        content: "";
        transform: scaleY(1);
        opacity: 1;
        transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1),
          opacity 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
</style>
