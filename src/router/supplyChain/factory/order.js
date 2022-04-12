const OrderManage = () => import('@/views/SupplyChain/Factory/Order/index')
const Edit = () => import('@/views/SupplyChain/Factory/Order/Edit/index')
const Detail = () => import('@/views/SupplyChain/Factory/Order/Detail/index')
const OrderLogistics = () => import('@/views/SupplyChain/Factory/Order/Logistics/index')

const pages = [
  { path: 'order/list', name: 'orderManage', components: { default: OrderManage }, meta: { menuTag: 'supply_chain_order', hasMenuTag: true, crumbs: ['订货大师', '订单管理'] } },
  { path: 'order/logistic', name: 'orderLogistics', components: { default: OrderLogistics }, meta: { menuTag: 'supply_chain_order', crumbs: ['订货大师', '订单管理', '物流详情'] } },
  { path: 'order/create', name: 'orderCreate', components: { default: Edit }, meta: { menuTag: 'supply_chain_order', crumbs: ['订货大师', '订单管理', '订单创建'] } },
  { path: 'order/edit', name: 'orderEdit', components: { default: Edit }, meta: { menuTag: 'supply_chain_order', crumbs: ['订货大师', '订单管理', '订单编辑'] } },
  { path: 'order/detail', name: 'orderDetail', components: { default: Detail }, meta: { menuTag: 'supply_chain_order', crumbs: ['订货大师', '订单管理', '订单详情'] } },
  { path: 'order/audit', name: 'orderAudit', components: { default: Detail }, meta: { menuTag: 'supply_chain_order', crumbs: ['订货大师', '订单管理', '订单审核'] } },
]

export default pages
