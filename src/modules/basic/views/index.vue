<template>
  <div class="basic index">
    <el-container class="index-container">
      <el-aside class="index-aside" :class="isCollapse ? 'is-collapse' : ''">
        <div class="index-logo">
          <img :src="logoSrc" />
        </div>
        <es-nav-menu
          :is-collapse.sync="isCollapse"
          :menu-list="navMenuList"
        ></es-nav-menu>
      </el-aside>
      <el-main class="index-main">
        <el-header
          class="index-header"
          :class="isCollapse ? 'is-collapse' : ''"
        >
          <es-top-header @logout="logout" :user-name="userName">
          </es-top-header>
        </el-header>
        <!-- <es-bread-crumb></es-bread-crumb> -->
        <router-view />
      </el-main>
    </el-container>
    <div></div>
  </div>
</template>

<script>
  import navMenu from "@/components/navMenu/navMenu";
  import topHeader from "@/components/topHeader/topHeader";
  import { Aside, Container, Header, Main } from "element-ui";
  import API from "../axios/api";
  import SYS_API from "@/modules/system/axios/api";

  import logoSetting from "../constant/logoSetting";
  export default {
    name: "basic-index",
    module: "basic",
    components: {
      "el-aside": Aside,
      "el-container": Container,
      "el-header": Header,
      "el-main": Main,
      "es-nav-menu": navMenu,
      "es-top-header": topHeader,
    },
    data() {
      return {
        isCollapse: false,
        navMenuList: [],
        // 说明：用户名称
        userName: "",
        logoSrc: logoSetting.horizontal,
      };
    },
    watch: {
      isCollapse: {
        handler(flag) {
          if (flag) this.logoSrc = logoSetting.basic;
          if (!flag) this.logoSrc = logoSetting.horizontal;
        },
      },
    },
    created() {
      // this.getUserInfo();
      // this.getUserMenus();
      this.asyncGetUserInfo();
      const enums = this.$store.state.enums;
      console.log("emuns::", enums);
    },
    methods: {
      /**
       * 同步请求用户信息及用户菜单
       * @version V1.1.0_0915.29
       */
      async asyncGetUserInfo() {
        // 请求用户信息
        let res = await API.getUserInfo();
        // V1.1.1_0915.2
        let { name, loginName } = res;
        this.userName = name || loginName;
        // 当前登录用户菜单
        this.navMenuList = [];
        res = await SYS_API.getUserMenu();
        this.processMenuData(res.data);
      },
      /**
       * 请求：退出登录
       */
      logout() {
        this.$confirm("是否退出登录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          API.userLogout().then(() => {
            this.$router.replace("/login");
          });
        });
      },
      /**
       * 请求：获取当前登录用户信息
       */
      getUserInfo() {
        API.getUserInfo().then((res) => {
          let { name } = res.data.data;
          this.userName = name;
        });
      },
      /**
       * 请求：菜单
       */
      getNavMenu() {
        this.navMenuList = [];
        SYS_API.getNavMenu().then((res) => {
          let { trees } = res.data.data;
          trees.forEach((item) => {
            let _level_1_menu = {};
            _level_1_menu.name = item.name;
            _level_1_menu.index = item.value;
            _level_1_menu.subMenu = [];
            if (Object.prototype.hasOwnProperty.call(item, "list")) {
              item.list.forEach((itm) => {
                let _level_2_menu = {};
                _level_2_menu.name = itm.name;
                _level_2_menu.index = itm.value;
                _level_1_menu.subMenu.push(_level_2_menu);
              });
            }

            this.navMenuList.push(_level_1_menu);
          });
          console.log("------------------getNavMenu:", this.navMenuList);
        });
      },
      /**
       * 请求：当前登录用户菜单
       */
      getUserMenus() {
        this.navMenuList = [];
        SYS_API.getUserMenu().then((res) => {
          // console.log("---------------------res.data.data:", res.data.data);
          // let _menu = res.data.data.filter((item) => item.type == "0");
          let _level_menu = [];
          let _level_1_menu = [];
          let _level_2_menu = [];
          let _premission_menu = [];
          res.data.data.forEach((item) => {
            let _menuItem = {};
            _menuItem.index = item.id;
            _menuItem.name = item.name;
            _menuItem.type = item.type;
            _menuItem.href = item.href;
            _menuItem.parentId = item.parentId;
            _menuItem.subMenu = [];
            _menuItem.permission = [];

            item.type == "0" && _level_1_menu.push(_menuItem);
            item.type == "1" && _level_2_menu.push(_menuItem);
            item.type == "999" && _premission_menu.push(_menuItem);

            _level_menu.push(_menuItem);
          });
          // 组合二级菜单按钮
          _premission_menu &&
            _premission_menu.forEach((item) => {
              let _parentMenu = _level_2_menu.find(
                (itm) => itm.index == item.parentId
              );
              _parentMenu && _parentMenu.permission.push(item);
            });

          // 组合一级二级菜单
          _level_2_menu &&
            _level_2_menu.forEach((item) => {
              let _parentMenu = _level_1_menu.find(
                (itm) => itm.index == item.parentId
              );
              _parentMenu && _parentMenu.subMenu.push(item);
            });
          this.navMenuList = _level_1_menu;
        });
      },
      /**
       * 处理菜单数据
       * @version V1.1.0_0915.29
       */
      processMenuData(list) {
        let _level_menu = [];
        let _level_1_menu = [];
        let _level_2_menu = [];
        let _premission_menu = [];
        list.forEach((item) => {
          let _menuItem = {};
          _menuItem.index = item.id;
          _menuItem.name = item.name;
          _menuItem.type = item.type;
          _menuItem.href = item.href;
          _menuItem.parentId = item.parentId;
          _menuItem.subMenu = [];
          _menuItem.permission = [];

          item.type == "0" && _level_1_menu.push(_menuItem);
          item.type == "1" && _level_2_menu.push(_menuItem);
          item.type == "999" && _premission_menu.push(_menuItem);

          _level_menu.push(_menuItem);
        });
        // 组合二级菜单按钮
        _premission_menu &&
          _premission_menu.forEach((item) => {
            let _parentMenu = _level_2_menu.find(
              (itm) => itm.index == item.parentId
            );
            _parentMenu && _parentMenu.permission.push(item);
          });

        // 组合一级二级菜单
        _level_2_menu &&
          _level_2_menu.forEach((item) => {
            let _parentMenu = _level_1_menu.find(
              (itm) => itm.index == item.parentId
            );
            _parentMenu && _parentMenu.subMenu.push(item);
          });
        this.navMenuList = _level_1_menu;
      },
      /**
       * 请求：状态值
       */
      getOptions() {
        // let params = {

        // }
        let formData = new FormData();
        formData.append("paramType", "PLATFORM_CHECK_CATEGORY");
        SYS_API.getEnumOptions(formData).then(() => {});
      },
    },
  };
</script>

<style lang="less">
  .basic.index {
    .index-container {
      height: 100vh;
      // 侧栏
      .index-aside {
        width: 270px !important;
        background-color: #2a3842;
        color: #92a1b0;
        transition: 0.25s all ease-in-out;
        ul.el-menu {
          border-right: unset;
        }
        &.is-collapse {
          width: 48px !important;
          padding-left: 0;
          .index-logo {
            width: 48px;
            padding-left: 0;
          }
          img {
            width: 80%;
            height: unset;
            margin-top: 6px;
            margin-left: 5px;
          }
        }
      }
      .index-main {
        padding: 0;
        // header
        .index-header {
          padding: 0;
        }
      }
      // logo
      .index-logo {
        height: 60px;
        background: #fff;
        padding-left: 38px;
        padding-top: 5px;
        img {
          height: 50px;
          width: unset;
          // height: fit-content;
          margin-top: 0px;
          margin-left: 23px;
        }
      }
    }
  }
</style>
