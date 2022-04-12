// ajax
import ajaxStore from '@/apis'
import { whInStatus, whStorageType, whOutboundType } from '@/utils/enumsSaas'
import { getOptionsByObj } from '@/utils/util'
const { factory: { wmwarehouseinfoList } } = ajaxStore

// txt：入库、出库
// 表单数据
export const getFormDatas = (txt) => {
  const data = {
    warehouseId: undefined, // 仓库ID
    updatedTime: undefined, // 入库时间段
    createdTime: undefined, // 创建时间段
    status: undefined, // 入库、出库状态
  }
  if (txt === '入库') {
    data.storageType = undefined// 入库类型
    data.storageSn = undefined// 入库单号
  } else {
    data.outboundType = undefined// 出库类型
    data.outboundSn = undefined// 出库单号
  }
  return data
}

const arr1 = [
  { key: 'storageType', label: '入库类型', enums: whStorageType },
  { key: 'storageSn', label: '入库单号' },
]
const arr2 = [
  { key: 'outboundType', label: '出库类型', enums: whOutboundType },
  { key: 'outboundSn', label: '出库单号' },
]
export const getFormConfigs = (txt) => {
  const arr = txt === '入库' ? arr1 : arr2
  console.log(arr)
  return [
    { type: 'select', key: 'warehouseId', label: '仓库', options: [], otherKeys: { label: 'name', value: 'id' }, span: 6, clearable: true, api: wmwarehouseinfoList },
    { type: 'select', key: arr[0].key, label: arr[0].label, options: getOptionsByObj(arr[0].enums), span: 6, clearable: true },
    { type: 'datePicker', key: 'updatedTime', label: `${txt}时间段`, kind: 'daterange', span: 6, clearable: true, key1: 'queryStartBusinessDate', key2: 'queryEndBusinessDate' },
    { type: 'datePicker', key: 'createdTime', label: '创建时间段', kind: 'daterange', span: 6, clearable: true, key1: 'queryStartDate', key2: 'queryEndDate' },
    { type: 'select', key: 'status', label: '状态', options: getOptionsByObj(whInStatus), span: 6, clearable: true },
    { type: 'input', key: arr[1].key, label: arr[1].label, span: 6, clearable: true },
  ]
}

// 表格
export const getColumns = (txt) => {
  const arr = txt === '入库' ? arr1 : arr2
  const value = txt === '入库' ? 11 : 21
  const key = txt === '入库' ? 'storageType' : 'outboundType'
  return [
    { label: arr[1].label, key: arr[1].key },
    { label: `${txt}时间`, key: 'updatedTime' },
    { label: '创建时间', key: 'createdTime' },
    { label: '所属仓库', key: 'warehouseName' },
    { label: arr[0].label, key: arr[0].key, render: (row, val) => (arr[0].enums)[val] },
    { label: '状态', key: 'status', render: (row, val) => whInStatus[val] },
    { label: '操作人', key: 'createdName' },
    {
      label: '操作',
      key: 'operate',
      options: [
        { label: '查看' },
        { label: '', render: (row) => row.status === 1 ? row[key] === value ? '关闭' : '前往处理' : ''},
        { label: '', render: (row) => row.status === 1 && row[key] === value ? `确认${txt}` : ''},
      ]
    },
  ]
}
