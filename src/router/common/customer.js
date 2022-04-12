// 客户管理相关页面

const CustomerList = () => import(/* webpackChunkName: "group-common" */ '@/views/common/customer/customerList')
const CustomerEdit = () => import(/* webpackChunkName: "group-common" */ '@/views/common/customer/customerEdit')
const CustomerDetail = () => import(/* webpackChunkName: "group-common" */ '@/views/common/customer/customerDetail')
const CustomerImport = () => import(/* webpackChunkName: "group-common" */ '@/views/common/customer/customerImport')

const pages = [
  { path: 'customer/list', name: 'customerList', components: { default: CustomerList }, meta: { menuTag: 'customer_manage', hasMenuTag: true, crumbs: ['客户管理'] } },
  { path: 'customer/create', name: 'customerCreate', components: { default: CustomerEdit }, meta: { menuTag: 'customer_manage', hasMenuTag: false, crumbs: ['客户管理', '客户新建'] } },
  { path: 'customer/edit', name: 'customerEdit', components: { default: CustomerEdit }, meta: { menuTag: 'customer_manage', hasMenuTag: false, crumbs: ['客户管理', '客户编辑'] } },
  { path: 'customer/detail', name: 'customerDetail', components: { default: CustomerDetail }, meta: { menuTag: 'customer_manage', hasMenuTag: false, crumbs: ['客户管理', '客户详情'] } },
  { path: 'customer/import', name: 'customerImport', components: { default: CustomerImport }, meta: { menuTag: 'customer_manage', hasMenuTag: false, crumbs: ['客户管理', '导入客户列表'] } },
]

export default pages
