const CreditSystem = () => import(/* webpackChunkName: "group-index" */ '@/views/creditSystem/index.vue')
// 操作指引
const Guide = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/Guide/index.vue')
// 还款日历
const RepayCalendar = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/RepayCalendar/index.vue')
// 额度管理
const Quota = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/Quota/index.vue')
const QuotaDetail = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/Quota/detail/index.vue')
const QuotaEdit = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/Quota/edit/index.vue')
// ----------------- 用信管理 ------------------------------
// 用信单列表
const UseCredit = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/UseCredit')
const UseCreditDetail = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/UseCredit/detail')
const UseRecord = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/UseCredit/record/index.vue')
// 还款单列表
const RepayMent = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/RepayMent/index.vue')
const RepayMentDetail = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/RepayMent/detail/index.vue')
const RepayMentRecord = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/RepayMent/record/index.vue')
// 还款操作
const CreditOperate = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/CreditOperate/index.vue')
// ----------------- 用信管理 ------------------------------
// 赊销工作台
const CreditOverview = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/CreditOverview')
// 业务操作-新建用信单
const CreateUseCredit = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/UseCredit/createUseCredit')
// 业务操作-新建还款单
const CreateRePayMent = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/RepayMent/createRePayMent')
// 发起授信/新建用信/新建还款成功页
const SuccessPage = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/SuccessPage')
// ----------------------------- 授信设置 -----------------------------
// 赊销类型配置
const CreditType = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/SetConfig/creditType')
// 赊销额度配置
const CreditMoney = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/SetConfig/creditMoney/index.vue')
// 营销规则配置
const CreditRule = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/SetConfig/creditRule')
// 风险防范配置
const CreditRisk = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/SetConfig/creditRisk')
// 审批材料配置
const CreditApprove = () => import(/* webpackChunkName: "creditSystem" */ '@/views/creditSystem/SetConfig/creditApprove')
// ----------------------------- 授信设置 -----------------------------

