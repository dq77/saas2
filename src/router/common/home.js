const Home = () => import(/* webpackChunkName: "group-common" */ '@/views/common/Home/main')
const orderMaster = () => import(/* webpackChunkName: "group-common" */ '@/views/common/introduce/orderMaster')
const customerGuard = () => import(/* webpackChunkName: "group-common" */ '@/views/common/introduce/customerGuard')
const creditManager = () => import(/* webpackChunkName: "group-common" */ '@/views/common/introduce/creditManager')
const receiveAdmin = () => import(/* webpackChunkName: "group-common" */ '@/views/common/introduce/receiveAdmin')
const riskExperts = () => import(/* webpackChunkName: "group-common" */ '@/views/common/introduce/riskExperts')
const pages = [
  { path: 'temphome', name: 'temphome', components: { default: Home }, meta: { showCrumbs: false, crumbs: ['首页'] } },
  { path: 'introduce/orderMaster', name: 'orderMasterIntr', components: { default: orderMaster }, meta: { crumbs: ['服务介绍', '订货大师'] } },
  { path: 'introduce/customerGuard', name: 'customerGuardIntr', components: { default: customerGuard }, meta: { crumbs: ['服务介绍', '客户卫士'] } },
  { path: 'introduce/creditManager', name: 'creditManagerIntr', components: { default: creditManager }, meta: { crumbs: ['服务介绍', '赊销管家'] } },
  { path: 'introduce/receiveAdmin', name: 'receiveAdminIntr', components: { default: receiveAdmin }, meta: { crumbs: ['服务介绍', '应收管家'] } },
  { path: 'introduce/riskExperts', name: 'riskExpertsIntr', components: { default: riskExperts }, meta: { crumbs: ['服务介绍', '风险专家'] } },
]

export default pages
