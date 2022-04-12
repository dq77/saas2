const DeliverManage = () => import('@/views/SupplyChain/Factory/Deliver/DeliverList')
const DeliverDetailOld = () => import('@/views/SupplyChain/Factory/Deliver/DeliverDetail')
const DeliverOrderList = () => import('@/views/SupplyChain/Factory/Deliver/DeliverOrderList')
const DeliverEdit = () => import('@/views/SupplyChain/Factory/Deliver/Edit/index')
const DeliverDetail = () => import('@/views/SupplyChain/Factory/Deliver/Detail/index')

const pages = [
  { path: 'deliver/list', name: 'deliveryManage', components: { default: DeliverManage }, meta: { menuTag: 'supply_chain_deliver', hasMenuTag: true, crumbs: ['订货大师', '发货管理'] } },
  { path: 'deliver/detailOld', name: 'deliverDetailOld', components: { default: DeliverDetailOld }, meta: { menuTag: 'supply_chain_deliver', crumbs: ['订货大师', '发货管理', '发货详情'] } },
  { path: 'deliver/orderList', name: 'deliverOrderList', components: { default: DeliverOrderList }, meta: { menuTag: 'supply_chain_deliver', crumbs: ['订货大师', '发货管理', '选择订单'] } },
  { path: 'deliver/create', name: 'deliverCreate', components: { default: DeliverEdit }, meta: { menuTag: 'supply_chain_deliver', crumbs: ['订货大师', '发货管理', '新建发货'] } },
  { path: 'deliver/edit', name: 'deliverEdit', components: { default: DeliverEdit }, meta: { menuTag: 'supply_chain_deliver', crumbs: ['订货大师', '发货管理', '编辑发货'] } },
  { path: 'deliver/detail', name: 'deliverDetail', components: { default: DeliverDetail }, meta: { menuTag: 'supply_chain_deliver', crumbs: ['订货大师', '发货管理', '发货详情'] } },
]

export default pages
