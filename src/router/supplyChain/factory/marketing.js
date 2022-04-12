// 限时折扣活动
const Activity = () => import('@/views/SupplyChain/Factory/Marketing/Discount/index')
const Edit = () => import('@/views/SupplyChain/Factory/Marketing/Discount/Edit')
const Detail = () => import('@/views/SupplyChain/Factory/Marketing/Discount/Detail')

const pages = [
  { path: 'activity/list', name: 'Activity', components: { default: Activity }, meta: { menuTag: 'supply_chain_discount', hasMenuTag: true, crumbs: ['订货大师', '限时折扣'] } },
  { path: 'activity/create', name: 'CreateActivity', components: { default: Edit }, meta: { menuTag: 'supply_chain_discount', hasMenuTag: false, crumbs: ['订货大师', '限时折扣', '创建活动'] } },
  { path: 'activity/edit', name: 'EditActivity', components: { default: Edit }, meta: { menuTag: 'supply_chain_discount', hasMenuTag: false, crumbs: ['订货大师', '限时折扣', '编辑活动'] } },
  { path: 'activity/detail', name: 'ActivityDetail', components: { default: Detail }, meta: { menuTag: 'supply_chain_discount', hasMenuTag: false, crumbs: ['订货大师', '限时折扣', '查看活动'] } },
]

export default pages
