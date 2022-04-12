import { getOptionsByObj } from '@/utils/util'

// 入库类型
const storageType = {
  11: '手动入库',
}
export const formConfig = [
  { type: 'select', key: 'warehouseId', label: '仓库', options: [], otherKeys: { label: 'name', value: 'id' }, clearable: true, filterable: true, slotName: 'warehouseId' },
  { type: 'select', key: 'storageType', label: '入库类型', options: getOptionsByObj(storageType), clearable: true, filterable: true, disabled: true },
  { key: 'businessDatetime', label: '入库时间', type: 'datePicker', kind: 'datetime', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
  { key: 'reason', label: '备注', type: 'input', kind: 'textarea', maxlength: 200 },
]
export const formRules = {
  warehouseId: [
    { required: true, message: '请选择仓库' },
  ],
  storageType: [
    { required: true, message: '请选择入库类型' },
  ],
}
export const formData = {
  warehouseId: undefined,
  storageType: '11',
  businessDatetime: undefined,
  reason: undefined,
}

// 出库类型
const outboundType = {
  21: '手动出库',
}
export const outFormConfig = [
  { type: 'select', key: 'warehouseId', label: '仓库', options: [], otherKeys: { label: 'name', value: 'id' }, clearable: true, filterable: true },
  { type: 'select', key: 'outboundType', label: '出库类型', options: getOptionsByObj(outboundType), clearable: true, filterable: true, disabled: true },
  { key: 'businessDatetime', label: '出库时间', type: 'datePicker', kind: 'datetime', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
  { key: 'reason', label: '备注', type: 'input', kind: 'textarea', maxlength: 200 },
]
export const outFormRules = {
  warehouseId: [
    { required: true, message: '请选择仓库' },
  ],
  outboundType: [
    { required: true, message: '请选择出库类型' },
  ],
}
export const outFormData = {
  warehouseId: undefined,
  outboundType: '21',
  businessDatetime: undefined,
  reason: undefined,
}
