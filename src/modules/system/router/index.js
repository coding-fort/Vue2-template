/**
 * 系统模块
 */

const moduleName = "system";

const router = {};

import systemIndex from "../views/index";
import sysUserList from "../views/sysUserList";
import sysRoleList from "../views/sysRoleList";
import sysResetPassword from "../views/sysResetPassword";
import sysNavList from "../views/sysNavList";
import sysTaskList from "../views/sysTaskList";
import sysLogList from "../views/sysLogList";

/**
 * 路由
 */
router.routes = [
  {
    path: "/system",
    name: "systemIndex",
    component: systemIndex,
    meta: { module: moduleName, title: "systemIndex" },
    children: [
      {
        path: "user",
        name: "systemUser",
        component: sysUserList,
        meta: { module: moduleName, title: "用户管理" },
      },
      {
        path: "role",
        name: "systemRole",
        component: sysRoleList,
        meta: { module: moduleName, title: "角色管理" },
      },
      {
        path: "reset",
        name: "systemResetPassword",
        component: sysResetPassword,
        meta: { module: moduleName, title: "重置密码" },
      },
      {
        path: "nav",
        name: "systemNav",
        component: sysNavList,
        meta: { module: moduleName, title: "菜单管理" },
      },
      {
        path: "task",
        name: "systemTask",
        component: sysTaskList,
        meta: { module: moduleName, title: "定时任务管理" },
      },
      {
        path: "log",
        name: "systemLog",
        component: sysLogList,
        meta: { module: moduleName, title: "系统日志" },
      },
    ],
  },
];

export default router;
