
const AuthSet = () => import(/* webpackChunkName: "group-common" */ '@/views/common/account/authSet')
const OrganManageList = () => import(/* webpackChunkName: "group-common" */ '@/views/common/account/organManageList')
const accountManage = () => import(/* webpackChunkName: "group-common" */ '@/views/Account/account/index')
const roleManage = () => import(/* webpackChunkName: "group-common" */ '@/views/Account/role/index')
const roleManageDetail = () => import(/* webpackChunkName: "group-common" */ '@/views/Account/role/RoleManageDetail.vue')
const AccountOpenInfo = () => import(/* webpackChunkName: "group-common" */ '@/views/Account/account/AccountOpenInfo.vue')

const pages = [
  // 实名认证
  { path: 'account/authReal', name: 'authSet', components: { default: AuthSet }, meta: { menuTag: 'account_auth_real', hasMenuTag: true, crumbs: ['我的账户', '实名认证'] } },
  { path: 'account/setOrganization', name: 'organManageList', components: { default: OrganManageList }, meta: { menuTag: 'account_organization', hasMenuTag: true, crumbs: ['我的账户', '组织架构设置'] } },
  { path: 'account/role/list', name: 'roleManageList', meta: { crumbs: ['我的账户', '权限管理'], menuTag: 'account_role', hasMenuTag: false }, components: { default: roleManage } },
  { path: 'account/role/edit', name: 'roleManageEdit', components: { default: roleManageDetail }, meta: { menuTag: 'account_role', crumbs: ['我的账户', '权限管理', '角色编辑'] } },
  { path: 'account/role/detail', name: 'roleManageDetail', components: { default: roleManageDetail }, meta: { menuTag: 'account_role', crumbs: ['我的账户', '权限管理', '角色详情'] } },
  { path: 'account/accountNumber/list', name: 'accountList', meta: { crumbs: ['我的账户', '账号管理'], menuTag: 'account_staff', hasMenuTag: false }, components: { default: accountManage } },
  { path: 'account/accountOpenInfo', name: 'accountOpenInfo', components: { default: AccountOpenInfo }, meta: { menuTag: 'account_staff', crumbs: ['我的账户', '账号管理', '账号开通'] } },
]

export default pages