const pages = [
  // 操作指引
  { path: 'guide', name: 'Guide', components: { default: Guide }, meta: { menuTag: 'credit_system_guide', hasMenuTag: true, crumbs: ['赊销管家', '操作指引'] } },
  // 还款日历
  { path: 'repayCalendar', name: 'repayCalendar', components: { default: RepayCalendar }, meta: { menuTag: 'credit_system_calendar', hasMenuTag: true, crumbs: ['赊销管家', '赊销查询', '还款日历'] } },
  // 额度管理
  { path: 'quota/list', name: 'quota', components: { default: Quota }, meta: { menuTag: 'credit_system_quota', hasMenuTag: true, crumbs: ['赊销管家', '赊销查询', '授信列表'] } },
  { path: 'quota/list/:id', name: 'quotaDetail', components: { default: QuotaDetail }, meta: { menuTag: 'credit_system_quota', hasMenuTag: false, crumbs: ['赊销管家', '赊销查询', '授信列表', '额度详情'] } },
  { path: 'creditCreate', name: 'QuotaAdd', components: { default: QuotaEdit }, meta: { menuTag: 'credit_system_launch_add', hasMenuTag: true, crumbs: ['赊销管家', '业务操作', '发起授信'] } },
  { path: 'creditCreate/:id', name: 'QuotaEdit', components: { default: QuotaEdit }, meta: { menuTag: 'credit_system_launch_add', hasMenuTag: false, crumbs: ['赊销管家', '授信管理', '修改授信'] } },
  // 用信单列表
  { path: 'useCredit/list', name: 'useCredit', components: { default: UseCredit }, meta: { menuTag: 'credit_system_use_credit', hasMenuTag: true, crumbs: ['赊销管家', '赊销查询', '用信单列表'] } },
  { path: 'useCredit/list/:id', name: 'useCreditDetail', components: { default: UseCreditDetail }, meta: { menuTag: 'credit_system_use_credit', hasMenuTag: false, crumbs: ['赊销管家', '赊销查询', '用信单列表', '用信详情'] } },
  { path: 'useCredit/record', name: 'useRecord', components: { default: UseRecord }, meta: { menuTag: 'credit_system_use_credit', hasMenuTag: false, crumbs: ['赊销管家', '赊销查询', '用信单列表', '批量处理记录'] } },
  // 还款单列表
  { path: 'repayment/list', name: 'repayMent', components: { default: RepayMent }, meta: { menuTag: 'credit_system_repayment', hasMenuTag: true, crumbs: ['赊销管家', '赊销查询', '还款单列表'] } },
  { path: 'repayment/list/:id', name: 'repayMentDetail', components: { default: RepayMentDetail }, meta: { menuTag: 'credit_system_repayment', hasMenuTag: false, crumbs: ['赊销管家', '赊销查询', '还款单列表', '还款详情'] } },
  { path: 'repayment/record', name: 'repayMentRecord', components: { default: RepayMentRecord }, meta: { menuTag: 'credit_system_repayment', hasMenuTag: false, crumbs: ['赊销管家', '赊销查询', '还款单列表', '批量处理记录'] } },
  // 还款操作
  { path: 'creditOperate', name: 'creditOperate', components: { default: CreditOperate }, meta: { menuTag: 'supplier_saascredit_operate_manage', hasMenuTag: true, crumbs: ['赊销管家', '业务操作', '还款操作'] } },
  // 赊销工作台
  { path: 'creditOverview', name: 'creditOverview', components: { default: CreditOverview }, meta: { menuTag: 'credit_system_overview', hasMenuTag: true, crumbs: ['赊销管家', '赊销工作台'] } },
  // 业务操作-新建用信单
  { path: 'createUseCredit', name: 'createUseCredit', components: { default: CreateUseCredit }, meta: { menuTag: 'credit_system_create_use', hasMenuTag: true, crumbs: ['赊销管家', '业务操作', '新建用信单'] } },
  // 业务操作-新建还款单
  { path: 'createRePayMent', name: 'createRePayMent', components: { default: CreateRePayMent }, meta: { menuTag: 'credit_system_create_pay', hasMenuTag: true, crumbs: ['赊销管家', '业务操作', '新建还款单'] } },
  // 发起授信成功页
  { path: 'creditSuccess', name: 'creditSuccess', components: { default: SuccessPage }, meta: { menuTag: 'credit_system_launch_add', hasMenuTag: false, crumbs: ['赊销管家', '授信申请'] } },
  // 新建用信成功页
  { path: 'useCreditSuccess', name: 'useCreditSuccess', components: { default: SuccessPage }, meta: { menuTag: 'credit_system_create_use', hasMenuTag: false, crumbs: ['赊销管家', '新建用信单'] } },
  // 新建还款成功页
  { path: 'usePaySuccess', name: 'usePaySuccess', components: { default: SuccessPage }, meta: { menuTag: 'credit_system_create_pay', hasMenuTag: false, crumbs: ['赊销管家', '新建还款单'] } },
  // ----------------------------- 授信设置 -----------------------------
  // 赊销类型配置
  { path: 'creditType', name: 'creditType', components: { default: CreditType }, meta: { menuTag: 'credit_system_type_setting', hasMenuTag: true, crumbs: ['赊销管家', '授信设置', '赊销类型配置'] } },
  // 赊销额度配置
  { path: 'creditMoney', name: 'creditMoney', components: { default: CreditMoney }, meta: { menuTag: 'credit_system_limit_setting', hasMenuTag: true, crumbs: ['赊销管家', '授信设置', '赊销额度配置'] } },
  // 营销规则配置
  { path: 'creditRule', name: 'creditRule', components: { default: CreditRule }, meta: { menuTag: 'credit_system_rule_setting', hasMenuTag: true, crumbs: ['赊销管家', '授信设置', '营销规则配置'] } },
  // 风险防范配置
  { path: 'creditRisk', name: 'creditRisk', components: { default: CreditRisk }, meta: { menuTag: 'credit_system_risk_setting', hasMenuTag: true, crumbs: ['赊销管家', '授信设置', '风险防范配置'] } },
  // 审批材料配置
  { path: 'creditApprove', name: 'creditApprove', components: { default: CreditApprove }, meta: { menuTag: 'credit_system_approve_setting', hasMenuTag: true, crumbs: ['赊销管家', '授信设置', '审批材料配置'] } },
  // ----------------------------- 授信设置 -----------------------------
]

export default {
  module: 'creditSystem',
  children: [{
    name: 'creditSystem',
    path: 'creditSystem',
    redirect: { name: 'Guide' },
    component: CreditSystem,
    children: pages
  }]
}
