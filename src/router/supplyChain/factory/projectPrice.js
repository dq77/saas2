const ProjectPriceList = () => import('@/views/SupplyChain/Factory/ProjectPrice/ProjectPriceList/index.vue')
const ProjectPriceCreate = () => import('@/views/SupplyChain/Factory/ProjectPrice/ProjectPriceCreate/index.vue')
// 批量导入
const BatchImport = () => import('@/views/SupplyChain/Factory/Components/BatchImport/index.vue')

const pages = [
  { path: 'projectPrice/list', name: 'projectPriceList', components: { default: ProjectPriceList }, meta: { menuTag: 'supply_chain_project_price', hasMenuTag: true, crumbs: ['订货大师', '项目价格', '项目列表'] } },
  { path: 'projectPrice/detail', name: 'projectPriceDetail', components: { default: ProjectPriceCreate }, meta: { menuTag: 'supply_chain_project_price', crumbs: ['订货大师', '项目价格', '查看项目价格'] } },
  { path: 'projectPrice/edit', name: 'projectPriceEdit', components: { default: ProjectPriceCreate }, meta: { menuTag: 'supply_chain_project_price', crumbs: ['订货大师', '项目价格', '编辑项目价格'] } },
  { path: 'projectPrice/import', name: 'projectPriceImport', components: { default: BatchImport }, meta: { menuTag: 'supply_chain_project_price', crumbs: ['订货大师', '产品管理', '导入项目价格列表'] } },

]

export default pages
