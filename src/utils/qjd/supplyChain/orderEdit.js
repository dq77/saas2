// 通过产品名称、型号检查是否选择了重复产品
export const checkRepeatProduct = ({currentRow, currentIndex, dataSource}) => {
  const arr = []
  dataSource.forEach((row, index) => {
    // 当前行不收集
    if (index === currentIndex) {
      return
    }
    // 对没有属性的产品进行去重
    const product = row?.name ?? row?.productSn ?? {}
    if (product?.goodsId && !row?.extendData?.length) {
      arr.push(product.goodsId)
    }
  })
  const currentProduct = currentRow?.name ?? currentRow?.productSn ?? {}
  return arr.indexOf(currentProduct?.goodsId) >= 0
}

// 通过产品属性检查是否选择了重复产品
export const checkRepeatAttrs = ({currentRow, currentIndex, dataSource}) => {
  // 是否填写完所有属性
  function isAttrsFull (row) {
    return row.extendData && row.extendData.every(item => item?.value?.id)
  }
  // 将多个属性id拼接起来，生成行id
  function getRowId (row) {
    return row.extendData.reduce((prev, curr) => {
      return prev + curr.value.id
    }, '')
  }
  const arr = []
  if (!isAttrsFull(currentRow)) {
    return false
  }
  dataSource.forEach((row, index) => {
    // 当前行不收集
    if (index === currentIndex) {
      return
    }
    if (isAttrsFull(row)) {
      arr.push(getRowId(row))
    }
  })
  return arr.indexOf(getRowId(currentRow)) >= 0
}
