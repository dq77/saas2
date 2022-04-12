import { uuid } from '@/utils/qjd'

const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

// 新增订单行时增加除column-key之外的字段
export const normalizeOrderRow = (row = {}) => {
  !hasOwnProperty(row, '__id') && (row.__id = uuid()) // 编辑的时候可以通过__id来区分不同的行
  !hasOwnProperty(row, 'productOptions') && (row.productOptions = []) // 产品名称的模糊搜索项的缓存
  !hasOwnProperty(row, 'productLoading') && (row.productNameLoading = false) // 表格中产品名模糊查询的loading
  !hasOwnProperty(row, 'extendData') && (row.extendData = []) // 产品属性
  !hasOwnProperty(row, 'price') && (row.price = null) // 商品价格，批量价格计算时填入，前端无用，后端用于校验
  !hasOwnProperty(row, 'payAmountLoading') && (row.payAmountLoading = false) // 批量计算时loading总价
  !hasOwnProperty(row, 'activityId') && (row.activityId = null) // 营销活动id
  !hasOwnProperty(row, 'marketingLogos') && (row.marketingLogos = false) // 是否有折扣
  !hasOwnProperty(row, 'marketingDiscount') && (row.marketingDiscount = null) // 折扣
  !hasOwnProperty(row, 'marketingPrice') && (row.marketingPrice = null) // 折后单价
  !hasOwnProperty(row, 'marketingCount') && (row.marketingCount = null) // 剩余折扣数量
  !hasOwnProperty(row, 'marketingQuantity') && (row.marketingQuantity = null) // 折扣价数量
  !hasOwnProperty(row, 'originalPriceCount') && (row.originalPriceCount = null) // 原价数量
  !hasOwnProperty(row, 'overRestrictedStrategy') && (row.overRestrictedStrategy = null) // 限购策略
  !hasOwnProperty(row, 'isPurchaseRestricted') && (row.isPurchaseRestricted = null) // 是否限购，“Y”表示限购
  !hasOwnProperty(row, 'stockQuantity') && (row.stockQuantity = null) // 库存数量
  !hasOwnProperty(row, 'queryInventoryLoading') && (row.queryInventoryLoading = false) // 库存查询loading
  return row
}

// 转换出单品单价的不可编辑模式的值
export const getGoodsPriceText = (intervalPrice) => {
  if (intervalPrice.length === 1) {
    return `${intervalPrice[0].price}`
  } else {
    const prices = intervalPrice.map(item => item.price)
    prices.sort((a, b) => a - b)
    return `${prices[0]}-${prices[prices.length - 1]}`
  }
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
