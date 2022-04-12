export const menuListConfig = [
  {
    label: '项目管理',
    routerName: 'projectManage',
    permissionCode: 'PTN:SUPPLIER:CHAIN_PROJECT:MANAGE',
    hasPermission: false,
    isActive: false,
    menuTag: 'supply_chain_project',
  },
  {
    label: '客户管理',
    routerName: 'customerList',
    permissionCode: 'PTN:SUPPLIER:CUSTOMER:MANAGE',
    hasPermission: false,
    isActive: false,
    menuTag: 'customer_manage',
    tag: 'customer-admin'
  },
  {
    label: '我的账户',
    isActive: false,
    hasPermission: false,
    children: [
      {
        label: '账号管理',
        routerName: 'accountList',
        permissionCode: 'PTN:SUPPLIER:USER:MANAGE',
        hasPermission: false,
        isActive: false,
        menuTag: 'account_staff',
        tag: 'account-admin',
      },
      {
        label: '组织架构设置',
        routerName: 'organManageList',
        permissionCode: 'PTN:SUPPLIER:DEPARTMENT',
        hasPermission: false,
        isActive: false,
        menuTag: 'account_organization',
        tag: 'account-org',
      },
      {
        label: '权限管理',
        routerName: 'roleManageList',
        permissionCode: 'PTN:SUPPLIER:ROLE',
        hasPermission: false,
        isActive: false,
        menuTag: 'account_role',
        tag: 'account-power',
      },
      {
        label: '实名认证',
        routerName: 'authSet',
        permissionCode: 'PTN:SUPPLIER:REAL_AUTH:MANAGE',
        hasPermission: false,
        isActive: false,
        menuTag: 'account_auth_real',
        tag: 'account-orc',
      },
    ]
  },
  {
    label: '批量中心',
    totalCount: 0,
    routerName: 'exportList',
    permissionCode: 'PTN:DATA:EXPORT:CENTER',
    hasPermission: false,
    isActive: false,
    menuTag: 'data_center',
    tag: 'dataExport-center'
  },
]

// 我的任务
export const myWorkList = [
  {
    label: '我的任务',
    totalCount: 0,
    permissionCode: 'PTN:SUPPLIER:FLOW:MANAGE',
    hasPermission: false,
    isActive: false,
    children: [
      {
        label: '我的待办事项',
        routerName: 'backLog',
        permissionCode: 'PTN:SUPPLIER:FLOW_TODO:MANAGE',
        hasPermission: false,
        isActive: false,
        menuTag: 'supplier_flow_todo_manage',
        tag: 'process-wait'
      },
      {
        label: '我的办结事项',
        routerName: 'handleEnd',
        permissionCode: 'PTN:SUPPLIER:FLOW_DONE:MANAGE',
        hasPermission: false,
        isActive: false,
        menuTag: 'supplier_flow_done_manage',
        tag: 'process-over'
      }
    ]
  }
]
