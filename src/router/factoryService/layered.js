// 经销商分层

const SinceritySearch = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/layered/list')
const SincerityDetail = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/factoryService/layered/detail')
// const GradeAndQuota = () => import(/* webpackChunkName: "group-factoryService" */ '@/views/Layered/GradeAndQuota')

const pages = [
  { path: 'layered/manage/list', name: 'sinceritySearch', components: { default: SinceritySearch }, meta: { menuTag: 'layered_manage', hasMenuTag: true, crumbs: ['厂家服务平台', '经销商分层', '分层管理'] } },
  { path: 'layered/manage/detail', name: 'sincerityDetail', components: { default: SincerityDetail }, meta: { menuTag: 'layered_manage', hasMenuTag: false, crumbs: ['厂家服务平台', '经销商分层', '分层管理', '风险详情'] } },
  // { path: '/layered/manage/gradeAndQuota', name: 'gradeAndQuota', components: { default: GradeAndQuota }, meta: { menuTag: 'layered_manage', hasMenuTag: false, crumbs: ['经销商分层', '分层管理', '配置助手'] } }
]
export default pages
