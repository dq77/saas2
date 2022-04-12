const WarningDigest = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/realestateWarning/risk')
const WarningBond = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/realestateWarning/debt')
const WarningNotice = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/realestateWarning/history')
const Blacklist = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/realestateWarning/blacklist')

const pages = [
  // 行业预警
  { path: 'warningDigest', name: 'warningDigest', component: WarningDigest, meta: { menuTag: 'developer_early_warning', hasMenuTag: true, crumbs: ['风险专家', '行业预警', '预警信息摘要'] } },
  { path: 'warningBond', name: 'warningBond', component: WarningBond, meta: { menuTag: 'developer_early_warning', hasMenuTag: false, crumbs: ['风险专家', '行业预警', '债券到期信息'] } },
  { path: 'warningNotice', name: 'warningNotice', component: WarningNotice, meta: { menuTag: 'developer_early_warning', hasMenuTag: false, crumbs: ['风险专家', '行业预警', '历史公共信息'] } },
  { path: 'blacklist', name: 'blacklist', component: Blacklist, meta: { menuTag: 'developer_early_warning', hasMenuTag: false, crumbs: ['风险专家', '行业预警', '黑名单信息'] } },
]

export default pages
