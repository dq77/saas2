import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function() {
  const state = reactive({
    passTaskCount: '0', // 通过任务数
    passCustomerCount: '0', // 通过客户数
    rejectTaskCount: '0', // 拒绝任务数
    rejectCustomerCount: '0', // 拒绝客户数
    riskLevelCustomerCount: '0', // 风险评级总客户数
    chartCircle: [], // 环状图，客户风险评级分布
    taskList: [], // 柱状图，任务数
    customerList: [], // 柱状图，客户数
  })
  const { loading: circleLoading } = useAsync({
    request: ajaxStore.riskExperts.workbench.getCreditEvaluateResult1,
    init: true,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const {
          passCustomerCount,
          passTaskCount,
          rejectCustomerCount,
          rejectTaskCount,
          riskLevelResponses,
          riskLevelCustomerCount,
        } = res?.data ?? {}
        state.passCustomerCount = toAmountStr(passCustomerCount || 0, 0, true)
        state.passTaskCount = toAmountStr(passTaskCount || 0, 0, true)
        state.rejectCustomerCount = toAmountStr(rejectCustomerCount || 0, 0, true)
        state.rejectTaskCount = toAmountStr(rejectTaskCount || 0, 0, true)
        state.riskLevelCustomerCount = toAmountStr(riskLevelCustomerCount || 0, 0, true)
        state.chartCircle = riskLevelResponses.map(item => {
          return {
            name: item.riskLevel,
            percent: (item.customerCountProportion || 0) + '%',
            value: toAmountStr(item.customerTotalCount, 0, true)
          }
        })
      }
    }
  })

  const { doResult: getBarData, loading: barLoading } = useAsync({
    request: ajaxStore.riskExperts.workbench.getCreditEvaluateResult2,
    init: false,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? [] // 后端给出的数组顺序固定按快速、标准、精准来
        const taskList = []
        const customerList = []
        data.forEach(mode => {
          taskList.push(mode.totalTaskCount)
          customerList.push(mode.customerTotalCount)
        })
        state.taskList = taskList
        state.customerList = customerList
      }
    }
  })

  return {
    circleLoading,
    barLoading,
    ...toRefs(state),
    getBarData,
  }
}
