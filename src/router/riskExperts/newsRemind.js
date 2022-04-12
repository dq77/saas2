const RiskEvent = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/newsRemind/risk')
const Journalism = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/newsRemind/news')

const pages = [
  // 舆情订阅信息
  { path: 'riskEvent', name: 'riskEvent', component: RiskEvent, meta: { menuTag: 'public_opinion_subscription', hasMenuTag: true, crumbs: ['风险专家', '舆情订阅信息', '风险事件'] } },
  { path: 'journalism', name: 'journalism', component: Journalism, meta: { menuTag: 'public_opinion_subscription', hasMenuTag: false, crumbs: ['风险专家', '舆情订阅信息', '新闻舆情'] } },
]

export default pages
