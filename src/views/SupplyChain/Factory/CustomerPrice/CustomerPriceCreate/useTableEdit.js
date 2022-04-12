import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  routeType,
  customerId,
  tableState
}) {
  let rowId = 1 // 自定义的行标记
  const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

  const normalizeRow = (row = {}) => {
    !hasOwnProperty(row, '__id') && (row.__id = rowId++) // 编辑的时候可以通过__id来区分不同的行
    !hasOwnProperty(row, 'productNameOptions') && (row.productNameOptions = []) // 产品名称的模糊搜索项的缓存
    !hasOwnProperty(row, 'productSnOptions') && (row.productSnOptions = []) // 产品型号的模糊搜索项的缓存
    !hasOwnProperty(row, 'productNameLoading') && (row.productNameLoading = false) // 表格中产品名模糊查询的loading
    !hasOwnProperty(row, 'productSnLoading') && (row.productSnLoading = false) // 表格中产品型号模糊查询的loading
    return row
  }
  const addRow = () => {
    tableState.addRow(normalizeRow, true)
  }

  // 表格元素select事件处理函数
  const cellChangeHandle = (val, key, row) => {
    if (['name', 'productSn'].indexOf(key) > -1) {
      if (val) { // 输入值时
        const obj = JSON.parse(val)
        row.goodsId = obj.id
        row.mainPicPath = obj.mainPicPath
        row.name = obj.name
        row.productSn = obj.productSn
        row.categoryName = obj.categoryName
        row.unitName = obj.unitName
        row.specification = obj.specification
        row.basePrice = obj.basePrice
        row.price = ''
      } else {
        row.goodsId = ''
        row.mainPicPath = ''
        row.name = ''
        row.productSn = ''
        row.categoryName = ''
        row.unitName = ''
        row.specification = ''
        row.basePrice = ''
        row.price = ''
      }
    } else if (key === 'price') {
      row.price = val
    }
  }

  const { doResult: getDetail, loading } = useAsync({
    init: false,
    request: ajaxStore.factory.getCustomerPriceProductList,
    successCallBack(res) {
      if (res.code === '0') {
        res.data.pagedRecords.forEach(item => normalizeRow(item))
        tableState.resetDataSource(res.data.pagedRecords)
      }
    }
  })

  if (['edit', 'detail'].indexOf(routeType) > -1 && customerId) {
    getDetail({ customerId, pageSize: 1000 })
  }

  return {
    loading,
    addRow,
    cellChangeHandle,
  }
}
