// 帮助中心
const operationManual = () => import('@/views/common/helpCenter/operationManual')
const CreditHelp = () => import('@/views/common/helpCenter/operationManual/creditHelp/index.md')
const commonQuestion = () => import('@/views/common/helpCenter/commonQuestion')
const customerQuestion = () => import('@/views/common/helpCenter/commonQuestion/customerQuestion/index.md')
const orderQuestion = () => import('@/views/common/helpCenter/commonQuestion/orderQuestion/index.md')

const pages = [
  { path: 'operationManual', name: 'operationManual', components: { default: operationManual }, meta: { crumbs: ['操作手册'] } },
  { path: 'operationManual/creditHelp', name: 'creditHelp', components: { default: CreditHelp }, meta: { crumbs: ['操作手册', '赊销管理'] } },
  { path: 'commonQuestion', name: 'commonQuestion', components: { default: commonQuestion }, meta: { crumbs: ['常见问题'] } },
  { path: 'commonQuestion/customerQuestion', name: 'customerQuestion', components: { default: customerQuestion }, meta: { crumbs: ['常见问题', '客户卫士'] } },
  { path: 'commonQuestion/orderQuestion', name: 'orderQuestion', components: { default: orderQuestion }, meta: { crumbs: ['常见问题', '订货大师'] } },
]

export default pages
