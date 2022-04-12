// const BackLog = () => import(/* webpackChunkName: "group-common" */ '@/views/common/Process/BackLog')
const ProecessList = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/ProcessList/main')
const CreditStart = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/CreditStart')
const CreditRepay = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/CreditRepay')
const CreditPayCycle = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/CreditPayCycle/index.vue')
// 还款审批
const StillMoney = () => import('@/views/common/process/StillMoney/index.vue')
const ExportProcess = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/ExportProcess/index.vue')
// 催收-回款审批
const CollectionPayment = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/CollectionPayment/index.vue')
// 修改授信审批流程
const ChangeCredit = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/changeCredit/index.vue')
// 失效授信流程
const ExporedCredit = () => import(/* webpackChunkName: "group-sale" */ '@/views/common/process/expiredCredit/index.vue')

const pages = [
  // 发起流程
  { path: 'process/backLog', name: 'backLog', components: { default: ProecessList }, meta: { permissionCode: 'PTN:SUPPLIER:FLOW_TODO:MANAGE', hasMenuTag: true, crumbs: ['我的任务', '我的待办事项'] } },
  { path: 'process/handleEnd', name: 'handleEnd', components: { default: ProecessList }, meta: { permissionCode: 'PTN:SUPPLIER:FLOW_DONE:MANAGE', hasMenuTag: true, crumbs: ['我的任务', '我的办结事项'] } },
  // 审批分类
  { path: 'process/backLog/creditStart', name: 'backLog_creditApply', components: { default: CreditStart }, meta: { hasMenuTag: false, crumbs: ['我的待办', '授信申报'] } },
  { path: 'process/handleEnd/creditStart', name: 'handleEnd_creditApply', components: { default: CreditStart }, meta: { hasMenuTag: false, crumbs: ['我的办结', '授信申报'] } },
  { path: 'process/backLog/creditRepay', name: 'backLog_clearingProcess', components: { default: CreditRepay }, meta: { hasMenuTag: false, crumbs: ['我的待办', '收款审批'] } },
  { path: 'process/handleEnd/creditRepay', name: 'handleEnd_clearingProcess', components: { default: CreditRepay }, meta: { hasMenuTag: false, crumbs: ['我的办结', '收款审批'] } },
  { path: 'process/backLog/creditPayCycle', name: 'backLog_saasPeriodDays', components: { default: CreditPayCycle }, meta: { hasMenuTag: false, crumbs: ['我的待办', '还款周期修改审批'] } },
  { path: 'process/handleEnd/creditPayCycle', name: 'handleEnd_saasPeriodDays', components: { default: CreditPayCycle }, meta: { hasMenuTag: false, crumbs: ['我的办结', '还款周期修改审批'] } },
  // 还款审批
  { path: 'process/backLog/stillMoney', name: 'backLog_creditRepayment', components: { default: StillMoney }, meta: { hasMenuTag: false, crumbs: ['我的待办', '还款审批'] } },
  { path: 'process/handleEnd/stillMoney', name: 'handleEnd_creditRepayment', components: { default: StillMoney }, meta: { hasMenuTag: false, crumbs: ['我的办结', '还款审批'] } },
  { path: 'process/backLog/dataExport', name: 'backLog_dataExport', components: { default: ExportProcess }, meta: { hasMenuTag: false, crumbs: ['我的待办', '数据导出审批'] } },
  { path: 'process/handleEnd/dataExport', name: 'handleEnd_dataExport', components: { default: ExportProcess }, meta: { hasMenuTag: false, crumbs: ['我的办结', '数据导出审批'] } },
  // 催收-回款审批
  { path: 'process/backLog/collectionPayment', name: 'backLog_collectionPayment', components: { default: CollectionPayment }, meta: { hasMenuTag: false, crumbs: ['我的待办', '回款审批'] } },
  { path: 'process/handleEnd/collectionPayment', name: 'handleEnd_collectionPayment', components: { default: CollectionPayment }, meta: { hasMenuTag: false, crumbs: ['我的办结', '回款审批'] } },
  // 变更授信
  { path: 'process/backLog/changeCredit', name: 'backLog_saasCreditAccountChange', components: { default: ChangeCredit }, meta: { hasMenuTag: false, crumbs: ['我的待办', '修改授信额度流程'] } },
  { path: 'process/handleEnd/changeCredit', name: 'handleEnd_saasCreditAccountChange', components: { default: ChangeCredit }, meta: { hasMenuTag: false, crumbs: ['我的办结', '修改授信额度流程'] } },
  // 失效授信
  { path: 'process/backLog/expiredCredit', name: 'backLog_saasCreditAccountInvalid', components: { default: ExporedCredit }, meta: { hasMenuTag: false, crumbs: ['我的待办', '失效授信额度流程'] } },
  { path: 'process/handleEnd/expiredCredit', name: 'handleEnd_saasCreditAccountInvalid', components: { default: ExporedCredit }, meta: { hasMenuTag: false, crumbs: ['我的办结', '失效授信额度流程'] } },
]

export default pages
