// 判断某行是否选择完产品和属性
const checkShowRowInventory = (row) => {
  // 如果产品名称未选择
  if (!row?.goodsId) {
    return false
  }
  // 如果有属性没选择完
  if (row?.extendData?.length &&
    row.extendData.some(attr => !attr?.value?.id)
  ) {
    return false
  }
  return true
}
// 将表格行数据处理成接口所需的参数
const getSingleParam = ({ row, warehouseId }) => {
  if (!checkShowRowInventory(row)) return false
  const extendDataIds = row.extendData.map(attr => attr?.value?.id)
  // 创建时的模板
  const param = {
    extendDataIds,
    goodsId: row.goodsId,
    warehouseId,
  }
  // 设置loading
  row.queryInventoryLoading = true
  return param
}

// 将接口返回的新数据设置回表格行数据
const setSingleData = (row, data) => {
  row.stockQuantity = data.stockQuantity // 本次发货总价
  row.queryInventoryLoading = false
}

// 请求失败或无数据时清理行状态
const clearStatus = (row) => {
  row.stockQuantity = null
  row.queryInventoryLoading = false
}

// 相关字段变更后，后端计算单价和总价
export default async function ({ row, warehouseId, request, successCb }) {
  const param = getSingleParam({ row, warehouseId })
  if (!param) { // 清除历史库存
    clearStatus(row)
    return
  }

  const res = await request(param)
  if (res.data?.code === '0' && res.data?.data) {
    setSingleData(row, res.data.data)
    successCb && successCb()
  } else {
    clearStatus(row)
  }
}
