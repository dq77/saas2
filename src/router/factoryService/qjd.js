const QuotaMarket = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/creditView')
const OrderSearch = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/order/list/index')
const White = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/whiteManage/list')
const repaymentList = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/repayment/list')
const CreditSearch = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/credit/list')
const RiskCooperateList = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/riskCooperate/list')
const LoanSearch = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/loan/list')
const RefundDeductionList = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/refund/list')
const LoanListDetail = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/refund/listDetail/loan')
const RefundListDetail = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/qjd/refund/listDetail/refund')

const pages = [
  { path: 'qjd/creditView', name: 'quotaMarket', components: { default: QuotaMarket }, meta: { menuTag: 'qjd_credit_view', hasMenuTag: true, crumbs: ['厂家服务平台', '仟金顶协同', '赊销政策总览'] } },
  { path: 'qjd/order/list', name: 'orderSearch', components: { default: OrderSearch }, meta: { menuTag: 'qjd_order', hasMenuTag: true, crumbs: ['厂家服务平台', '仟金顶协同', '订单查询'] } },
  { path: 'qjd/whiteManage/list', name: 'whiteLead', components: { default: White }, meta: { menuTag: 'qjd_white_list', hasMenuTag: true, crumbs: ['厂家服务平台', '仟金顶协同', '白名单管理'] } },
  { path: 'qjd/repayment/list', name: 'repaymentList', components: { default: repaymentList }, meta: { menuTag: 'qjd_repayment', hasMenuTag: true, crumbs: ['厂家服务平台', '仟金顶协同', '履约管理'] } },
  { path: 'qjd/credit/list', name: 'creditSearch', components: { default: CreditSearch }, meta: { menuTag: 'qjd_credit', hasMenuTag: true, crumbs: ['厂家服务平台', '仟金顶协同', '赊销政策明细'] } },
  { path: 'qjd/riskCooperate/list', name: 'riskCooperateList', components: { default: RiskCooperateList }, meta: { menuTag: 'qjd_risk', hasMenuTag: true, crumbs: ['厂家服务平台', '仟金顶协同', '风控协同'] } },
  { path: 'qjd/loan/list', name: 'loanSearch', components: { default: LoanSearch }, meta: { menuTag: 'qjd_loan', hasMenuTag: true, crumbs: ['厂家服务平台', '仟金顶协同', '支付查询'] } },
  {
    path: 'qjd/refund/list',
    name: 'RefundDeductionList',
    components: {
      default: RefundDeductionList
    },
    meta: {
      menuTag: 'refund_money_transform',
      hasMenuTag: true,
      crumbs: ['厂家服务平台', '仟金顶协同', '抵扣查询']
    }
  },
  {
    path: 'qjd/refund/loanListDetail',
    name: 'LoanListDetail',
    components: {
      default: LoanListDetail
    },
    meta: {
      menuTag: 'refund_money_transform',
      hasMenuTag: false,
      crumbs: ['厂家服务平台', '仟金顶协同', '抵扣查询']
    }
  },
  {
    path: 'qjd/refund/refundListDetail',
    name: 'RefundListDetail',
    components: {
      default: RefundListDetail
    },
    meta: {
      menuTag: 'refund_money_transform',
      hasMenuTag: false,
      crumbs: ['厂家服务平台', '仟金顶协同', '抵扣查询']
    }
  },
]

export default pages
