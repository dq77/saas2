import { yearList } from './config'

// 清空图表
export const clearCharts = (echarts) => {
  const doms = ['saleCharts', 'landTakenCharts', 'assetsLiabilitiesCharts', 'netProfitDebtRatioCharts']
  doms.map((item) => {
    document.getElementById(item) && echarts.dispose(document.getElementById(item))
  })
}

// 获取关注的公司并格式化，用于接口传参
export const getCompanyList = (followCompanyList, mode, type) => {
  const companyList = []
  followCompanyList && followCompanyList.map((item) => {
    companyList.push(item.companyName)
  })
  return mode === 'all' ? '' : (type === 'post' ? companyList : companyList.join())
}

// 获取除今年外，最近一年或两年
export const getYearList = (time) => {
  return time === 'two' ? `${yearList[1]},${yearList[2]}` : `${yearList[1]}`
}

// 获取一年或两年的开始日期和结束日期
export const getBeginEndTime = (years) => {
  years = years.split(',')
  const endIndex = years.length - 2 > 0 ? years.length - 2 : 0
  return {
    startTime: `${years[years.length - 1]}-01-01`,
    endTime: `${years[endIndex]}-12-31`,
  }
}
