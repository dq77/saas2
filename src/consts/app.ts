// 各应用相关配置

// 应用列表
/**
 * @param title 标题
 * @param icon 图标
 * @param name router对应name
 * @param key 菜单数据标识
 * @param otherNames 菜单是否选中的其余字段
 * @param keep 若为ture 无论何时都会显示
 * @param userTypes 1.租户或员工，2.客户 3.都有
 */
export interface appTypes {
  title: string;
  icon: string;
  name: string;
  key?: string;
  otherNames?: string[];
  userTypes?: number[];
  keep?: boolean;
  all?: boolean;
  defaultRedirect?: boolean;
  module?: string;
}

export interface subMenuTypes {
  name: string;
  menuTag: string;
  subMenu: subMenuTypes[] | null,
  permissionCode: string;
  isHidden?: boolean;
}

export interface menuTypes {
  subMenu: subMenuTypes[],
}

export const appLists: Array<appTypes> = [
  { title: '首页', icon: 'iconshouye1', name: 'temphome', userTypes: [1, 2, 3], keep: true, all: true, module: 'all' },
  { title: '风险专家', icon: 'iconfengxianzhuanjia', name: 'riskExperts', key: '7', userTypes: [1, 3], keep: false, defaultRedirect: true, module: 'riskExperts' },
  { title: '客户卫士', icon: 'iconkehuweishi', name: 'customerGuard', key: '4', userTypes: [1, 3], keep: false, defaultRedirect: true, module: 'customerGuard' },
  { title: '开发商评估', icon: 'iconkaifashang', name: 'realestate', key: '6', userTypes: [1, 3], keep: false, defaultRedirect: true, module: 'realestate' },
  { title: '订货大师', icon: 'icondinghuodashi', name: 'supplyChain', otherNames: ['Identify'], key: '3', userTypes: [1, 2, 3], keep: true, module: 'supplyChain' },
  { title: '赊销管家', icon: 'iconshexiaoguanjia', name: 'creditSystem', key: '2', userTypes: [1, 3], keep: false, defaultRedirect: true, module: 'creditSystem' },
  { title: '应收管家', icon: 'icona-bianzu25', name: 'receiveAdmin', key: '5', userTypes: [1, 3], keep: false, defaultRedirect: true, module: 'receiveAdmin' },
  { title: '厂家服务平台', icon: 'iconchangjiafuwu', name: 'factoryService', key: '0', userTypes: [1, 3], keep: false, defaultRedirect: true, module: 'factoryService' },
]
// 开放平台配置
export const openPLat: appTypes = {
  title: '系统设置', // 开发平台改名为系统设置
  icon: 'iconkaifangpingtai',
  name: 'openPlat',
  key: 'open',
  module: 'common'
}
// 子应用标识，作为区分子应用和saas2平台依据
export const childAppNames: string[] = [
  'creditSystem',
  'supplyChain',
  'customerGuard',
  'factoryService',
  // 开放平台
  'openPlat',
  // 应收管家
  'receiveAdmin',
  'realestate',
  'riskExperts'
]
// 开发平台菜单数据
export const open: Array<menuTypes> = [{
  subMenu: [
    {
      name: '开发者模式',
      menuTag: 'open_platform_developer',
      subMenu: null,
      permissionCode: 'PTN:SUPPLIER:FLOW_UPLOAD:MANAGE'
    },
    {
      name: '三方应用',
      menuTag: 'supplier_menu_openplat_api',
      subMenu: null,
      permissionCode: 'PTN:SUPPLIER:THIRD_APPLICATION:MANAGE'
    },
    {
      name: '系统日志管理',
      menuTag: 'supplier_menu_openplat_log',
      subMenu: null,
      permissionCode: 'PTN:SUPPLIER:SYSTEM_LOG:MANAGE'
    },
    {
      name: '基础设置',
      menuTag: 'open_platform_base',
      subMenu: null,
      permissionCode: 'PTN:SUPPLIER:CHAIN_SET_BASE'
    },
    {
      name: '字典配置',
      menuTag: 'basic_setting_dictionary',
      subMenu: null,
      permissionCode: 'PTN:SUPPLIER:CHAIN_SET_DICT'
    },
    {
      name: '流程配置',
      menuTag: 'open_platform_process_config',
      subMenu: null,
      permissionCode: 'PTN:SUPPLIER:OPEN:PLATFORM:PROCESS:CONFIG'
    }
  ]
}]
// 订货大师-客户版-菜单
export const supplyMenu: Array<menuTypes> = [
  {
    subMenu: [
      { name: '订单管理', menuTag: 'supply_chain_dealer_order', permissionCode: 'PTN:SUPPLIER:CHAIN_ORDER:MANAGE', subMenu: null }
    ]
  }
]
