export const reportButtonGroupLists = ['全部', '一季报', '半年报', '三季报', '年报']
export const monthEnums = {
  全部: null,
  一季报: '03',
  半年报: '06',
  三季报: '09',
  年报: '12'
}
// 财务类型指标
export const solvencyButtonGroupLists = ['流动比率', '速动比率', '现金销售比', '资产负债率(%)']
export const operationButtonGroupLists = ['应收账款周转率', '存货周转率', '总资产周转率']
export const profitabilityButtonGroupLists = ['净资产净利率(加权)(%)', '总资产净利率(加权)(%)', '毛利率(%)', '净利率(%)']
export const allGroupLists = [
  { title: '偿债能力', lists: solvencyButtonGroupLists },
  { title: '营运能力', lists: operationButtonGroupLists },
  { title: '盈利能力', lists: profitabilityButtonGroupLists }
]
// echats
export const chartYData = [
  { name: '行业均值', type: 'bar', barGap: 0, data: [] },
  { name: '企业名', type: 'bar', barGap: 0, data: [] }
]
// 债偿能力
export const publicTableHeader = [{ label: '财务类型指标', key: 'title', width: 160, fixed: 'left' }]
export const solvencyTableList = [
  { title: '流动比率', key: 'ld' },
  { title: '速动比率', key: 'sd' },
  { title: '现金销售比', key: 'xjxsb' },
  { title: '资产负债率(%)', key: 'zcfzl' }
]
// 营运能力
export const operationTableList = [
  { title: '应收账款周转率', key: 'yszkzzl' },
  { title: '存货周转率', key: 'chzzl' },
  { title: '总资产周转率', key: 'toazzl' }
]
// 盈利能力
export const profitabilityTableList = [
  { title: '净资产净利率(加权)(%)', key: 'roejq' },
  { title: '总资产净利率(加权)(%)', key: 'zzcjll' },
  { title: '毛利率(%)', key: 'xsmll' },
  { title: '净利率(%)', key: 'xsjll' }
]
export const allTableList = [
  ...solvencyTableList,
  ...operationTableList,
  ...profitabilityTableList
]

// 多柱状图基础配置
const labelColor = '#9AA6B8'
const axisLine = { lineStyle: { color: '#EAEBEE' } }
const yLabeColor = '#EAEBEE'
export const barOptions2 = {
  color: ['#3B68F0', '#25BECD'],
  barWidth: 16,
  legend: {
    data: []
  },
  title: {
    text: '流动比率',
    textStyle: {
      fontWeight: 500,
      fontSize: 14
    }
  },
  grid: {
    top: '15%',
    bottom: '3%',
    left: '3%',
    right: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      rotate: 40,
      color: labelColor
    },
    axisLine: axisLine
  },
  yAxis: {
    type: 'value',
    minInterval: 1, // 默认整数
    axisLabel: {
      color: labelColor
    },
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: yLabeColor
      },
      show: true // 隐藏或显示
    }
  },
  series: []
}
