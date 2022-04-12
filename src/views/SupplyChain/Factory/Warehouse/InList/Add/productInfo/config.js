// 可编辑状态
export const getTableColumns = (txt) => {
  return [
    { label: '图片', key: 'mainPicPath', width: 90 },
    { label: '产品名称', key: 'goodsName', type: 'select', minWidth: 140 },
    { label: '产品型号', key: 'productSn', type: 'select', minWidth: 100 },
    { label: '产品属性', key: 'extendData', minWidth: 140 }, // 含多个字段
    { label: '产品规格', key: 'specification', minWidht: 100 },
    { label: '销售单位', key: 'unitName', minWidht: 100 },
    { label: `${txt}数量`, key: 'goodsQuantity', type: 'inputNumber', minWidht: 100, precision: 0, step: 1, min: 1 },
  ]
}
