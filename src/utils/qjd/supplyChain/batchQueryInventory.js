// 产品详情表格的库存查询，查询到的库存会设置到行数据

import router from '@/router'

// 判断某行是否选择完产品和属性
const checkShowRowInventory = (row) => {
  // 如果产品名称未选择
  if (!row?.name?.name) {
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
const getSingleParam = ({ row, orderId }) => {
  if (!checkShowRowInventory(row)) return false
  const extendIds = row.extendData.map(attr => attr?.value?.id)
  // 创建时的模板
  const param = {
    extendIds,
    goodsId: row.name.goodsId,
  }
  // 编辑的时候需要传入
  if (router?.currentRoute?.name === 'orderEdit') {
    param.orderId = orderId
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
const clearStatus = (rows) => {
  rows.forEach(row => {
    row.stockQuantity = null
    row.queryInventoryLoading = false
  })
}

// 相关字段变更后，后端计算单价和总价
export default async function ({ rows, orderId, request, successCb }) {
  const cRows = Array.isArray(rows) ? rows : [rows]
  const params = []
  const newRows = [] // 有效的能做价格计算的行
  cRows.forEach(row => {
    const param = getSingleParam({ row, orderId })
    if (param) {
      params.push(param)
      newRows.push(row)
    } else { // 清除历史库存
      clearStatus([row])
    }
  })

  if (params.length) {
    const res = await request(params)
    if (res.data?.code === '0' && res.data?.data?.length) {
      const data = res.data.data
      data.forEach((item, index) => {
        if (item) {
          setSingleData(newRows[index], item)
        } else {
          clearStatus([newRows[index]])
        }
      })
      successCb && successCb()
    } else {
      clearStatus(newRows)
    }
  }
}
