import { computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message, MessageBox } from 'element-ui'

export default ({ successHandle }) => {
  // ajax
  const { receive: { getPayList, deletePay } } = ajaxStore
  // 获取款项列表
  const { doResult: getList, result, loading } = useAsync({
    request: getPayList,
    init: false
  })
  // 调整计划获取款项列表
  const { doResult: getAjustlist } = useAsync({
    request: getPayList,
    init: false
  })
  // 数据优化
  const dataSource = computed(() => result.value ?? [])
  // 删除款项
  const { doResult: deleteHandle } = useAsync({
    request: deletePay,
    init: false,
    successCallBack: res => {
      const { code } = res ?? {}
      if (code === '0') {
        Message.success('删除成功')
        successHandle()
      }
    }
  })
  // 删除弹框
  const detele = detail => {
    MessageBox.confirm('确认删除？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '关闭',
      type: 'warning',
      roundButton: true
    }).then(() => {
      deleteHandle({ saArmReceivablePlanItemId: detail ? detail.id : '' })
    })
  }

  return {
    getList,
    getAjustlist,
    loading,
    dataSource,
    deleteHandle,
    detele
  }
}
