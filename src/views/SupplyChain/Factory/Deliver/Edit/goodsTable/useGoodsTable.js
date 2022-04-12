import { reactive, toRefs } from '@vue/composition-api' // reactive
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { debounce } from '@/utils/util'
import { deepCopy } from '@/utils/qjd'
import batchCalculate from '@/utils/qjd/supplyChain/batchCalculateForDeliver'
import { columns } from './config'

export default function ({
  orderId,
  deliverId,
  paramFlag,
  paramUpdateFlag,
  routeName,
}) {
  const state = reactive({
    warehouseId: '', // 仓库ID
    warehouseName: '', // 仓库名字
    delivered: 0, // 本次发货总价
    undelivered: 0, // 剩余发货总价
    columns,
    tableList: [],
    batchCalculateLoading: false, // 批量计算总loading
    summary: {
      productSum: 0,
      priceSum: [
        { label: '本次发货总价', value: 0 },
        { label: '剩余发货总价', value: 0 },
      ]
    }
  })

  // 接口，获取产品列表
  const params = {
    id: routeName === 'deliverCreate' ? orderId : deliverId,
    flag: paramFlag,
    updateFlag: paramUpdateFlag
  }
  const { doResult: getGoodsList, loading: getGoodsListloading } = useAsync({
    request: ajaxStore.factory.getCreateCargoList,
    params,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const tableList = res?.data ?? []
        for (let i = 0; i < tableList.length; i++) {
          tableList[i]._maxDeliver = calculateMaxDeliver(tableList[i])
          tableList[i].batchCalculateLoading = false
        }
        state.tableList = deepCopy(tableList)
        state.summary.productSum = tableList.length
        calculateTotalAmount()
      }
    }
  })

  // 获取本次发货数量最大值
  const calculateMaxDeliver = (row) => {
    if (state.warehouseId) { // 如果有仓库
      return Math.min(row.noDeliverCount, Number(row.warehouseQuantity))
    } else {
      return row.noDeliverCount
    }
  }

  // 计算单行总价：本次发货总价、剩余应发总价
  const debounceBatchCalculate = debounce(async (rows) => {
    state.batchCalculateLoading = true
    await batchCalculate({
      rows,
      request: ajaxStore.factory.calculateDeliverPrice,
      successCb: calculateTotalAmount
    })
    state.batchCalculateLoading = false
  })

  // 计算整表总价
  const calculateTotalAmount = () => {
    let delivered = 0 // 本次发货总价
    let undelivered = 0 // 剩余发货总价
    state.tableList.forEach(row => {
      delivered += row.currentDeliverTotalPrice
      undelivered += row.residueTotalPrice
    })
    state.summary.priceSum[0].value = delivered
    state.summary.priceSum[1].value = undelivered
  }

  // 变更发货数量后计算单行总价
  const changeDeliverCount = async (v, row) => {
    debounceBatchCalculate(row)
  }

  // 点击单行的全部发货
  const clickDeliverAllInRow = async (row) => {
    const { _maxDeliver, noDeliverCount } = row
    if (state.warehouseId) { // 如果有仓库，不得大于库存
      row.currentDeliverCount = noDeliverCount > _maxDeliver ? _maxDeliver : noDeliverCount
    } else {
      row.currentDeliverCount = noDeliverCount
    }
    debounceBatchCalculate(row)
  }

  // 点击一键发货
  const clickDeliverAll = async () => {
    state.tableList.forEach(row => {
      const { _maxDeliver, noDeliverCount } = row
      if (state.warehouseId) { // 如果有仓库，不得大于库存
        row.currentDeliverCount = noDeliverCount > _maxDeliver ? _maxDeliver : noDeliverCount
      } else {
        row.currentDeliverCount = noDeliverCount
      }
    })
    debounceBatchCalculate(state.tableList)
  }

  // 单元格样式
  const cellStyle = () => {
    return {
      'vertical-align': 'top'
    }
  }

  // 用于父组件调用，提取编辑或创建数据
  const getEditData = () => {
    const res = []
    state.tableList.forEach(item => {
      const obj = {
        deliverId: item.deliverId, // 发货id
        deliverQuantity: item.currentDeliverCount, // 发货数量
        extOrderItemId: item.extId, // 外部订单明细Id
        orderItemId: item.orderItemId, // 订单明细id
      }
      if (routeName === 'deliverEdit') {
        obj.id = item.deliverItemId
      }
      res.push(obj)
    })
    return res
  }

  const showWarehouse = (v) => {
    const setedIndex = state.columns.findIndex(col => col.key === 'warehouseQuantity')
    if (v && setedIndex < 0) { // 需设置但未设置过
      state.columns.splice(
        -4,
        0,
        {
          label: '库存数量',
          key: 'warehouseQuantity',
          minWidth: 80,
          fixed: 'right',
          render: (row, value) => value > 0 ? value : 0
        }
      )
    } else if (!v && setedIndex >= 0) { // 不需设置但设置过
      state.columns.splice(setedIndex, 1)
    }
  }

  // 用于父组件调用，变更仓库后需要增加库存数据的显示
  const changeWareHouse = (warehouseId, warehouseName) => {
    state.warehouseId = warehouseId
    state.warehouseName = warehouseName
    getGoodsList({ warehouseId })
  }

  return {
    getGoodsListloading,
    // calculateLoading,
    ...toRefs(state),
    cellStyle,
    getGoodsList,
    changeDeliverCount,
    clickDeliverAllInRow,
    clickDeliverAll,
    getEditData,
    showWarehouse,
    changeWareHouse,
  }
}
