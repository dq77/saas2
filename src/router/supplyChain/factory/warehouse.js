// 实时库存
const realTimeList = () => import('@/views/SupplyChain/Factory/Warehouse/RealTimeList')
const OutAndInList = () => import('@/views/SupplyChain/Factory/Warehouse/OutAndInList')
const InList = () => import('@/views/SupplyChain/Factory/Warehouse/InList')
const InAdd = () => import('@/views/SupplyChain/Factory/Warehouse/InList/Add')
const InDetail = () => import('@/views/SupplyChain/Factory/Warehouse/InList/Detail')
// 入库、出库管理 - 批量导入
const BatchImport = () => import('@/views/SupplyChain/Factory/Components/BatchImport/index.vue')
// 库存调拨
const Transfers = () => import('@/views/SupplyChain/Factory/Warehouse/transfers')
// 库存调拨 - 新建调拨
const TransfersCreate = () => import('@/views/SupplyChain/Factory/Warehouse/transfers/create')
// 库存调拨 - 详情
const TransfersDetail = () => import('@/views/SupplyChain/Factory/Warehouse/transfers/detail')
// 库存盘点
const Inventory = () => import('@/views/SupplyChain/Factory/Warehouse/inventory')
// 库存盘点 - 新建盘点
const InventoryCreate = () => import('@/views/SupplyChain/Factory/Warehouse/inventory/create')
// 库存盘点 - 详情
const InventoryDetail = () => import('@/views/SupplyChain/Factory/Warehouse/inventory/detail')

const pages = [
  { path: 'warehouse/realTimeList', name: 'realTimeList', components: { default: realTimeList }, meta: { menuTag: 'supply_chain_stock_real', hasMenuTag: true, crumbs: ['订货大师', '库存管理', '实时库存'] } },

  { path: 'warehouse/outAndInList', name: 'outAndInList', components: { default: OutAndInList }, meta: { menuTag: 'supply_chain_stock_detail', hasMenuTag: true, crumbs: ['订货大师', '库存管理', '出入库明细'] } },

  { path: 'warehouse/inList', name: 'inList', components: { default: InList }, meta: { menuTag: 'supply_chain_stock_in', hasMenuTag: true, crumbs: ['订货大师', '库存管理', '入库管理'] } },
  // 入库管理 - 批量导入
  { path: 'warehouse/inList/upload', name: 'inListUpload', components: { default: BatchImport }, meta: { menuTag: 'supply_chain_stock_in', hasMenuTag: false, crumbs: ['订货大师', '库存管理', '入库管理', '批量导入'] } },
  { path: 'warehouse/inAdd', name: 'inAdd', components: { default: InAdd }, meta: { menuTag: 'supply_chain_stock_in', crumbs: ['订货大师', '库存管理', '新建入库'] } },
  { path: 'warehouse/inDetail', name: 'inDetail', components: { default: InDetail }, meta: { menuTag: 'supply_chain_stock_in', crumbs: ['订货大师', '库存管理', '入库详情'] } },

  { path: 'warehouse/outList', name: 'outList', components: { default: InList }, meta: { menuTag: 'supply_chain_stock_out', hasMenuTag: true, crumbs: ['订货大师', '库存管理', '出库管理'] } },
  // 出库管理 - 批量导入
  { path: 'warehouse/outList/upload', name: 'outListUpload', components: { default: BatchImport }, meta: { menuTag: 'supply_chain_stock_out', hasMenuTag: false, crumbs: ['订货大师', '库存管理', '出库管理', '批量导入'] } },
  { path: 'warehouse/outAdd', name: 'outAdd', components: { default: InAdd }, meta: { menuTag: 'supply_chain_stock_out', crumbs: ['订货大师', '库存管理', '新建出库'] } },
  { path: 'warehouse/outDetail', name: 'outDetail', components: { default: InDetail }, meta: { menuTag: 'supply_chain_stock_out', crumbs: ['订货大师', '库存管理', '出库详情'] } },
  // 库存调拨
  { path: 'warehouse/transfers', name: 'transfers', components: { default: Transfers }, meta: { menuTag: 'supply_chain_stock_transfers', hasMenuTag: true, crumbs: ['订货大师', '库存管理', '库存调拨'] } },
  // 库存调拨 - 新建调拨
  { path: 'warehouse/transfers/create', name: 'transfersCreate', components: { default: TransfersCreate }, meta: { menuTag: 'supply_chain_stock_transfers', crumbs: ['订货大师', '库存管理', '库存调拨', '新建调拨'] } },
  // 库存调拨 - 详情
  { path: 'warehouse/transfers/detail', name: 'transfersDetail', components: { default: TransfersDetail }, meta: { menuTag: 'supply_chain_stock_transfers', crumbs: ['订货大师', '库存管理', '库存调拨', '调拨详情'] } },
  // 库存盘点
  { path: 'warehouse/inventory', name: 'inventory', components: { default: Inventory }, meta: { menuTag: 'supply_chain_stock_inventory', hasMenuTag: true, crumbs: ['订货大师', '库存管理', '库存盘点'] } },
  // 库存调拨 - 新建调拨
  { path: 'warehouse/inventory/create', name: 'inventoryCreate', components: { default: InventoryCreate }, meta: { menuTag: 'supply_chain_stock_inventory', crumbs: ['订货大师', '库存管理', '库存盘点', '新建盘点'] } },
  // 库存调拨 - 详情
  { path: 'warehouse/inventory/detail', name: 'inventoryDetail', components: { default: InventoryDetail }, meta: { menuTag: 'supply_chain_stock_inventory', crumbs: ['订货大师', '库存管理', '库存盘点', '盘点详情'] } },
]

export default pages
