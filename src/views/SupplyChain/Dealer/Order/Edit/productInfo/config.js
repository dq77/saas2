// 可编辑状态
export const tableColumns = [
  { label: '图片', key: 'mainPicPath', minWidth: 80 },
  { label: '产品名称', key: 'name', type: 'select', minWidth: 140 },
  { label: '产品型号', key: 'productSn', type: 'select', minWidth: 140 },
  { label: '产品规格', key: 'specification', minWidth: 70 },
  { label: '销售单位', key: 'unitName', minWidth: 70 },
  { label: '产品属性', key: 'extendData', minWidth: 140 }, // 含多个字段
  { label: '产品单价(元)', key: 'goodsPrice', type: 'inputNumber', minWidth: 120 },
  { label: '附加费(元)', key: 'addedCostPriceVOS', minWidth: 120 }, // 含多个字段
  { label: '数量', key: 'quantity', type: 'inputNumber', minWidth: 130 },
  { label: '总价(元)', key: 'payAmount', minWidth: 80 },
]
