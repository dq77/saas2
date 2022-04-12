import { toAmountStr } from '@/utils/util'

export const collapseItems = [
  { key: 'a1', label: '发货信息' },
  { key: 'a2', label: '货物明细' },
]

export const defaultActivedCollapses = ['a1', 'a2']

export const columns = [
  { label: '图片', key: 'mainPicPath', minWidth: 80, fixed: 'left' },
  { label: '产品名称', key: 'goodsName', minWidth: 100, fixed: 'left' },
  { label: '产品型号', key: 'productSn', minWidth: 80, fixed: 'left' },
  { label: '产品规格', key: 'specification', minWidth: 70 },
  { label: '销售单位', key: 'unitName', minWidth: 70 },
  { label: '产品属性', key: 'extendData', minWidth: 100 },
  { label: '产品单价(元)', key: 'price', dataKey: 'price', minWidth: 80 },
  { label: '附加费(元)', key: 'addedCostPriceVOS', minWidth: 120 },
  { label: '发货数量', key: 'quantity', dataKey: 'currentDeliverCount', minWidth: 120, fixed: 'right' },
  { label: '发货总价', key: 'currentDeliverTotalPrice', minWidth: 80, align: 'right', fixed: 'right', render: (row, value) => toAmountStr(value, 2, true) },
]
