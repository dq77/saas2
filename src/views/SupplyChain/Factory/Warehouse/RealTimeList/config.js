import ajaxStore from '@/apis'
const { factory: { wmwarehouseinfoList } } = ajaxStore

export const tabs = [
  { label: '按产品展示', value: '1' },
  { label: '按仓库展示', value: '2' }
]

// 表单数据
export const formDatas = {
  goodsNameProductSnLike: undefined, // 产品名称或产品型号
}
export const formConfigs = [
  { type: 'input', key: 'goodsNameProductSnLike', label: '产品名称或产品型号', span: 6, clearable: true },
]
// 表格
export const columns = [
  { label: '产品名称', key: 'goodsName' },
  { label: '产品型号', key: 'productSn' },
  { label: '产品属性', key: 'extendData' },
  { label: '产品规格', key: 'specification' },
  { label: '销售单位', key: 'unitName' },
  { label: '下单冻结量', key: 'lockQuantity', sortable: 'custom' },
  { label: '库存量', key: 'stockQuantity', sortable: 'custom' },
  { label: '可用库存量', key: 'canSellQuantity', sortable: 'custom' },
]

// 表单数据
export const formDatas2 = {
  warehouseId: undefined, // 仓库ID
  goodsNameProductSnLike: undefined, // 产品名称或产品型号
}
export const formConfigs2 = [
  { type: 'select', key: 'warehouseId', label: '仓库', options: [], otherKeys: { label: 'name', value: 'id' }, span: 6, clearable: true, api: wmwarehouseinfoList },
  { type: 'input', key: 'goodsNameProductSnLike', label: '产品名称或产品型号', span: 6, clearable: true },
]
// 表格
export const columns2 = [
  { label: '产品名称', key: 'goodsName' },
  { label: '产品型号', key: 'productSn' },
  { label: '产品属性', key: 'extendData', minWidth: 150 },
  { label: '产品规格', key: 'specification' },
  { label: '销售单位', key: 'unitName' },
  { label: '所属仓库', key: 'warehouseName' },
  { label: '入在途量', key: 'lockInTransitQuantity', sortable: 'custom' },
  { label: '出在途量', key: 'lockOutTransitQuantity', sortable: 'custom' },
  { label: '库存量', key: 'stockQuantity', sortable: 'custom' },
]
