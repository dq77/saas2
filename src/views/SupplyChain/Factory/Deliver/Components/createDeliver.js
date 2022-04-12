const itemCostFeeFunc = (row) => {
  return row.addCostPriceList && row.addCostPriceList.reduce((prev, curr) => {
    return Number(curr.singleFee) + Number(prev)
  }, 0)
}
export const handleChangeNumber = (val, row, column) => {
  const itemCostFee = itemCostFeeFunc(row)
  row.currentDeliverCount = Number(val)
  row.currentDeliverTotalPrice = Number(((itemCostFee + row.price) * val).toFixed(2)) // 本次发货总价
  row.residueTotalPrice = Number((row.noDeliverTotalPrice - row.currentDeliverTotalPrice).toFixed(2)) // 剩余应发总价
}
export const deliverHandler = (dataSource, getMaxValue) => {
  dataSource.map(row => {
    // handleChangeNumber(row.noDeliverCount, row)
    handleChangeNumber(getMaxValue(row), row)
  })
}
