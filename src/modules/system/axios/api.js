import api from "@/utils/request";
import qs from "qs";

export default {
  /** ################################################################################ **/
  /** 用户 */
  /** # [查询] 用户列表 */
  getUserList: (data) => api.get(`/user/qryPage?${qs.stringify(data)}`),
  /** # [查询] 用户详情 */
  getUserInfo: (data) => api.get(`/user/get?${qs.stringify(data)}`),
  /** # [变更] 用户新增 */
  saveUserInfo: (data) => api.post(`/user/save`, api.form(data)),
  /** # [变更] 用户修改 */
  updateUserInfo: (data) => api.post(`/user/update`, api.form(data)),
  /** # [变更] 用户删除 */
  deleteUserInfo: (data) => api.post(`/user/delete`, data),

  /** ################################################################################ **/
  /** 角色 */
  /** # [查询] 角色列表 */
  getRoleList: (data) => api.get(`/sys/role/qryPage?${qs.stringify(data)}`),
  /** # [查询] 角色详情 */
  getRoleInfo: (data) => api.get(`/sys/role/get?${qs.stringify(data)}`),
  /** # [查询] 角色用户列表 */
  getRoleUserList: (data) =>
    api.get(`/sys/role/queryUserByRole?${qs.stringify(data)}`),

  /** # [变更] 角色新增 */
  saveRoleInfo: (data) => api.post(`/sys/role/save`, api.form(data)),
  /** # [变更] 角色修改 */
  updateRoleInfo: (data) => api.post(`/sys/role/update`, api.form(data)),
  /** # [变更] 角色删除 */
  deleteRoleInfo: (data) => api.post(`/sys/role/delete`, api.form(data)),

  /** ################################################################################ **/
  /** 修改密码 */
  /** # [变更] 修改密码 */
  updateLoginPassword: (data) => api.post(`/sys/user/resetPwd`, data),

  /** ################################################################################ **/
  /** 菜单 */
  /** # [查询] 侧边栏菜单 */
  getNavMenu: (data) => api.get(`/sys/menu/qryAllMenus`, data),
  /** # [查询] 侧边栏（当前登录用户）菜单 */
  getUserMenu: (data) => api.post(`/user/getUserMenus`, data),
  /** # [变更] 新增菜单 */
  createNavMenu: (data) => api.post(`/sys/menu/save`, data),
  /** # [变更] 修改菜单 */
  updateNavMenu: (data) => api.post(`/sys/menu/update`, data),
  /** # [变更] 删除菜单 */
  deleteNavMenu: (data) => api.get(`/sys/menu/delete?${qs.stringify(data)}`),

  /** # [查询] 查询按钮 */
  qryMenusButtons: (data) => {
    return api.get(`/sys/menu/qryMenusButtons?${qs.stringify(data)}`);
  },
  /** # [查询] 查询子菜单 */
  qryMenus: (data) => api.get(`/sys/menu/qryMenus?${qs.stringify(data)}`),
};
