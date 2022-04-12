const ReceiveAdmin = () => import(/* webpackChunkName: "group-index" */ '@/views/receiveAdmin/index.vue')
// 应收工作台
const WorkSpace = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/workSpace/index.vue')
// 添加计划
const AddPlain = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/addPlain/index.vue')
const PlainForm = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/addPlain/plainForm/index.vue')
// 添加收款
const AddPay = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/addPay/index.vue')
const Detail = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/addPay/detail')
// 应收信息查询
const InfoSearch = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/infoSearch/index.vue')
const InforSearchDetail = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/infoSearch/detail/index.vue')
// 企业应收查询
const ComInfo = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/comInfo/index.vue')
const ComInfoDetail = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/comInfo/detail/index.vue')
// 应收系统配置
const SystemConfig = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/systemConfig/index.vue')
// 催收概览
const Collection = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/collection/overview/index.vue')
const CollectionDetail = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/collection/overview/detail')
const CreateCollection = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/collection/overview/createRecord/index.vue')
const CreatePaymentRecord = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/collection/overview/paymentRecord/index.vue')
// 催收策略配置
const Configuration = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/collection/configuration/index.vue')
// 款项信息查询
const PayInfo = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/payInfo/index.vue')
// 款项信息查询 - 详情
const PayInfoDetail = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/payInfo/detail/index.vue')
// 收款信息查询
const ReceiveInfo = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/receiveInfo/index.vue')
// 逾期信息查询
const OverInfo = () => import(/* webpackChunkName: "receiveAdmin" */ '@/views/receiveAdmin/overInfo/index.vue')

const pages = [
  // 应收工作台
  { path: 'workSpace', name: 'WorkSpace', component: WorkSpace, meta: { menuTag: 'receivable_management_workbench', hasMenuTag: true, crumbs: ['应收管家', '应收工作台'] } },
  // 添加计划
  { path: 'addPlain', name: 'AddPlain', component: AddPlain, meta: { menuTag: 'receivable_plan_management', hasMenuTag: true, crumbs: ['应收管家', '添加计划'] } },
  { path: 'plainForm', name: 'PlainForm', component: PlainForm, meta: { menuTag: 'receivable_plan_management', hasMenuTag: false, crumbs: ['应收管家', '添加应收计划'] } },
  // 添加收款
  { path: 'addPay', name: 'AddPay', component: AddPay, meta: { menuTag: 'receivable_payment_management', hasMenuTag: true, crumbs: ['应收管家', '添加收款'] } },
  { path: 'payDetail', name: 'PayDetail', component: Detail, meta: { menuTag: 'receivable_payment_management', hasMenuTag: false, crumbs: ['应收管家', '收款'] } },
  // 应收信息查询
  { path: 'infoSearch', name: 'InfoSearch', component: InfoSearch, meta: { menuTag: 'receivable_search_management', hasMenuTag: true, crumbs: ['应收管家', '应收信息查询'] } },
  { path: 'infoSearch/detail', name: 'InforSearchDetail', component: InforSearchDetail, meta: { menuTag: 'receivable_search_management', hasMenuTag: false, crumbs: ['应收管家', '计划详情'] } },
  // 企业应收查询
  { path: 'comInfo', name: 'ComInfo', component: ComInfo, meta: { menuTag: 'receivable_comInfo_management', hasMenuTag: true, crumbs: ['应收管家', '企业应收查询'] } },
  { path: 'comInfo/detail', name: 'ComInfoDetail', component: ComInfoDetail, meta: { menuTag: 'receivable_comInfo_management', hasMenuTag: false, crumbs: ['应收管家', '企业应收查询', '详情'] } },
  // 应收系统配置
  { path: 'systemConfig', name: 'SystemConfig', component: SystemConfig, meta: { menuTag: 'receivable_config_management', hasMenuTag: true, crumbs: ['应收管家', '应收系统配置'] } },
  // 催收概览
  { path: 'collection/list', name: 'Collection', components: { default: Collection }, meta: { menuTag: 'receivable_collection_management', hasMenuTag: true, crumbs: ['催收管理', '催收概览'] } },
  { path: 'collection/detail', name: 'CollectionDetail', components: {default: CollectionDetail }, meta: { menuTag: 'receivable_collection_management', hasMenuTag: false, crumbs: ['催收管理', '催收概览', '查看'] } },
  { path: 'collection/create', name: 'CreateCollection', components: { default: CreateCollection }, meta: { menuTag: 'receivable_collection_management', hasMenuTag: false, crumbs: ['催收管理', '催收概览', '添加记录'] } },
  { path: 'collection/createPayment', name: 'CreateCollecttonPayment', components: { default: CreatePaymentRecord }, meta: { menuTag: 'receivable_collection_management', hasMenuTag: false, crumbs: ['催收管理', '催收概览', '阶段回款记录'] } },
  // 催收策略配置
  { path: 'collection/configuration', name: 'collectionConfiguration', components: { default: Configuration }, meta: { menuTag: 'receivable_collection_strategy', hasMenuTag: true, crumbs: ['催收管理', '催收策略'] } },
  // 款项信息查询
  { path: 'payInfo', name: 'payInfo', components: { default: PayInfo }, meta: { menuTag: 'payment_search_management', hasMenuTag: true, crumbs: ['催收管理', '款项信息查询'] } },
  // 款项信息查询 - 详情
  { path: 'payInfo/detail', name: 'payInfoDetail', components: { default: PayInfoDetail }, meta: { menuTag: 'payment_search_management', hasMenuTag: false, crumbs: ['催收管理', '款项信息查询', '详情'] } },
  // 收款信息查询
  { path: 'receiveInfo', name: 'receiveInfo', components: { default: ReceiveInfo }, meta: { menuTag: 'collection_search_management', hasMenuTag: true, crumbs: ['催收管理', '收款信息查询'] } },
  // 逾期信息查询
  { path: 'overInfo', name: 'overInfo', components: { default: OverInfo }, meta: { menuTag: 'overdue_search_management', hasMenuTag: true, crumbs: ['催收管理', '逾期信息查询'] } },
]

export default {
  module: 'receiveAdmin',
  children: [
    {
      name: 'receiveAdmin',
      path: 'receiveAdmin',
      component: ReceiveAdmin,
      children: pages
    }
  ]
}
