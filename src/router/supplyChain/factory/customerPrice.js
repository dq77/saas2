const CustomerPriceList = () => import('@/views/SupplyChain/Factory/CustomerPrice/CustomerPriceList/index.vue')
const CustomerPriceCreate = () => import('@/views/SupplyChain/Factory/CustomerPrice/CustomerPriceCreate/index.vue')
// 批量导入
const BatchImport = () => import('@/views/SupplyChain/Factory/Components/BatchImport/index.vue')

const pages = [
  { path: 'customerPrice/list', name: 'customerPriceList', components: { default: CustomerPriceList }, meta: { menuTag: 'supply_chain_customer_price', hasMenuTag: true, crumbs: ['订货大师', '客户价格', '客户列表'] } },
  { path: 'customerPrice/detail', name: 'customerPriceDetail', components: { default: CustomerPriceCreate }, meta: { menuTag: 'supply_chain_customer_price', crumbs: ['订货大师', '客户价格', '查看客户价格'] } },
  { path: 'customerPrice/edit', name: 'customerPriceEdit', components: { default: CustomerPriceCreate }, meta: { menuTag: 'supply_chain_customer_price', crumbs: ['订货大师', '客户价格', '编辑客户价格'] } },
  { path: 'customerPrice/import', name: 'customerPriceImport', components: { default: BatchImport }, meta: { menuTag: 'supply_chain_customer_price', crumbs: ['订货大师', '产品管理', '导入客户价格列表'] } },
]

export default pages
