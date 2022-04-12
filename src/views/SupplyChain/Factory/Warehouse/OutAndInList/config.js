import ajaxStore from '@/apis'
import { getOptionsByObj } from '@/utils/util'
import { whStorageType, whOutboundType } from '@/utils/enumsSaas'
const { factory: { wmwarehouseinfoList } } = ajaxStore

// 表单数据
export const formDatas = {
  warehouseId: undefined, // 仓库ID
  goodsLike: undefined, // 产品名称或产品型号
  changeType: undefined, // 出入库类型
  billNo: undefined, // 出入库单号
  updatedTime: undefined, // 出入库时间段
  createdTime: undefined, // 创建时间段
}

export const formConfigs = [
  { type: 'select', key: 'warehouseId', label: '仓库', options: [], otherKeys: { label: 'name', value: 'id' }, span: 6, clearable: true, api: wmwarehouseinfoList },
  { type: 'input', key: 'goodsLike', label: '产品名称或产品型号', span: 6, clearable: true },
  { type: 'select', key: 'changeType', label: '出入库类型', options: getOptionsByObj({ ...whStorageType, ...whOutboundType }), span: 6, clearable: true },
  { type: 'input', key: 'billNo', label: '出入库单号', span: 6, clearable: true },
  { type: 'datePicker', key: 'updatedTime', label: '出入库时间段', kind: 'daterange', span: 6, clearable: true, key1: 'queryStartBusinessDate', key2: 'queryEndBusinessDate' },
  { type: 'datePicker', key: 'createdTime', label: '创建时间段', kind: 'daterange', span: 6, clearable: true, key1: 'queryStartDate', key2: 'queryEndDate' },
]

// 表格
export const columns = [
  { label: '产品名称', key: 'goodsName' },
  { label: '产品型号', key: 'productSn' },
  { label: '产品属性', key: 'extendData', minWidth: 150 },
  { label: '产品规格', key: 'specification' },
  { label: '销售单位', key: 'unitName' },
  { label: '所属仓库', key: 'warehouseName' },
  { label: '类型', key: 'changeType' },
  { label: '出入库时间', key: 'updatedTime' },
  { label: '创建时间', key: 'createdTime' },
  { label: '出入库单号', key: 'billNo' },
  { label: '出入库数量', key: 'goodsQuantity' },
  {
    label: '操作',
    key: 'operate',
    options: [
      { label: '查看' },
    ]
  },
]
