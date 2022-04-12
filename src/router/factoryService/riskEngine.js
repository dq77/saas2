const RiskRadar = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/riskEngine/radar')
const Qjy = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/riskEngine/qjy')
const pages = [
  // 舆情雷达
  { path: 'risk/radar', name: 'riskRadar', components: { default: RiskRadar }, meta: { menuTag: 'risk_radar', hasMenuTag: true, crumbs: ['厂家服务平台', '风险引擎', '舆情雷达'] } },
  // 仟金眼
  { path: 'risk/qianjinyan', name: 'qjy', components: { default: Qjy }, meta: { menuTag: 'qianjinyan', hasMenuTag: true, crumbs: ['厂家服务平台', '风险引擎', '仟金眼'] } },
]

export default pages
