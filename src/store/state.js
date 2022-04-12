const state = {
  // 菜单数据
  menuData: null,
  // 当前在哪个应用下，默认为saas2
  currentApp: null,
  // 客户身份下，是否显示“我的账户”的弹框
  showCustomerAccountDialog: false,
  // 应用权限，key: menuTag，主要作为菜单权限判断
  appPermissions: null,
  // 以permissionCode为标识的权限，全量权限包含菜单和按钮级别权限
  permissions: {},
  // 菜单对应权限，作为路由跳转依据
  menuPermisssions: {},
  // 身份变更后需要刷新页面，此时将此属性设为true，显示刷新页面的弹框
  showRefreshPageDialog: false,
  // 触发应用子级菜单更新（应用菜单右侧的做菜单）
  refresh: false,
  // 按需编译模块
  asyncModules: [],
  // -------------- 未分类抽离的state暂时存放于此 --------------
  userInfo: {},
  sonTenants: [], // 当前企业的子公司
  trusteeship: {
    isTrusteeship: '',
    name: ''
  },
  consensusStatistics: {}, // 舆情雷达-统计
  ifShowLoginTip: false, // 是否展示登录弱密码提示
  areaData: [], // 新版省市区数据
  curFactory: {}, // 当前选中的租户及用户在当前租户下的信息
  curIdentify: '', // 当前的身份 1.厂家 2.经销商
  // -------------- 未分类抽离的state暂时存放于此 --------------
}

export default state
