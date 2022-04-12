const OpenPlatApi = () => import(/* webpackChunkName: "group-openPlat" */ '@/views/common/openPlat/api/index')
const OpenPlatLog = () => import(/* webpackChunkName: "group-openPlat" */ '@/views/common/openPlat/log/index')
const Developer = () => import(/* webpackChunkName: "group-openPlat" */ '@/views/common/openPlat/developer/index')
const DictConfig = () => import(/* webpackChunkName: "group-openPlat" */ '@/views/common/openPlat/dictConfig/index.vue')
const SetBase = () => import(/* webpackChunkName: "group-openPlat" */ '@/views/common/openPlat/setBase/index.vue')
const ProcessConfigHome = () => import(/* webpackChunkName: "group-openPlat" */ '@/views/common/processConfig/ProcessConfigHome/index')
const ProcessConfigEdit = () => import(/* webpackChunkName: "group-openPlat" */ '@/views/common/processConfig/ProcessConfigEdit/index.vue')

export default [
  { path: 'developer', name: 'developer', components: { default: Developer }, meta: { menuTag: 'open_platform_developer', hasMenuTag: true, crumbs: ['系统设置', '开发者模式'] } },
  { path: 'api', name: 'OpenPlatApi', components: { default: OpenPlatApi }, meta: { menuTag: 'supplier_menu_openplat_api', hasMenuTag: true, crumbs: ['系统设置', '三方应用'] } },
  { path: 'log', name: 'OpenPlatLog', components: { default: OpenPlatLog }, meta: { menuTag: 'supplier_menu_openplat_log', hasMenuTag: true, crumbs: ['系统设置', '系统日志管理'] } },
  { path: 'dictConfig', name: 'dictConfig', components: { default: DictConfig }, meta: { menuTag: 'basic_setting_dictionary', hasMenuTag: true, crumbs: ['系统设置', '字典配置'] } },
  { path: 'setBase', name: 'setBase', components: { default: SetBase }, meta: { menuTag: 'open_platform_base', hasMenuTag: true, crumbs: ['系统设置', '基础设置'] } },
  // 审批流程配置页
  {
    path: 'processConfigEdit',
    name: 'processConfigEdit',
    components: { default: ProcessConfigEdit },
    meta: {
      menuTag: 'open_platform_process_config',
      hasMenuTag: true,
      crumbs: ['系统设置', '审批流程配置']
    }
  },
  // 审批流程配置主页
  {
    path: 'processConfigHome',
    name: 'processConfigHome',
    components: { default: ProcessConfigHome },
    meta: {
      menuTag: 'open_platform_process_config',
      hasMenuTag: true,
      crumbs: ['系统设置', '审批流程配置']
    }
  },
]
