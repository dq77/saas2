import { toAmountStr } from '@/utils/util'

export const prefixFileUrl = '/saas-ofc/org/goodsAlbum/getAttachment?fileKey='

// 订单查询的案例
export const columns = [
  { label: '图片', key: 'mainPicPath', minWidth: 80 },
  { label: '产品名称', key: 'goodsName', minWidth: 100 },
  { label: '产品型号', key: 'productSn', minWidth: 80 },
  { label: '产品规格', key: 'specification', minWidth: 80 },
  { label: '销售单位', key: 'unitName', minWidth: 60 },
  { label: '产品属性', key: 'extendData', minWidth: 100 },
  { label: '产品单价(元)', key: 'price', align: 'right', minWidth: 80 },
  { label: '附加费(元)', key: 'addedCostPriceVOS', align: 'right', minWidth: 120 },
  { label: '数量', key: 'quantity', minWidth: 60 },
  { label: '总价(元)', key: 'totalAmount', align: 'right', minWidth: 100, render: (row, value) => toAmountStr(value, 2, true) },
]

export const defaultDataKeys = {
  mainPicPath: 'mainPicPath',
  goodsName: 'goodsName',
  productSn: 'productSn',
  specification: 'specification',
  unitName: 'unitName',
  extendData: 'extendData',
  price: 'price',
  addedCostPriceVOS: 'addedCostPriceVOS',
  quantity: 'quantity',
  totalAmount: 'totalAmount',
}
