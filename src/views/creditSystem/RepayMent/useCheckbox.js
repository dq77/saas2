import { ref } from '@vue/composition-api'

export default ({
  tableState
}) => {
  // 临时数据，用来触发table更新
  // const isError = ref(false)
  // 存储选中数据
  const selectDatas = ref([])
  // 校验关单金额
  const validate = (row = null) => {
    // isError.value = !isError.value
    const { dataSource } = tableState
    if (row) {
      // 单独校验
      const { id, backAmount } = row
      const isError = (!backAmount && backAmount !== 0)
      const current = dataSource.find(item => item.id === id)
      current.isError = isError
      if (isError) return false
      return true
    } else {
      // 批量校验
      const filterDatas = selectDatas.value.filter(item => (!item.backAmount && item.backAmount !== 0)) || []
      const ids = filterDatas ? filterDatas.map(item => item.id) : []
      dataSource && dataSource.forEach(item => {
        if (ids.includes(item.id)) {
          item.isError = true
        } else {
          item.isError = false
        }
      })
      if (filterDatas.length) return false
      return true
    }
  }
  // 单选checkbox置空数据并重置校验
  const selectHandle = ({ row }) => {
    row.backAmount = undefined
    row.isError = false
  }
  // 全选置空数据并重置校验
  const selectAll = () => {
    const { dataSource } = tableState
    dataSource && dataSource.forEach(item => {
      // 取消校验&置空关单金额
      item.backAmount = undefined
      item.isError = false
    })
  }
  // checkbox勾选数据发生变化时
  const selectionHandle = (selection) => {
    selectDatas.value = selection || []
    const { dataSource } = tableState
    const ids = selection ? selection.map(item => item.id) : []
    dataSource && dataSource.forEach(item => {
      // 设置是否选中状态
      if (ids.includes(item.id)) {
        item.isCheck = true
      } else {
        item.isCheck = false
      }
    })
  }

  return {
    selectDatas,
    selectionHandle,
    validate,
    // isError,
    selectHandle,
    selectAll
  }
}
