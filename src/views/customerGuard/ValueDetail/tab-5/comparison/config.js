// 行业概览
import { deepCopy } from '@/utils/qjd'
// 偿债能力
const renderVal = (val) => { return val === 0 ? 0 : val.toFixed(2) }
export const solvencyConfig = [
  { name: '流动比率', valueKey: 'ld', flagKey: 'ldFlag', unit: '', render: (val) => renderVal(val)},
  { name: '速动比率', valueKey: 'sd', flagKey: 'sdFlag', unit: '', render: (val) => renderVal(val) },
  { name: '现金销售比', valueKey: 'xjxsb', flagKey: 'xjxsbFlag', unit: '', render: (val) => renderVal(val) },
  { name: '资产负债率', valueKey: 'zcfzl', flagKey: 'zcfzlFlag', unit: '%', render: (val) => renderVal(val) },
]
// 营运能力
export const operationConfig = [
  { name: '应收账款周转率', valueKey: 'yszkzzl', flagKey: 'yszkzzlFlag', unit: '次', render: (val) => renderVal(val) },
  { name: '存货周转率', valueKey: 'chzzl', flagKey: 'chzzlFlag', unit: '次', render: (val) => renderVal(val) },
  { name: '总资产周转率', valueKey: 'toazzl', flagKey: 'toazzlFlag', unit: '次', render: (val) => renderVal(val) }
]
// 盈利能力
export const profitabilityConfig = [
  { name: '净资产收益率(加权)', valueKey: 'roejq', flagKey: 'roejqFlag', unit: '%', render: (val) => renderVal(val) },
  { name: '总资产收益率(加权)', valueKey: 'zzcjll', flagKey: 'zzcjllFlag', unit: '%', render: (val) => renderVal(val) },
  { name: '毛利率', valueKey: 'xsmll', flagKey: 'xsmllFlag', unit: '%', render: (val) => renderVal(val) },
  { name: '净利率', valueKey: 'xsjll', flagKey: 'xsjllFlag', unit: '%', render: (val) => renderVal(val) }
]
// 公司规模
const million_100 = 100000000
const renderMillion_100 = (val) => { return val === 0 ? 0 : (val / million_100).toFixed(2) }
export const companySizeConfig = [
  { name: '净利润', valueKey: 'netprofit', flagKey: 'netprofitFlag', unit: '亿', render: (val) => renderMillion_100(val) },
  { name: '营业收入', valueKey: 'operateIncome', flagKey: 'operateIncomeFlag', unit: '亿', render: (val) => renderMillion_100(val) },
  { name: '总资产', valueKey: 'totalAssets', flagKey: 'totalAssetsFlag', unit: '亿', render: (val) => renderMillion_100(val) },
  { name: '股东权益', valueKey: 'totalEquity', flagKey: 'totalEquityFlag', unit: '亿', render: (val) => renderMillion_100(val) },
  { name: '员工数量(最新)', valueKey: 'employees', unit: '', render: (val) => { return val === 0 ? 0 : parseInt(val) } }
]
// 行业排名趋势
const companySizeConfig2 = (deepCopy(companySizeConfig)).slice(0, 4)
export const rankIndustryButtonGroupLists = ['偿债能力', '营运能力', '盈利能力', '公司规模']
export const rankIndustryConfigs = [
  solvencyConfig,
  operationConfig,
  profitabilityConfig,
  companySizeConfig2
]
/** 偿债能力 */
const renderRow = (row, item) => {
  if (row.isEllipsis) return '----'
  if (item === 0) return 0
  if (!item) return '----'
  return item.toFixed(2)
}
// echarts
export const solvencyLegend = ['流动比率', '行业均值']
// 偿债能力 table
export const solvencyColumns = [
  { label: '排名', key: 'rankId', align: 'left', width: 50 },
  { label: '股票简称', key: 'stockName', align: 'left', width: 60 },
  { label: '流动比率', key: 'ld', align: 'left', minWidth: 80, sortable: 'custom', render: renderRow },
  { label: '速动比率', key: 'sd', align: 'left', minWidth: 80, sortable: 'custom', render: renderRow },
  { label: '现金销售比', key: 'xjxsb', align: 'left', minWidth: 80, sortable: 'custom', render: renderRow },
  { label: '资产负债率(%)', key: 'zcfzl', align: 'left', minWidth: 100, sortable: 'custom', render: renderRow }
]
/** 营运能力 */
export const operationLegend = ['应收账款周转率', '行业均值']
export const operationColumns = [
  { label: '排名', key: 'rankId', align: 'left', width: 50 },
  { label: '股票简称', key: 'stockName', align: 'left', width: 80 },
  { label: '应收账款周转率', key: 'yszkzzl', align: 'left', minWidth: 100, sortable: 'custom', render: renderRow },
  { label: '存货周转率', key: 'chzzl', align: 'left', minWidth: 100, sortable: 'custom', render: renderRow },
  { label: '总资产周转率', key: 'toazzl', align: 'left', minWidth: 100, sortable: 'custom', render: renderRow }
]
/** 盈利能力 */
export const profitabilityLegend = ['净资产收益率(加权)(%)', '行业均值']
export const profitabilityColumns = [
  { label: '排名', key: 'rankId', align: 'left', width: 50 },
  { label: '股票简称', key: 'stockName', align: 'left', width: 80 },
  { label: '净资产收益率(加权)(%)', key: 'roejq', align: 'left', minWidth: 165, sortable: 'custom', render: renderRow },
  { label: '总资产收益率(加权)(%)', key: 'zzcjll', align: 'left', minWidth: 165, sortable: 'custom', render: renderRow },
  { label: '毛利率(%)', key: 'xsmll', align: 'left', minWidth: 100, sortable: 'custom', render: renderRow },
  { label: '净利率(%)', key: 'xsjll', align: 'left', minWidth: 100, sortable: 'custom', render: renderRow }
]
/** 公司规模 */
const renderMillion = (row, item) => {
  if (row.isEllipsis) return '----'
  if (item === 0) return 0
  if (!item) return '----'
  return (item / million_100).toFixed(2)
}
export const companySizeLegend = ['净利润(亿元)', '行业均值']
export const companySizeColumns = [
  { label: '排名', key: 'rankId', align: 'left', width: 50 },
  { label: '股票简称', key: 'stockName', align: 'left', width: 80 },
  { label: '净利润(亿元)', key: 'netprofit', align: 'left', minWidth: 110, sortable: 'custom', render: renderMillion },
  { label: '营业收入(亿元)', key: 'operateIncome', align: 'left', minWidth: 120, sortable: 'custom', render: renderMillion },
  { label: '总资产(亿元)', key: 'totalAssets', align: 'left', minWidth: 110, sortable: 'custom', render: renderMillion },
  { label: '股东权益(亿元)', key: 'totalEquity', align: 'left', minWidth: 120, sortable: 'custom', render: renderMillion }
]
export const isMillion_1000 = ['netprofit', 'operateIncome', 'totalAssets', 'totalEquity']

// 基础柱状图基础配置
const labelColor = '#9AA6B8'
const yLabeColor = '#EAEBEE'
const axisLine = { lineStyle: { color: '#EAEBEE' } }
const color = '#3B68F0'
export const barOptions = {
  color: color,
  barWidth: 16,
  title: {
    text: 'Title',
    textStyle: {
      color: '#494949',
      fontWeight: 400,
      fontSize: 12
    }
  },
  grid: {
    top: 40,
    bottom: 0,
    left: 25,
    right: 25,
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
      color: labelColor,
      rotate: 30,
      margin: 20
    },
    axisLine: axisLine
  },
  yAxis: [{
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
  }],
  series: [{
    data: [],
    type: 'bar',
    markLine: {
      data: [{
        name: '行业均值',
        yAxis: 0,
        label: {
          formatter: '{b}: {c}',
          position: 'insideEndTop'
        },
        lineStyle: {
          type: 'solid',
          borderWidth: 3,
          color: '#25BECD'
        }
      }]
    }
  }]
}
