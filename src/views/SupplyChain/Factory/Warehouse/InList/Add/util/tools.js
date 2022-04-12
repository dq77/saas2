import { uuid } from '@/utils/qjd'

const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

// 新增行时增加除column-key之外的字段
export const normalizeRow = (row = {}) => {
  !hasOwnProperty(row, '__id') && (row.__id = uuid()) // 编辑的时候可以通过__id来区分不同的行
  !hasOwnProperty(row, 'productOptions') && (row.productOptions = []) // 产品名称的模糊搜索项的缓存
  !hasOwnProperty(row, 'productLoading') && (row.productNameLoading = false) // 表格中产品名模糊查询的loading
  !hasOwnProperty(row, 'stockQuantity') && (row.stockQuantity = null) // 库存数量
  !hasOwnProperty(row, 'queryInventoryLoading') && (row.queryInventoryLoading = false) // 表格中库存查询的loading
  row.goodsQuantity = 1
  return row
}

// 枚举数据转变为select option数据
export const enumToOption = (obj) => {
  return Object.keys(obj).map(key => {
    return {
      label: obj[key],
      value: key
    }
  })
}
