import { computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default ({
  callBack
} = {}) => {
  // ajax
  const { receive: { createPay, getPayDetail, updatePay } } = ajaxStore
  // 创建接口
  const { doResult: createHandle, loading: createLoading } = useAsync({
    request: createPay,
    init: false,
    successCallBack: res => {
      const { code } = res ?? {}
      if (code === '0') {
        Message.success('添加成功')
        callBack && callBack()
      }
    }
  })
  // 修改款项接口
  const { doResult: updateHandle, loading: updateLoading } = useAsync({
    request: updatePay,
    init: false,
    successCallBack: res => {
      const { code } = res ?? {}
      if (code === '0') {
        Message.success('编辑成功')
        callBack && callBack()
      }
    }
  })
  // 获取款项详情
  const { doResult: getDetail, result } = useAsync({
    request: getPayDetail,
    init: false
  })
  // 数据优化
  const detailInfo = computed(() => result.value ?? {})

  return {
    createHandle,
    updateHandle,
    getDetail,
    createLoading,
    updateLoading,
    detailInfo
  }
}
