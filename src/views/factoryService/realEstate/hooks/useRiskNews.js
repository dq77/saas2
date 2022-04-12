import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { ref } from '@vue/composition-api'

export default () => {
  const { getRiskDistributionSummary, getStockPledgeSummary } = ajaxStore.factoryService.realEstate

  const riskSummary = ref({})

  // 接口
  const riskAsync = useAsync({
    request: getRiskDistributionSummary,
    init: false,
    successCallBack: ({ data }) => {
      // 计算原告、被告占比
      const { defendantCount, plaintiffCount } = data
      const all = defendantCount + plaintiffCount
      data.defendantRate = all ? defendantCount / all : 0
      data.plaintiffRate = all ? plaintiffCount / all : 0
      riskSummary.value = { ...riskSummary.value, ...data }
    }
  })
  const doRiskResult = riskAsync.doResult
  const { loading, doResult } = useAsync({
    request: getStockPledgeSummary,
    init: false,
    successCallBack: ({ data }) => {
      riskSummary.value = { ...riskSummary.value, ...{stockPledge: data} }
    }
  })

  return {
    loading,
    doRiskResult,
    doResult,
    riskSummary
  }
}
