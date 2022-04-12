const Home = () => import(/* webpackChunkName: "group-home" */ '@/views/factoryService/home/Home/main')
const smartContract = () => import(/* webpackChunkName: "group-home" */ '@/views/factoryService/home/recommendService/smartContract')
const creditsalesSystem = () => import(/* webpackChunkName: "group-home" */ '@/views/factoryService/home/recommendService/creditsalesSystem')
const dealerStratification = () => import(/* webpackChunkName: "group-home" */ '@/views/factoryService/home/recommendService/dealerStratification')
const supplyCoordination = () => import(/* webpackChunkName: "group-home" */ '@/views/factoryService/home/recommendService/supplyCoordination')
const evaluationDeveloper = () => import(/* webpackChunkName: "group-home" */ '@/views/factoryService/home/recommendService/evaluationDeveloper')
const CommonServiceEdit = () => import(/* webpackChunkName: "group-home" */ '@/views/factoryService/home/CommonServiceEdit')
const pages = [
  { path: 'home', name: 'home', components: { default: Home }, meta: { menuTag: 'home', hasMenuTag: true, crumbs: ['厂家服务平台', '首页'] } },
  { path: 'home/supplyCoordination', name: 'supplyCoordination', meta: { crumbs: ['厂家服务平台', '首页', '推荐服务'], menuTag: 'home', hasMenuTag: false }, components: { default: supplyCoordination } },
  { path: 'home/creditsalesSystem', name: 'creditsalesSystem', meta: { crumbs: ['厂家服务平台', '首页', '推荐服务'], menuTag: 'home', hasMenuTag: false }, components: { default: creditsalesSystem } },
  { path: 'home/dealerStratification', name: 'dealerStratification', meta: { crumbs: ['厂家服务平台', '首页', '推荐服务'], menuTag: 'home', hasMenuTag: false }, components: { default: dealerStratification } },
  { path: 'home/smartContract', name: 'smartContract', meta: { crumbs: ['厂家服务平台', '首页', '推荐服务'], menuTag: 'home', hasMenuTag: false }, components: { default: smartContract } },
  { path: 'home/evaluationDeveloper', name: 'evaluationDeveloper', meta: { crumbs: ['厂家服务平台', '首页', '推荐服务'], menuTag: 'home', hasMenuTag: false }, components: { default: evaluationDeveloper } },
  { path: 'home/commonServiceEdit', name: 'commonServiceEdit', components: { default: CommonServiceEdit }, meta: { menuTag: 'home', hasMenuTag: false, crumbs: ['厂家服务平台', '首页', '常用服务编辑'] } }
]

export default pages
