// const Header = () => import(/* webpackChunkName: "group-factoryService" */ '@/layouts/layout/Header')
const ContractList = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/smartContract/list')
const ContractAdd = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/smartContract/create')
const pages = [
  { path: 'smartContract/list', name: 'contractList', components: { default: ContractList }, meta: { menuTag: 'supplier_chain_smart_contract', hasMenuTag: true, crumbs: ['订货大师', '智能合同', '合同管理'] } },
  { path: 'smartContract/create', name: 'contractAdd', components: { default: ContractAdd }, meta: { layoutNoWrap: true, menuTag: 'supplier_chain_smart_contract', hasMenuTag: false, crumbs: ['订货大师', '智能合同', '合同创建'] } },
]

export default pages
