import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function() {
  const state = reactive({
    dataList: []
  })
  const { doResult: getBarData, loading } = useAsync({
    request: ajaxStore.riskExperts.workbench.getCustomerRiskReason,
    init: false,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data?.resonList ?? []
        state.dataList = data.map(item => {
          return {
            riskName: item.riskSubClassName,
            riskNum: item.eventCount
          }
        })
      }
    }
  })

  return {
    loading,
    ...toRefs(state),
    getBarData,
  }
}
