const OrderManage = () => import('@/views/SupplyChain/Dealer/Order/index')
const OrderDetail = () => import('@/views/SupplyChain/Dealer/Order/Detail/index')
const OrderEdit = () => import('@/views/SupplyChain/Dealer/Order/Edit/index')
const OrderLogistics = () => import('@/views/SupplyChain/Dealer/Order/Logistics/index')

const pages = [
  { path: 'order/list', name: 'dealerOrderManage', components: { default: OrderManage }, meta: { menuTag: 'supply_chain_dealer_order', hasMenuTag: true, crumbs: ['订货大师', '订单管理'] } },
  { path: 'order/create', name: 'dealerOrderCreate', components: { default: OrderEdit }, meta: { menuTag: 'supply_chain_dealer_order', crumbs: ['订货大师', '订单管理', '订单创建'] } },
  { path: 'order/detail', name: 'dealerOrderDetail', components: { default: OrderDetail }, meta: { menuTag: 'supply_chain_dealer_order', crumbs: ['订货大师', '订单管理', '订单详情'] } },
  { path: 'order/logistic', name: 'dealerOrderLogistics', components: { default: OrderLogistics }, meta: { menuTag: 'supply_chain_dealer_order', crumbs: ['订货大师', '订单管理', '物流详情'] } },
]

export default pages
