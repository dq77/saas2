import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const {
    realestate: { getStockPledgeRatio, getStockPledgeTrend },
  } = ajaxStore

  // 接口
  const {
    loading: summaryLoading,
    doResult: doSummaryResult,
    result: summaryResult
  } = useAsync({
    request: getStockPledgeRatio,
    init: false,
    callback: res => {
      const { data: {code, data} } = res
      const pledgeMarketValue = data?.proportion?.pledgeMarketValue
      const newPledgeMarketValue = pledgeMarketValue ? parseFloat(pledgeMarketValue / 100000000).toFixed(2) : ''
      if (code === '0') {
        return {
          data: {
            ...data.proportion,
            pledgeMarketValue: newPledgeMarketValue
          }
        }
      }
    }
  })
  const {
    loading: trendLoading,
    doResult: doTrendResult,
    result: trendTesult
  } = useAsync({
    request: getStockPledgeTrend,
    init: false
  })

  return {
    summaryLoading,
    trendLoading,
    doSummaryResult,
    doTrendResult,
    summaryResult,
    trendTesult
  }
}
