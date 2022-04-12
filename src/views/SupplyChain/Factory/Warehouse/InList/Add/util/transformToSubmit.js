// 转换出用于提交的基本信息form数据
export const transformBaseInfoToSubmit = (data) => {
  const { warehouseId, storageType, outboundType, businessDatetime, reason } = data
  const res = {
    warehouseId,
    storageType: storageType ? Number(storageType) : undefined,
    outboundType: outboundType ? Number(outboundType) : undefined,
    businessDatetime,
    reason
  }
  return res
}

// 转换出用于提交的产品行table数据
export const transformProductDataToSubmit = (tableData) => {
  const rows = []
  tableData.forEach(row => {
    // 产品属性
    const extendData = row.extendData?.map(item => {
      return {
        name: item.name,
        nameId: item.value.spuAttributeId,
        value: '@@' + item.key,
        valueId: item.value.id, // 选中值的id
        valueName: item.value.label // 选中值的name
      }
    })
    // 新数据
    const newRow = {
      categoryId: row.categoryId,
      goodsId: row.goodsId,
      goodsName: row.goodsName,
      mainPicPath: row.mainPicPath,
      specification: row.specification,
      goodsQuantity: row.goodsQuantity,
      productSn: row.productSn,
      unitName: row.unitName,
      extendData,
      unitStockPrice: 0, // 固定传0
    }
    rows.push(newRow)
  })
  return rows
}
