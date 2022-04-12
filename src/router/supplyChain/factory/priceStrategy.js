const PriceStrategy = () => import('@/views/SupplyChain/Factory/PriceStrategy/index.vue')
const StrategyConfig = () => import('@/views/SupplyChain/Factory/PriceStrategy/config.vue')

const pages = [
  { path: 'pricestrategy', name: 'PriceStrategy', components: { default: PriceStrategy }, meta: { menuTag: 'supply_chain_price_strategy', hasMenuTag: true, crumbs: ['订货大师', '价格策略'] } },
  { path: 'pricestrategy/config', name: 'StrategyConfig', components: { default: StrategyConfig }, meta: { menuTag: 'supply_chain_price_strategy', crumbs: ['订货大师', '价格策略', '策略配置'] } }
]

export default pages
