import { toAmountStr } from '@/utils/util'

export const reverseOrderStatus = {
  0: '审核中',
  1: '退货中',
  2: '已退货',
  3: '已驳回',
}

export const reverseOrderColumns = [
  { label: '退货订单号', key: 'reverseOrderSn' },
  { label: '订单号', key: 'orderSn' },
  { label: '退货提交时间', key: 'createdTime' },
  { label: '退货完成时间', key: 'returnSuccessTime' },
  { label: '客户', key: 'customerName'},
  { label: '退货总金额', key: 'cost', align: 'right', render: (row, key) => row.cost ? `¥${toAmountStr(row.cost, 2, true)}` : '--'},
  { label: '退货状态', key: 'status', render: (row, key) => reverseOrderStatus[row.status] },
  {
    label: '操作',
    key: 'operate',
    width: '180px',
    options: [
      { label: '查看', render: (row) => row.status === 2 || row.status === 3 ? '查看' : '退货处理'},
    ]
  },
]
export const reverseOrderFormConfig = (remoteMethod) => {
  return [
    { type: 'datePicker', key: 'createdTime', label: '退货提交时间', kind: 'daterange', span: 6},
    { type: 'input', key: 'reverseOrderSn', label: '退货订单号', span: 6},
    {
      type: 'select',
      key: 'customerId',
      label: '客户名称',
      filterable: true,
      span: 6,
      remote: true,
      otherKeys: { label: 'customerName', value: 'id' },
      remoteMethod,
      options: []
    },
    { type: 'select', key: 'status', label: '退货状态', span: 6, options: Object.keys(reverseOrderStatus).map(key => ({ label: reverseOrderStatus[key], value: key })) },
  ]
}

export const revseseDetailProductColumns = [
  { label: '商品', key: 'reverseProduct' },
  { label: '单价', key: 'price', render: (row, key) => row.price ? `¥${toAmountStr(row.price, 2, true)}` : '--' },
  { label: '附加费(单价)', key: 'itemAddedCostVOList'},
  { label: '退货数量', key: 'reverseQuantity', render: (row, key) => row.reverseQuantity ? `${row.reverseQuantity} ${row.unitName}` : 0 },
  { label: '关联发货单', key: 'deliverSn'},
  { label: '退货总价', key: 'goodsPayTotalAmount', render: (row, key) => row.goodsPayTotalAmount ? `¥${toAmountStr(row.goodsPayTotalAmount, 2, true)}` : 0},
]

export const revseseColumns = [
  { label: '图片', key: 'mainPicPath', minWidth: 80 },
  { label: '产品名称', key: 'goodsName', minWidth: 100 },
  { label: '产品型号', key: 'productSn', minWidth: 80 },
  { label: '产品规格', key: 'specification', minWidth: 80 },
  { label: '销售单位', key: 'unitName', minWidth: 60 },
  { label: '产品属性', key: 'extendData', minWidth: 100 },
  { label: '产品单价(元)', key: 'price', dataKey: 'price', align: 'right', minWidth: 80, render: (row, value) => toAmountStr(value, 2, true) },
  { label: '附加费(元)', key: 'addedCostPriceVOS', align: 'right', minWidth: 120 },
  { label: '退货数量', key: 'reverseQuantity', minWidth: 60 },
  { label: '关联发货单', key: 'deliverSn'},
  { label: '退货总价', key: 'goodsPayTotalAmount', align: 'right', minWidth: 100, render: (row, value) => toAmountStr(value, 2, true) },
]
