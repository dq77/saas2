export const statusOptions: object = {
  1: '盘点中',
  2: '盘点完成',
  3: '取消盘点'
}

export const columns = [
  { label: '库存盘点单单号', key: 'stockCheckSn' },
  { label: '盘点时间', key: 'createdTime' },
  { label: '所属仓库', key: 'warehouseName' },
  { label: '盘点产品种类(个)', key: 'stockCheckGoodsCount' },
  { label: '状态', key: 'status', render: (dataSource, item) => item && statusOptions[item] ? statusOptions[item] : '- -' },
  { label: '操作人', key: 'createdName' },
  { label: '操作', key: 'operate', fixed: 'right', width: 190 },
]

export const formData: Object = {
  warehouseId: undefined,
  createTime: undefined,
  status: undefined,
  stockCheckSn: undefined
}

export const formConfig = [
  { type: 'select', key: 'warehouseId', label: '仓库', options: [], otherKeys: { label: 'name', value: 'id' } },
  { type: 'datePicker', key: 'createTime', label: '盘点时间段', kind: 'daterange' },
  { type: 'select', key: 'status', label: '盘点状态', options: Object.keys(statusOptions).map(key => ({ label: statusOptions[key], value: key })) },
  { type: 'input', key: 'stockCheckSn', label: '库存盘点单单号' }
]
