export const statusOptions: object = {
  1: '调出待审核',
  2: '调入待审核',
  3: '调拨确认',
  4: '调出拒绝',
  5: '调入拒绝'
}

export const columns = [
  { label: '调拨单号', key: 'transfersSn' },
  { label: '调出仓', key: 'fromWarehouseName' },
  { label: '调入仓', key: 'toWarehouseName' },
  { label: '创建时间', key: 'createdTime' },
  { label: '调出时间', key: 'businessOutDatetime' },
  { label: '调入时间', key: 'businessInDatetime' },
  { label: '状态', key: 'status', render: (row, item) => item && statusOptions[item] ? statusOptions[item] : '- -' },
  { label: '操作人', key: 'createdName' },
  { label: '操作', key: 'operate', width: 120, fixed: 'right' },
]

export const formData: object = {
  fromWarehouseId: undefined,
  toWarehouseId: undefined,
  createTime: undefined,
  outTime: undefined,
  inTime: undefined,
  status: undefined,
  transfersSn: undefined
}

export const formConfig = [
  { type: 'select', key: 'fromWarehouseId', label: '调出仓', options: [], otherKeys: { label: 'name', value: 'id' } },
  { type: 'select', key: 'toWarehouseId', label: '调入仓', options: [], otherKeys: { label: 'name', value: 'id' } },
  { type: 'datePicker', key: 'createTime', label: '创建时间段', kind: 'daterange' },
  { type: 'datePicker', key: 'outTime', label: '调出时间段', kind: 'daterange' },
  { type: 'datePicker', key: 'inTime', label: '调入时间段', kind: 'daterange' },
  { type: 'select', key: 'status', label: '调拨状态', options: Object.keys(statusOptions).map(key => ({ label: statusOptions[key], value: key })) },
  { type: 'input', key: 'transfersSn', label: '调拨单号' }
]
