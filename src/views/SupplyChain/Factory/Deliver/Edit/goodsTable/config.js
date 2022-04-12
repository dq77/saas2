import { toAmountStr } from '@/utils/util'

export const prefixFileUrl = '/saas-ofc/org/goodsAlbum/getAttachment?fileKey='

export const columns = [
  { label: '图片', key: 'mainPicPath', minWidth: 80, fixed: 'left' },
  { label: '产品名称', key: 'goodsName', minWidth: 100, fixed: 'left' },
  { label: '产品型号', key: 'productSn', minWidth: 80, fixed: 'left' },
  { label: '产品规格', key: 'specification', minWidth: 70 },
  { label: '销售单位', key: 'unitName', minWidth: 70 },
  { label: '产品属性', key: 'extendData', minWidth: 100 },
  { label: '产品单价(元)', key: 'price', minWidth: 120 },
  { label: '附加费(元)', key: 'addCostPriceList', minWidth: 120 },
  { label: '未发货数量', key: 'noDeliverCount', minWidth: 80, fixed: 'right' },
  { label: '未发货金额(元)', key: 'noDeliverTotalPrice', minWidth: 80, fixed: 'right', render: (row, value) => toAmountStr(value, 2, true) },
  { label: '本次发货数量', key: 'currentDeliverCount', minWidth: 120, fixed: 'right' },
  { label: '本次发货总价(元)', key: 'currentDeliverTotalPrice', minWidth: 80, fixed: 'right', render: (row, value) => toAmountStr(value, 2, true) },
  { label: '剩余应发总价(元)', key: 'residueTotalPrice', minWidth: 80, fixed: 'right', render: (row, value) => toAmountStr(value, 2, true) },
]
