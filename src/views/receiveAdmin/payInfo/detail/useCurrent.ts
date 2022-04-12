import { onMounted, nextTick } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { statusInfo } from '@/views/receiveAdmin/components/list/config'

export default ({
  id,
  saArmReceivablePlanId,
  chartApis,
  getOptions
}) => {
  // ajax
  const { receive: { getPlainDetail, getPayDetail } } = ajaxStore
  // 判断状态
  const getStatus = item => {
    const { overdueStatus, repayStatus } = item ?? {}
    return repayStatus === 2 ? 2 : overdueStatus === 2 ? 3 : 1
  }
  // 获取主计划详情接口
  const { result: plainResult, loading: plainLoading } = useAsync({ request: getPlainDetail, params: { saArmReceivablePlanId } })
  // 获取款项详情
  const { result: payResult, doResult: payHandle, loading: payLoading } = useAsync({
    request: getPayDetail,
    init: false,
    params: { saArmReceivablePlanItemId: id },
    successCallBack: res => {
      const { code, data } = res ?? {}
      if (code === '0') {
        const { returnedProportion } = data ?? {}
        const percent = (returnedProportion || 0) / 100
        const options = getOptions(percent ?? 0, statusInfo[getStatus(data)].color)
        chartApis.setOption(options)
        nextTick(() => chartApis.chartInit())
      }
    }
  })
  onMounted(() => payHandle())

  return {
    plainLoading,
    payLoading,
    plainResult,
    payResult
  }
}
