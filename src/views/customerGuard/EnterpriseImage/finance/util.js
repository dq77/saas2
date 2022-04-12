import { deepCopy } from '@/utils/qjd'
// 处理xData数据
export const getYearXData = (data = [], key = 'year') => {
  if (!data.length) return []
  return data.map(item => {
    return item[key]
  })
}
// 处理饼图组件数据
export const getEchartPieLineData = (data, apis) => {
  apis.forEach(item => {
    item.value = data[item.key] || 0
  })
  const arr = apis.filter(api => api.value)
  if (!arr.length) return []
  if (arr.length) return deepCopy(apis)
}
// 处理折线图组件数据
export const getEchartLineData = (data = [], key) => {
  const xData = getYearXData(data)
  const yDataList = [[]]
  data.forEach(item => {
    yDataList[0].push(item[key])
  })
  return { xData, yDataList }
}
// 法院top10
export const getEchartTop10Data = (data = []) => {
  const xData = []
  const yData = []
  data.forEach(item => {
    xData.push(item.courtName)
    yData.push(item.courtNameCount || 0)
  })
  return { xData, yData }
}
// 多条line
export const getEchartLine2Data = (data, apis) => {
  // xData
  const xData = getYearXData(data)
  // yDataList
  const yDataList = []
  apis.forEach((item, index) => {
    yDataList[index] = []
    data.forEach(item2 => {
      yDataList[index].push(item2[item.key] || 0)
    })
  })
  return { xData, yDataList }
}
// 处理柱图图组件数据
export const getEchartBarData = (data = [], key) => {
  const xData = getYearXData(data)
  const yData = data.map(item => {
    return item[key] || 0
  })
  return { xData, yData }
}
