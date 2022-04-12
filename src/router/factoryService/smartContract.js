// const Header = () => import(/* webpackChunkName: "group-factoryService" */ '@/layouts/layout/Header')
const ContractList = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/smartContract/list')
const ContractAdd = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/smartContract/create')
const pages = [
  { path: 'smartContract/list', name: 'factorycontractList', components: { default: ContractList }, meta: { menuTag: 'smart_contract', hasMenuTag: true, crumbs: ['厂家服务平台', '智能合同', '合同管理'] } },
  { path: 'smartContract/create', name: 'factorycontractAdd', components: { default: ContractAdd }, meta: { layoutNoWrap: true, menuTag: 'smart_contract', hasMenuTag: false, crumbs: ['厂家服务平台', '智能合同', '合同创建'] } },
]

export default pages
