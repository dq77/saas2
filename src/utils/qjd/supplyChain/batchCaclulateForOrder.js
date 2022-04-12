// 订单的价格计算

import { getGoodsPriceText } from './tools'

// 将表格行数据处理成接口所需的参数
const getSingleParam = ({ row, customerId, projectId }) => {
  if (!row || !row?.name?.goodsId) return false

  const extendData = row.extendData.map(item => {
    return {
      nameId: item.value.spuAttributeId,
      valueId: item.value.id
    }
  })
  const param = {
    addedCostPriceDTOS: row.addedCostPriceVOS.map(({ code, singleFee }) => {
      return { code, singleFee }
    }),
    extendData,
    goodsId: row.name.goodsId,
    quantity: row.quantity,
    goodsPrice: row.goodsPrice
  }

  // 加orderItemId字段是为了营销功能，计算剩余折扣数量后端需要回算此行的下单数量
  if (row.orderItemId) param.orderItemId = row.orderItemId
  if (customerId) param.customerId = customerId
  if (projectId) param.projectId = projectId
  row.payAmountLoading = true
  return param
}

// 将接口返回的新数据设置回表格行数据
const setSingleData = (row, payComputeVOS) => {
  row.payAmount = payComputeVOS.payAmount
  if (row.name.intervalPrice) { // 如果有价格策略，则单价要根据计算结果来
    row.goodsPrice = payComputeVOS.price
  }
  row.validatePrice = payComputeVOS.price // 用于后端做校验的价格
  payComputeVOS?.addedCostVOS?.length > 0 && row.addedCostPriceVOS.forEach((item, index) => { // 用于后端做校验的价格，值为乘以数量的总价
    item.fee = payComputeVOS.addedCostVOS[index].fee
  })
  if (payComputeVOS.intervalPrice) { // 重置单价
    row.goodsPriceText = getGoodsPriceText(payComputeVOS.intervalPrice)
  }
  row.price = payComputeVOS.goodsPrice // 用于后端校验逻辑
  row.marketingLogos = payComputeVOS.marketingLogos // 是否有折扣
  row.marketingDiscount = payComputeVOS.marketingDiscount // 折扣
  row.marketingPrice = payComputeVOS.marketingPrice // 折后单价
  row.marketingCount = payComputeVOS.marketingCount // 剩余折扣数量
  row.marketingQuantity = payComputeVOS.marketingQuantity // 折扣价数量
  row.originalPriceCount = payComputeVOS.originalPriceCount // 原价数量
  row.overRestrictedStrategy = payComputeVOS.overRestrictedStrategy // 超限策略
  row.isPurchaseRestricted = payComputeVOS.isPurchaseRestricted // 是否限购，“Y”表示限购
  row.payAmountLoading = false
}
// 请求失败或无数据时清理行状态
const clearStatus = (rows) => {
  rows.forEach(row => {
    row.payAmount = 0
    row.payAmountLoading = false
  })
}

// 相关字段变更后，后端计算单价和总价
export default async function ({ rows, customerId, projectId, request }) {
  const params = []
  const newRows = [] // 有效的能做价格计算的行
  if (Array.isArray(rows)) {
    for (let i = 0; i < rows.length; i++) {
      const param = getSingleParam({ row: rows[i], customerId, projectId })
      if (param) {
        params.push(param)
        newRows.push(rows[i])
      }
    }
  } else {
    const param = getSingleParam({ row: rows, customerId, projectId })
    if (param) {
      params.push(param)
      newRows.push(rows)
    }
  }
  if (params.length) {
    const res = await request(params)
    if (res.data?.code === '0' && res.data?.data?.payComputeVOS?.length) {
      const payComputeVOS = res.data.data.payComputeVOS
      for (let i = 0; i < payComputeVOS.length; i++) {
        setSingleData(newRows[i], payComputeVOS[i])
      }
    } else {
      clearStatus(newRows)
    }
  }
}
