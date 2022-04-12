const BillingManage = () => import('@/views/SupplyChain/Factory/Billing/BillingList')
const BillingDetail = () => import('@/views/SupplyChain/Factory/Billing/BillingDetail')

const pages = [
  { path: 'billing/list', name: 'billingManage', components: { default: BillingManage }, meta: { menuTag: 'supply_chain_billing', hasMenuTag: true, crumbs: ['订货大师', '开票管理'] } },
  { path: 'billing/detail', name: 'billingDetail', components: { default: BillingDetail }, meta: { menuTag: 'supply_chain_billing', crumbs: ['订货大师', '开票管理', '发票详情'] } },
]

export default pages
