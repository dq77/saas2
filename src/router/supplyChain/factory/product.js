// 产品
const ProductManage = () => import('@/views/SupplyChain/Factory/Product/index')
const ProductDetail = () => import('@/views/SupplyChain/Factory/Product/ProductDetail')
const ProductEdit = () => import('@/views/SupplyChain/Factory/Product/ProductEdit')
const ProductCreate = () => import('@/views/SupplyChain/Factory/Product/ProductCreate')
// 产品分类
const ProductClassify = () => import('@/views/SupplyChain/Factory/ProductClassify/index.vue')
// const ProductClassify1 = () => import('@/views/SupplyChain/Factory/ProductClassify1/index.vue')
// 产品属性
const ProductAttribute = () => import('@/views/SupplyChain/Factory/ProductAttribute/index.vue')
// 批量导入
const BatchImport = () => import('@/views/SupplyChain/Factory/Components/BatchImport/index.vue')

const pages = [
  { path: 'product/list', name: 'productManage', components: { default: ProductManage }, meta: { menuTag: 'supply_chain_product', hasMenuTag: true, crumbs: ['订货大师', '产品管理'] } },
  { path: 'product/detail', name: 'productDetail', components: { default: ProductDetail }, meta: { menuTag: 'supply_chain_product', crumbs: ['订货大师', '产品管理', '产品详情'] } },
  { path: 'product/edit', name: 'productEdit', components: { default: ProductEdit }, meta: { menuTag: 'supply_chain_product', crumbs: ['订货大师', '产品管理', '产品编辑'] } },
  { path: 'product/create', name: 'ProductCreate', components: { default: ProductCreate }, meta: { menuTag: 'supply_chain_product', crumbs: ['订货大师', '产品管理', '产品新建'] } },
  { path: 'product/import', name: 'productImport', components: { default: BatchImport }, meta: { menuTag: 'supply_chain_product', crumbs: ['订货大师', '产品管理', '导入产品列表'] } },
  { path: 'product/attribute', name: 'ProductAttribute', components: { default: ProductAttribute }, meta: { menuTag: 'supply_chain_product_attribute', hasMenuTag: true, crumbs: ['订货大师', '产品属性'] } },
  { path: 'productAttr/import', name: 'productAttrImport', components: { default: BatchImport }, meta: { menuTag: 'supply_chain_product_attribute', crumbs: ['订货大师', '产品管理', '导入产品属性列表'] } },
  { path: 'product/classify', name: 'ProductClassify', components: { default: ProductClassify }, meta: { menuTag: 'supply_chain_product_classify', hasMenuTag: true, crumbs: ['订货大师', '产品分类'] }},
  // { path: 'product/classify1', name: 'productClassify1', components: { default: ProductClassify1 }, meta: { menuTag: '', hasMenuTag: false, crumbs: ['订货大师', '产品分类'] }},
]

export default pages
