// import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'
import { Message } from 'element-ui'
import ajaxStore from '@/apis'
import { debounce } from '@/utils/util'
import { normalizeOrderRow } from '@/utils/qjd/supplyChain/tools'
import { checkRepeatProduct, checkRepeatAttrs } from '@/utils/qjd/supplyChain/orderEdit'
import batchCaclulate from '@/utils/qjd/supplyChain/batchCaclulateForOrder'
import useInventory from './useInventory'

export default function ({
  tableState,
  orderId, // 详情查询需要
}) {
  const inventoryState = useInventory()

  // 组件状态，初始状态来源于函数初次被调用
  const state = reactive({
    customerId: '',
    projectId: '',
    purchaseType: null,
    batchCaclulateLoading: false,
    inventoryState,
  })

  // 新增单行
  const addRow = () => {
    tableState.addRow(normalizeOrderRow, true)
  }
  // 删除选中行
  const delSelectedRows = () => {
    tableState.delSelectedRows('__id')
  }

  // 根据产品名称、产品型号查询条件获取产品options
  const getProductOptions = debounce(async (query, key, row) => {
    row.productLoading = true
    const res = await ajaxStore.factory.getProductRelateOrderList({
      [key]: query || '',
      pageNo: '1',
      pageSize: 10,
      customerId: state.customerId,
      projectId: state.projectId,
    })
    row.productLoading = false
    if (res.data && res.data.code === '0') {
      const pagedRecords = res.data.data.pagedRecords
      row.productOptions = pagedRecords && pagedRecords.length && pagedRecords.map(item => {
        return {
          value: {
            goodsId: item.goodsId,
            name: item.name,
            mainPicPath: item.mainPicPath,
            productSn: item.productSn,
            specification: item.specification,
            unitName: item.unitName,
            extendData: item.extendAttribute && item.extendAttribute.map(attribute => {
              attribute.loading = false
              return attribute
            }),
            // 如果intervalPrice为null，则goodsPrice可以编辑，否则不能编辑，且goodsPrice的显示通过getGoodsPrice得到
            intervalPrice: item.intervalPrice,
            price: item.price,
            addedCostPriceVOS: item.addedCostPriceVOS,
            activityId: item.activityId,
            marketingLogos: item.marketingLogos,
            marketingDiscount: item.marketingDiscount,
            marketingPrice: item.marketingPrice,
            marketingCount: item.marketingCount,
            marketingQuantity: item.marketingQuantity,
            originalPriceCount: item.originalPriceCount,
            overRestrictedStrategy: item.overRestrictedStrategy,
            isPurchaseRestricted: item.isPurchaseRestricted,
          }
        }
      })
    } else {
      row.productOptions = []
    }
  })
  // 根据产品属性查询条件获取产品属性options
  const getExtendAttributeOptions = debounce(async (query, key, attribute) => {
    attribute.loading = true
    const res = await ajaxStore.factory.getSpecsListRemote({
      name: query || '',
      attributeSpell: key,
      pageNo: '1',
      pageSize: 10,
    })
    attribute.loading = false
    if (res.data && res.data.code === '0') {
      attribute.options = res.data.data.pagedRecords.map(item => {
        return {
          value: {
            id: item.id, // 对应valueId
            label: item.name,
            Key: key,
            spuAttributeId: item.spuAttributeId // 对应nameId
          },
        }
      })
    } else {
      attribute.options = []
    }
  })

  // 产品名称、型号元素select事件处理函数
  const cellProductChangeHandle = (val, key, row, $index) => {
    function clearRow(row) {
      row.mainPicPath = ''
      row.name = ''
      row.productSn = ''
      row.specification = ''
      row.unitName = ''
      row.extendData = ''
      row.goodsPrice = 0
      row.quantity = 0
      row.addedCostPriceVOS = []
      row.payAmount = '- -'
      row.marketingLogos = false
    }
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
      row.name = val
      row.productSn = val
      row.specification = val.specification
      row.unitName = val.unitName
      row.extendData = val.extendData ? val.extendData.map(({ name, value }) => {
        return {
          label: name,
          value: {},
          key: value.substr(2),
          options: []
        }
      }) : []
      if (val.intervalPrice) {
        row.goodsPrice = val.price
      } else {
        row.goodsPrice = null
      }
      row.quantity = 0
      row.addedCostPriceVOS = val.addedCostPriceVOS.map(({ code, name, price, fee }) => {
        return {
          code, name, singleFee: price, fee // fee用于后端校验，批量计算时得出，前端无用
        }
      })
      row.payAmount = 0
      row.activityId = val.activityId // 活动id
      row.marketingLogos = val.marketingLogos // 是否有折扣
      row.marketingDiscount = val.marketingDiscount // 折扣
      row.marketingPrice = val.marketingPrice // 折后单价
      row.marketingCount = val.marketingCount // 剩余折扣数量
      row.marketingQuantity = val.marketingQuantity // 折扣价数量
      row.originalPriceCount = 0 // 原价数量
      row.overRestrictedStrategy = val.overRestrictedStrategy // 超限策略
      row.isPurchaseRestricted = val.isPurchaseRestricted // 是否限购，“Y”表示限购
    } else {
      clearRow(row)
    }
    inventoryState.setCurrentInventorys({ rows: [row] })
  }

  // 产品名称、产品型号 focus事件
  const cellProductFocusHandle = (key, row) => {
    if (!row[key]) getProductOptions('', key, row)
  }
  // 产品属性 foucs事件
  const cellExtendAttributeFocusHandle = (key, row) => {
    if (!row[key]) getExtendAttributeOptions('', key, row)
  }

  // 表格通用的单元格change事件
  const cellChangeHandle = (val, key, row, $index, attribute) => {
    if (key === 'extendData') { // 每种产品属性变化后
      if (checkRepeatAttrs({
        currentRow: row,
        currentIndex: $index,
        dataSource: tableState.dataSource
      })) {
        attribute.value = null
        Message.warning('产品信息不能重复')
        return false
      }
      inventoryState.setCurrentInventorys({ rows: [row], orderId })
    } else if (key === 'addedCostPriceVOS') { // 每种附加费变化后触发价格计算
      calculateRowPrice(row)
    } else if (key === 'goodsPrice') { // 产品单价变化后触发价格计算
      calculateRowPrice(row)
    } else if (key === 'quantity') { // 数量变更后触发价格计算
      if (val === undefined) row.quantity = 0
      calculateRowPrice(row)
    }
  }

  // 单行相关字段变更后，后端计算单价和总价
  const calculateRowPrice = debounce(
    async (row) => {
      state.batchCaclulateLoading = true
      await batchCaclulate({
        rows: row,
        customerId: state.customerId,
        projectId: state.projectId,
        request: ajaxStore.factory.calculatePriceBacth
      })
      state.batchCaclulateLoading = false
    }
  )

  // 获取行的数量最大值
  const getMaxQuantity = (row) => {
    let maxInventory = Infinity
    let maxMarketing = Infinity
    // 如果需要校验库存
    if (inventoryState.needShowInvenstory && inventoryState.needCheckInventory) {
      maxInventory = typeof row.stockQuantity === 'number' ? row.stockQuantity : 0
    }
    // 如果需要校验营销
    if (row.marketingLogos &&
      row.isPurchaseRestricted === 'Y' &&
      row.overRestrictedStrategy === 'REJECT_PURCHASE'
    ) {
      maxMarketing = row.marketingCount
    }
    return Math.min(maxInventory, maxMarketing)
  }

  // 用于给组件重置所选的经销商和项目，因为产品选择、价格计算基于此
  const resetBaseInfo = (baseInfo) => {
    state.purchaseType = baseInfo?.purchaseType ?? ''
    state.customerId = baseInfo?.customerId?.customerId ?? ''
    state.projectId = baseInfo?.projectId?.projectId ?? ''
  }

  // 用于给父组件获取表格数据
  const getTableData = () => {
    return tableState.dataSource
  }

  // 用于给父组件清除表格数据
  const clearTableData = () => {
    tableState.clearHandle()
  }

  // 用于给父组件重置表格数据，适用草稿数据
  const initCacheTableData = async (newData) => {
    newData.forEach(item => normalizeOrderRow(item))
    await batchCaclulate({
      rows: newData,
      customerId: state.customerId,
      projectId: state.projectId,
      request: ajaxStore.factory.calculatePriceBacth
    })
    tableState.resetDataSource(newData)
  }
  // 用于给父组件重置表格数据，适用编辑数据
  const initEditTableData = (newData) => {
    tableState.resetDataSource(newData)
  }

  // 单元格样式
  const cellStyle = () => {
    return {
      'vertical-align': 'top'
    }
  }

  return {
    ...toRefs(state),
    addRow,
    delSelectedRows,
    getProductOptions,
    getExtendAttributeOptions,
    cellProductChangeHandle,
    cellChangeHandle,
    cellProductFocusHandle,
    cellExtendAttributeFocusHandle,
    cellStyle,
    getMaxQuantity,
    resetBaseInfo,
    getTableData,
    clearTableData,
    initEditTableData,
    initCacheTableData,
  }
}
