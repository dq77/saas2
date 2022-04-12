// 发货的价格计算

import router from '@/router'
// 将表格行数据处理成接口所需的参数
const getSingleParam = ({ row }) => {
  if (!row) return false

  // 创建时的模板
  const param = {
    deliverQuantity: row.currentDeliverCount,
    orderId: row.orderId,
    orderItemId: row.orderItemId,
    updateFlag: false
  }
  // 编辑的时候需要传入
  if (router?.currentRoute?.name === 'deliverEdit') {
    param.deliverItemId = row.deliverItemId
    param.updateFlag = true
  }
  // 设置loading
  row.batchCalculateLoading = true
  return param
}

// 将接口返回的新数据设置回表格行数据
const setSingleData = (row, data) => {
  row.currentDeliverTotalPrice = data.deliverPrice // 本次发货总价
  row.residueTotalPrice = Number((row.noDeliverTotalPrice - row.currentDeliverTotalPrice).toFixed(2)) // 剩余应发总价
  row.marketingQuantity = data.marketingQuantity // 折扣个数
  row.originalPriceCount = data.originalPriceCount // 原价个数
  row.batchCalculateLoading = false
}

// 相关字段变更后，后端计算单价和总价
export default async function ({ rows, request, successCb }) {
  const params = []
  const newRows = [] // 有效的能做价格计算的行
  if (Object.prototype.toString.call(rows) === '[object Array]') {
    for (let i = 0; i < rows.length; i++) {
      const param = getSingleParam({ row: rows[i] })
      if (param) {
        params.push(param)
        newRows.push(rows[i])
      }
    }
  } else {
    const param = getSingleParam({ row: rows })
    if (param) {
      params.push(param)
      newRows.push(rows)
    }
  }
  if (params.length) {
    const res = await request(params)
    if (res.data?.code === '0' && res.data?.data?.length) {
      const data = res.data.data
      for (let i = 0; i < data.length; i++) {
        setSingleData(newRows[i], data[i])
      }
      successCb()
    }
  }
}
