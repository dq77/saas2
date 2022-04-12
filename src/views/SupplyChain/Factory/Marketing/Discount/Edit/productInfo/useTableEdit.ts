import ajaxStore from '@/apis'
import { normalizeRow } from './util'
import { Message } from 'element-ui'
import useDebounce from 'hooks/useDebounce'
import useAsync from 'hooks/useAsync'
export default function ({
  tableState
}) {
  // 新增单行
  const addRow = (): void => {
    tableState.addRow(normalizeRow, true)
  }
  const { factory: { listByGoods } } = ajaxStore
  // 查询产品接口
  const { doResult } = useAsync({ request: listByGoods, init: false })
  // useDebounce
  const { run } = useDebounce()
  // 根据产品名称、产品型号查询条件获取产品options
  // 查询产品
  const getProductOptions = (query: string, row: any): void => {
    row.productLoading = true
    run(() => doResult({ goodsNameOrProductSn: query }).then((res: any) => {
      row.productLoading = false
      const { code, data } = res ?? {}
      if (code === '0') {
        const pagedRecords = data
        // 获取到产品名称、产品型号所需数据
        row.productOptions = pagedRecords?.map(item => {
          return {
            value: {
              goodsId: item.id, // 出库的商品id取goodsId
              goodsName: item.name,
              mainPicPath: item.mainPicPath,
              productSn: item.productSn, // 型号
              specification: item.specification, // 规格
              unitName: item.unitName,
              discountRate: item.discountRate || undefined
            }
          }
        })
      } else {
        row.productOptions = []
      }
    }), 500)
  }

  // 产品名称、型号元素select事件处理函数
  const cellProductChangeHandle = (val: any, row: any): void | boolean => {
    if (!val) {
      row.mainPicPath = ''
      row.goodsName = ''
      row.mainPicPath = ''
      row.goodsId = ''
      row.productSn = ''
      row.specification = ''
      row.unitName = ''
      row.discountRate = undefined
      return false
    }
    const productOptions = row.productOptions
    if (val === row.selected) return false
    if (tableState.dataSource.some(el => el.goodsId === val && el.goodsId !== row.selected)) {
      if (!row.goodsId) {
        row.goodsName = ''
        row.productSn = ''
      } else {
        const item = productOptions.find(n => n.value.goodsId === row.selected)
        row.goodsName = item.value?.goodsId ?? ''
        row.productSn = item.value?.goodsId ?? ''
        console.log(row.goodsName, row.productSn)
      }
      Message.warning(`[${productOptions.find(n => n.value.goodsId === val)?.value.goodsName}]已添加过该产品`)
      return false
    }
    const tempVal = productOptions.find(n => n.value.goodsId === val)
    // 这里的val是一个对象，因为option的value是一个对象
    if (val) { // 输入值时
      row.mainPicPath = tempVal.value.mainPicPath
      row.goodsName = tempVal.value.goodsId
      row.mainPicPath = tempVal.value.mainPicPath
      row.goodsId = tempVal.value.goodsId
      row.productSn = tempVal.value.goodsId
      row.specification = tempVal.value.specification
      row.unitName = tempVal.value.unitName
      row.discountRate = tempVal.value.discount
    }
  }

  // 产品名称、产品型号 focus事件
  const cellProductFocusHandle = (key, row): void => {
    if (!row[key]) getProductOptions('', row)
  }
  // 赋值数据
  const initCacheTableData = (newData): void => {
    newData.forEach(item => normalizeRow(item))
    tableState.resetDataSource(newData)
  }
  const show = (v: boolean, row: any): void => v && (row.selected = row.goodsId)
  return {
    addRow,
    getProductOptions,
    cellProductChangeHandle,
    cellProductFocusHandle,
    initCacheTableData,
    show
  }
}
