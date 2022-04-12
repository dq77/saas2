const ProjectManage = () => import('@/views/SupplyChain/Factory/Project/index')
const ProjectDetail = () => import('@/views/SupplyChain/Factory/Project/ProjectDetail')
const ProjectEdit = () => import('@/views/SupplyChain/Factory/Project/ProjectEdit/index')
const BatchImport = () => import('@/views/SupplyChain/Factory/Components/BatchImport/index.vue')

const pages = [
  { path: 'project/list', name: 'projectManage', components: { default: ProjectManage }, meta: { menuTag: 'supply_chain_project', hasMenuTag: true, crumbs: ['项目列表'] } },
  { path: 'project/detail', name: 'projectDetail', components: { default: ProjectDetail }, meta: { menuTag: 'supply_chain_project', crumbs: ['项目列表', '项目详情'] } },
  { path: 'project/create', name: 'projectCreate', components: { default: ProjectEdit }, meta: { menuTag: 'supply_chain_project', crumbs: ['项目列表', '项目新建'] } },
  { path: 'project/edit', name: 'projectEdit', components: { default: ProjectEdit }, meta: { menuTag: 'supply_chain_project', crumbs: ['项目列表', '项目编辑'] } },
  { path: 'project/import', name: 'projectImport', components: { default: BatchImport }, meta: { menuTag: 'supply_chain_project', crumbs: ['项目列表', '导入项目列表'] } },
]

export default pages
