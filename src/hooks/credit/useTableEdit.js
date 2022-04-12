// 赊销table编辑公共逻辑
import { ref } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'

export default ({
  tableApis,
  dataSample
}) => {
  // 是修改还是新增
  const isAdd = ref(true)
  // 编辑状态
  const status = ref(null)
  // 缓存编辑前数据
  const cpRow = ref({})
  // add
  const addHandle = () => {
    status.value = 'edit'
    isAdd.value = true
    tableApis.addDataSource(deepCopy(dataSample))
  }
  // 编辑
  const editHandle = row => {
    cpRow.value[row.id] = deepCopy(row)
    row.customType = 'edit'
    isAdd.value = false
  }
  // 取消
  const cancleHandle = row => {
    if (!row.id) {
      !row.type && tableApis.deleteDataSource(row?._id)
      status.value = null
    }
    // 取消变更编辑状态
    row.customType = null
    // 取消还原数据
    const current = cpRow.value[row?.id] ?? {}
    Object.keys(current).forEach(key => { row[key] = current[key] })
  }

  return {
    cpRow,
    status,
    isAdd,
    editHandle,
    cancleHandle,
    addHandle
  }
}
