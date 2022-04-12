import { reactive, toRefs } from '@vue/composition-api'
import { Message } from 'element-ui'
import isEmpty from 'lodash/isEmpty'
import ajaxStore from '@/apis'
import { normalizeRow } from '../util'
import queryInventory from './queryInventory'
import { checkRepeatProduct, checkRepeatAttrs } from '@/utils/qjd/supplyChain/warehouse'


export default function ({
  tableState,
  name,
}) {
  const state = reactive({
    warehouseId: ''
  })
  // 新增单行
  const addRow = () => {
    if (name === 'outAdd' && !state.warehouseId) {
      Message.error('请先选择仓库')
      return
    }
    tableState.addRow(normalizeRow, true)
  }
  const { listByGoods, listBy } = ajaxStore.factory

  // 根据产品名称、产品型号查询条件获取产品options
  const getProductOptions = async (val, row) => {
    row.productLoading = true
    let res
    if (name === 'inAdd') {
      res = await listByGoods({
        goodsNameOrProductSn: val || '',
        pageNo: 1,
        pageSize: 10,
      })
    } else {
      res = await listBy({
        warehouseId: state.warehouseId,
        goodsNameProductSnLike: val || '',
        pageNo: 1,
        pageSize: 10,
      })
    }
    row.productLoading = false
    if (res?.data?.code === '0') {
      const pagedRecords = res.data.data
      // 获取到产品名称、产品型号所需数据
      row.productOptions = pagedRecords?.map(item => {
        return {
          value: {
            goodsId: item.goodsId || item.id, // 出库的商品id取goodsId
            categoryId: item.categoryId,
            name: item.name || item.goodsName,
            mainPicPath: item.mainPicPath,
            productSn: item.productSn, // 型号
            extendData: item.extendData?.map(attribute => { // 属性
              attribute.loading = false
              return attribute
            }),
            specification: item.specification, // 规格
            unitName: item.unitName,
          }
        }
      })
      // resetProductOptionsDisable()
    } else {
      row.productOptions = []
    }
  }

  // 产品名称、型号元素select事件处理函数
  const cellProductChangeHandle = (val, row, $index) => {
    function clearRow(row) {
      row.mainPicPath = ''
      row.goodsName = ''
      row.mainPicPath = ''
      row.goodsId = ''
      row.categoryId = ''
      row.productSn = ''
      row.specification = ''
      row.unitName = ''
      row.extendData = ''
      row.goodsQuantity = 0
    }
    // 这里的val是一个对象，因为option的value是一个对象
    if (val) { // 输入值时
      if (checkRepeatProduct({
        currentRow: row,
        currentIndex: $index,
        dataSource: tableState.dataSource
      })) {
        clearRow(row)
        Message.warning('产品信息不能重复')
        return false
      }
      row.mainPicPath = val.mainPicPath
      row.goodsName = val.name
      row.mainPicPath = val.mainPicPath
      row.goodsId = val.goodsId
      row.categoryId = val.categoryId
      row.productSn = val.productSn
      row.specification = val.specification
      row.unitName = val.unitName
      // 产品属性的初始值
      row.extendData = val.extendData?.map(({ name, value }) => {
        return {
          name,
          value: {},
          key: value.substr(2),
          options: []
        }
      }) || []
      row.goodsQuantity = 0
    } else {
      clearRow(row)
    }
    queryInventory({
      row,
      warehouseId: state.warehouseId,
      request: ajaxStore.factory.searchInventoryNum,
    })
  }

  // 根据产品属性查询条件获取产品属性options
  const getExtendAttributeOptions = async (val, key, attribute) => {
    attribute.loading = true
    const params = {
      name: val || '',
      attributeSpell: key,
      pageNo: '1',
      pageSize: 10,
    }
    if (name === 'outAdd') {
      // 如果是出库登记页面，传参需要加上仓库id，因为查询的sku要看仓库里有没有
      state.warehouseId && (params.warehouseId = state.warehouseId)
      params.defaultAttribute = '2' // 2有选项“无”，1没有选项“无”
    }
    const res = await ajaxStore.factory.getSpecsListRemote(params)
    attribute.loading = false
    if (res.data && res.data.code === '0') {
      attribute.options = res?.data?.data?.pagedRecords.map(item => {
        return {
          value: {
            id: item.id, // 对应valueId
            label: item.name,
            key: key,
            spuAttributeId: item.spuAttributeId // 对应nameId
          },
        }
      })
    } else {
      attribute.options = []
    }
  }

  // 产品名称、产品型号 focus事件
  const cellProductFocusHandle = (key, row) => {
    if (!row[key]) getProductOptions('', row)
  }
  // 产品属性 foucs事件
  const cellExtendAttributeFocusHandle = (key, row) => {
    if (isEmpty(row.value)) getExtendAttributeOptions('', key, row)
  }

  // 表格通用的单元格change事件
  const cellChangeHandle = (val, key, row, $index, attribute) => {
    if (key === 'goodsQuantity') { // 数量变更后触发数量计算
      if (val === undefined) row.goodsQuantity = 0
    } else if (key === 'extendData') {
      if (checkRepeatAttrs({
        currentRow: row,
        currentIndex: $index,
        dataSource: tableState.dataSource
      })) {
        attribute.value = null
        Message.warning('产品信息不能重复')
        return false
      }
      queryInventory({
        row,
        warehouseId: state.warehouseId,
        request: ajaxStore.factory.searchInventoryNum,
      })
    }
  }

  // 用于给父组件获取表格数据
  const getTableData = () => {
    return tableState.dataSource
  }

  // 用于给父组件清除表格数据
  const clearTableData = () => {
    tableState.clearHandle()
  }

  // 用于给父组件重置表格数据，适用编辑数据
  const initEditTableData = (newData) => {
    tableState.resetDataSource(newData)
  }

  const setWarehouseId = (v) => {
    state.warehouseId = v
  }

  return {
    ...toRefs(state),
    addRow,
    getProductOptions,
    getExtendAttributeOptions,
    cellProductChangeHandle,
    cellChangeHandle,
    cellProductFocusHandle,
    cellExtendAttributeFocusHandle,
    getTableData,
    clearTableData,
    initEditTableData,
    setWarehouseId,
  }
}
