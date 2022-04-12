import orderRoutes from './order'
import deliverRoutes from './deliver'
import reverseOrderRoutes from './reverseOrder'
import billingRoutes from './billing'
import projectPriceRoutes from './projectPrice'
import customerPriceRoutes from './customerPrice'
import priceStrategyRoutes from './priceStrategy'
import productRoutes from './product'
import smartContractRoutes from './smartContract'
// 财务管理
import financeRoutes from './finance'
import warehouseRoutes from './warehouse'
// 营销活动
import marketingRoutes from './marketing'

const Guide = () => import('@/views/SupplyChain/Factory/Guide/index.vue')
const BaseConfig = () => import('@/views/SupplyChain/Factory/BaseConfig/index.vue')
const Workbench = () => import('@/views/SupplyChain/Factory/Workbench/index.vue')

export default [
  { path: 'guide', name: 'orderGuide', components: { default: Guide }, meta: { menuTag: 'supply_chain_guide', hasMenuTag: true, crumbs: ['订货大师', '操作指引'] } },
  { path: 'baseConfig', name: 'baseConfig', components: { default: BaseConfig }, meta: { menuTag: 'supply_chain_base_config', hasMenuTag: true, crumbs: ['订货大师', '基础配置'] } },
  { path: 'workbench', name: 'workbench', components: { default: Workbench }, meta: { menuTag: 'supply_chain_workbench', hasMenuTag: true, crumbs: ['订货大师', '工作台'] } },
  ...orderRoutes,
  ...deliverRoutes,
  ...reverseOrderRoutes,
  ...billingRoutes,
  ...projectPriceRoutes,
  ...customerPriceRoutes,
  ...priceStrategyRoutes,
  ...productRoutes,
  ...smartContractRoutes,
  ...financeRoutes,
  ...warehouseRoutes,
  ...marketingRoutes
]
