const ReverseOrderList = () => import('@/views/SupplyChain/Factory/ReverseOrder/ReverseOrderList')
const ReverseOrderDetail = () => import('@/views/SupplyChain/Factory/ReverseOrder/ReverseOrderDetail')

const pages = [
  { path: 'reverseOrder/list', name: 'reverseOrderList', components: { default: ReverseOrderList }, meta: { menuTag: 'supply_chain_reverse', hasMenuTag: true, crumbs: ['订货大师', '退货管理'] } },
  { path: 'reverseOrder/detail', name: 'reverseOrderderDetail', components: { default: ReverseOrderDetail }, meta: { menuTag: 'supply_chain_reverse', crumbs: ['订货大师', '退货管理', '退货详情'] } },
]

export default pages
