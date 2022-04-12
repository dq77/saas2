// 客户管理相关页面

const RiskMarket = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/dataView/risk')
const BusinessMarket = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/dataView/business')
const pages = [
  { path: 'dataView/risk', name: 'riskMarket', components: { default: RiskMarket }, meta: { menuTag: 'data_view_risk', hasMenuTag: true, crumbs: ['数据驾驶舱', '风险看板'] } },
  { path: 'dataView/business', name: 'businessMarket', components: { default: BusinessMarket }, meta: { menuTag: 'data_view_business', hasMenuTag: true, crumbs: ['数据驾驶舱', '业务看板'] } },
]

export default pages
