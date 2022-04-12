import { toAmountStr } from '@/utils/util'

// export const columns = [
//   { label: '产品', key: 'goods' },
//   { label: '产品属性', key: 'extendData' },
//   { label: '价格', key: 'price', render: (row) => row.price ? `¥${toAmountStr(row.price, 2, true)}` : '--' },
//   { label: '运费和附加费（单价）', key: 'addCostPriceList' },
//   { label: '数量', key: 'deliverQuantity', render: (row) => `${row.deliverQuantity}${row.unitName}` },
//   { label: '总价', key: 'deliverPrice', render: (row) => row.deliverPrice ? `¥${toAmountStr(row.deliverPrice, 2, true)}` : '--' },
// ]

export const columns = [
  { label: '图片', key: 'mainPicPath', minWidth: 80 },
  { label: '产品名称', key: 'name', minWidth: 100 },
  { label: '产品型号', key: 'productSn', minWidth: 80 },
  { label: '产品规格', key: 'specification', minWidth: 80 },
  { label: '销售单位', key: 'unitName', minWidth: 60 },
  { label: '产品属性', key: 'extendData', minWidth: 100 },
  { label: '产品单价(元)', key: 'price', align: 'right', minWidth: 80, render: (row, value) => toAmountStr(value, 2, true) },
  { label: '附加费(元)', key: 'addedCostPriceVOS', align: 'right', minWidth: 120 },
  { label: '数量', key: 'deliverQuantity', minWidth: 60 },
  { label: '总价(元)', key: 'deliverPrice', align: 'right', minWidth: 100, render: (row, value) => toAmountStr(value, 2, true) || '- -' },
]
