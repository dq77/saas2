import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
export default ({
  formartChartData,
}) => {
  const {
    getSalesAmountSummary,
    getSalesAreaSummary,
    getAcquireLandAmountSummary,
    getAcquireLandAreaSummary,
    getAssetsSummary,
    getLiabilitiesSummary,
    getDebtRatioSummary,
    getNetProfitSummary,
    getSentimentWarning,
    getCompanyRiskLevel,
    getTopNews,
    getDailyReportList,
    getSubscribeThreeRedLine
  } = ajaxStore.factoryService.realEstate

  // 获取2021销售TOP5
  const { doResult: getSalesAmountTop, loading: salesVolumeTopLoading, result: salesVolumeTopResult } = useAsync({
    init: false,
    request: getSalesAmountSummary,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        return {
          data: data.slice(0, 5)
        }
      }
    }
  })
  // 获取舆情TOP10
  const { doResult: getSentimentWarningTop, loading: sentimentWarningTopLoading, result: sentimentWarningTopResult } = useAsync({
    init: false,
    request: getSentimentWarning
  })
  // 获取开发商风险榜单TOP
  const { doResult: getCompanyRiskLevelTop, loading: companyRiskLevelLoading, result: companyRiskLevelResult } = useAsync({
    init: false,
    request: getCompanyRiskLevel,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        return {
          data: data.records
        }
      }
    }
  })
  // 获取新闻TOP10
  const { doResult: getTopNewsList, loading: topNewsListLoading, result: topNewsListResult } = useAsync({
    init: false,
    request: getTopNews
  })
  // 获取行业舆情日报
  const { doResult: getDailyReport, loading: dailyReportListLoading, result: dailyReportListResult } = useAsync({
    init: false,
    request: getDailyReportList,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        return {
          data: data.records
        }
      }
    }
  })
  // 获取销售额排名
  const { doResult: getSalesAmount, loading: salesVolumeLoading } = useAsync({
    init: false,
    request: getSalesAmountSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('salesVolume', data)
      }
    }
  })
  // 获取销售面积排名
  const { doResult: getSalesArea, loading: salesAreaLoading } = useAsync({
    init: false,
    request: getSalesAreaSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('salesArea', data)
      }
    }
  })
  // 获取拿地额排名
  const { doResult: getAcquireLandAmount, loading: landTakenAmountLoading } = useAsync({
    init: false,
    request: getAcquireLandAmountSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('landTakenAmount', data)
      }
    }
  })
  // 获取拿地面积排名
  const { doResult: getAcquireLandArea, loading: landTakenAreaLoading } = useAsync({
    init: false,
    request: getAcquireLandAreaSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('landTakenArea', data)
      }
    }
  })
  // 获取总资产排名
  const { doResult: getAssets, loading: assetsLoading } = useAsync({
    init: false,
    request: getAssetsSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('assets', data)
      }
    }
  })
  // 获取总负债排名
  const { doResult: getLiabilities, loading: liabilitiesLoading } = useAsync({
    init: false,
    request: getLiabilitiesSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('liabilities', data)
      }
    }
  })
  // 获取净利润排名
  const { doResult: getNetProfit, loading: netProfitLoading } = useAsync({
    init: false,
    request: getNetProfitSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('netProfit', data)
      }
    }
  })
  // 获取负债率排名
  const { doResult: getDebtRatio, loading: debtRatioLoading } = useAsync({
    init: false,
    request: getDebtRatioSummary,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        formartChartData('debtRatio', data)
      }
    }
  })
  // 获取三条红线对比
  const { doResult: doSubscribeThreeRedLineResult, loading: subscribeThreeRedLineLoading, result: subscribeResult } = useAsync({
    init: false,
    request: getSubscribeThreeRedLine
  })

  return {
    getSalesAmount,
    getSalesArea,
    getAcquireLandAmount,
    getAcquireLandArea,
    getAssets,
    getLiabilities,
    getNetProfit,
    getDebtRatio,
    salesVolumeLoading,
    salesAreaLoading,
    landTakenAmountLoading,
    landTakenAreaLoading,
    assetsLoading,
    liabilitiesLoading,
    netProfitLoading,
    debtRatioLoading,
    getSalesAmountTop,
    salesVolumeTopLoading,
    salesVolumeTopResult,
    getSentimentWarningTop,
    sentimentWarningTopLoading,
    sentimentWarningTopResult,
    getCompanyRiskLevelTop,
    companyRiskLevelLoading,
    companyRiskLevelResult,
    getTopNewsList,
    topNewsListLoading,
    topNewsListResult,
    getDailyReport,
    dailyReportListLoading,
    dailyReportListResult,
    doSubscribeThreeRedLineResult,
    subscribeThreeRedLineLoading,
    subscribeResult
  }
}
