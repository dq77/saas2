import { toAmountStr } from '@/utils/util'

// 指定年份配置项
export const currentYear = '2021'

export const navList = [
  {
    activeIndex: 0,
    title: '基本信息'
  },
  {
    activeIndex: 1,
    title: '业务分析'
  },
  {
    activeIndex: 2,
    title: '财务分析'
  },
  {
    activeIndex: 3,
    title: '新闻舆情'
  },
  {
    activeIndex: 4,
    title: '企业风险'
  },
]
export const baseColumns = [
  {
    label: '公司法人',
    prop: 'operName',
    market: ['cn', 'null']
  },
  {
    label: '董事长',
    prop: 'operName',
    market: ['hk']
  },
  {
    label: '注册资本',
    prop: 'regCapital',
    market: ['cn', 'null']
  },
  {
    label: '实缴资本',
    prop: 'actualCapital',
    market: ['cn', 'null']
  },
  {
    label: '法定股本',
    prop: 'regCapital',
    market: ['hk']
  },
  {
    label: '已发行股本',
    prop: 'actualCapital',
    market: ['hk']
  },
  {
    label: '经营开始时间',
    prop: 'fromTime'
  },
]
// 双折线图基础配置
export const doubleLineOption = {
  color: ['#3C5DA4', '#25BECD'],
  legend: {
    data: [],
  },
  grid: {
    top: '15%',
    bottom: '10%',
    left: '10%',
    right: '0'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
      },
      show: true // 隐藏或显示
    }
  },
  series: []
}

export const saleMoneyLegend = ['销售金额（亿元）', '拿地金额（亿元）']

export const saleMoneyYData = [
  {
    name: '销售金额（亿元）',
    data: [],
    type: 'line',
    symbolSize: 5
  },
  {
    name: '拿地金额（亿元）',
    data: [],
    type: 'line',
    symbolSize: 5
  },
]

export const saleAreaLegend = ['销售面积（万平方米）', '拿地面积（万平方米）']

export const saleAreaYData = [
  {
    name: '销售面积（万平方米）',
    data: [],
    type: 'line',
    symbolSize: 5
  },
  {
    name: '拿地面积（万平方米）',
    data: [],
    type: 'line',
    symbolSize: 5
  },
]

export const projectSummaryOption = {
  color: ['#3C5DA4'],
  legend: {
    data: ['项目个数']
  },
  barWidth: 10,
  grid: {
    top: '10%',
    bottom: '10%',
    left: '4%',
    right: '0'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      // rotate: 15,
      textStyle: {
        color: '#000',
        fontSize: 10
      }
    },
  },
  yAxis: {
    type: 'value',
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
      },
      show: true // 隐藏或显示
    }
  },
  series: [{
    name: '项目个数',
    data: [],
    type: 'bar'
  }]
}

// 销售数据/拿地数据，第一个固定表头
export const saleTableHeader = [{ label: '销售/拿地', key: 'title', width: '150'}]

// 销售数据/拿地数据，左侧项
export const saleTableList = [
  {
    title: '销售金额（亿元）'
  },
  {
    title: '销售面积（万平方米）'
  },
  {
    title: '拿地金额（亿元）'
  },
  {
    title: '拿地面积（万平方米）'
  },
]
// 销售数据/拿地数据，字段名
export const saleColumnsKey = ['sellMoney', 'sellArea', 'acquireMoney', 'acquireArea']
// 关键财务数据，第一个固定表头
export const financeTableHeader = [{ label: '关键财务数据', key: 'title', width: '165'}]

// 关键财务数据，左侧项
export const financeTableList = [
  {
    title: '归母净利润（亿元）'
  },
  {
    title: '归母净利润同比增长（%）'
  },
  {
    title: '净利率（%）'
  },
  {
    title: '存货周转天数（天）'
  },
  {
    title: '总资产周转率（次）'
  },
  {
    title: '销售现金比'
  },
  {
    title: '速动比率'
  },
  {
    title: '资产负债率（%）'
  },
  {
    title: '流动比率'
  },
  {
    title: '利息倍数'
  },
]
// 关键财务数据，字段名
export const financeColumnsKey = ['gmjlr', 'gsjlrtbzz', 'jll', 'chzzts', 'zzczzy', 'jyxjlyysr', 'sdbl', 'zcfzl', 'ldbl', 'lxbs']

// 柱状折线混合图基础配置
export const barAndLineOption = {
  color: ['#3C5DA4', '#25BECD'],
  legend: {
    data: [],
  },
  barWidth: 10,
  grid: {
    top: '20%',
    bottom: '10%',
    left: '12%',
    right: '10%'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: [
    {
      name: [],
      type: 'value',
      splitLine: { // 网格线
        lineStyle: {
          type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
        },
        show: true // 隐藏或显示
      }
    },
    {
      name: [],
      type: 'value',
      splitLine: { // 网格线
        lineStyle: {
          type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
        },
        show: false // 隐藏或显示
      }
    }
  ],
  series: [
    {
      name: '',
      data: [],
      type: 'bar'
    },
    {
      name: '',
      data: [],
      type: 'line',
      yAxisIndex: 1,
      symbolSize: 5
    }
  ]
}

export const profitabilityLegend = ['归母净利润（亿元）', '净利率（%）']

export const efficiencyLegend = ['存货周转天数（天）', '总资产周转率（次）']

export const mobilityLegend = ['销售现金比率', '速动比率']

export const solvencyLegend = ['流动比率', '利息倍数']

export const riskDistributionColumns = [
  {
    label: '司法诉讼案件数',
    key: 'sfssTotalCount'
  },
  {
    label: '案件总金额',
    key: 'lawCaseAmount',
    render: (row, value) => { return value ? `${value}元` : '-' }
  },
  {
    label: '原告',
    key: 'plaintiffRate',
    render: (row, value) => { return value ? `${toAmountStr(value * 100, 2)}%` : '-' }
  },
  {
    label: '被告',
    key: 'defendantRate',
    render: (row, value) => { return value ? `${toAmountStr(value * 100, 2)}%` : '-' }
  },
  {
    label: '动产抵押',
    key: 'dcdyTotalCount'
  },
  {
    label: '失信',
    key: 'sxTotalCount'
  },
  {
    label: '限高',
    key: 'xgTotalCount'
  },
  {
    label: '行政处罚',
    key: 'xzcfTotalCount'
  },
  {
    label: '被执行',
    key: 'bzxrTotalCount'
  },
]

export const riskDistributionTabs = [
  {
    label: '司法诉讼地区分布',
    value: 'regionalDistribution'
  },
  {
    label: '案由分布',
    value: 'causeDistribution'
  },
  {
    label: '涉案数量',
    value: 'nearOneYearRegional'
  },
  {
    label: '年度涉案数量',
    value: 'yearRegional'
  },
  {
    label: '原告被告',
    value: 'plaintiffDefendant'
  },
]

export const equityPledgeColumns = [
  {
    label: '质押比例',
    key: 'pledgeRatio',
  },
  {
    label: '质押股数（股）',
    key: 'pledgeAmount',
    render: (row, value) => { return value ? `${toAmountStr(value, 0, false, true)}万` : '-' }
  },
  {
    label: '质押市值（元）',
    key: 'pledgeMarketValue',
  },
  {
    label: '质押笔数',
    key: 'pledgeNum',
  },
]

export const equityPledgeTabs = [
  {
    label: '股权质押趋势',
    value: 'equityPledge'
  }
]

export const riskChartOption = {
  color: ['#3C5CA4'],
  barWidth: 10,
  grid: {
    top: '20%',
    bottom: '10%',
    left: '12%',
    right: '0'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      // rotate: 15,
      textStyle: {
        color: '#000',
        fontSize: 10
      }
    },
  },
  yAxis: [
    {
      type: 'value',
      splitLine: { // 网格线
        lineStyle: {
          type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
        },
        show: true // 隐藏或显示
      }
    }
  ],
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
}

export const riskPieChartOption = {
  color: ['#3C5DA4', '#25BECD', '#376BD7', '#56E5DA', '#5480DE', '#C2F1D8', '#82A7F3'],
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: 'center',
    right: 'right'
  },
  series: [
    {
      type: 'pie',
      radius: ['65%', '85%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 0,
        borderColor: '#fff',
        borderWidth: 5
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
}

export const singleLineOption = {
  color: ['#25BECD'],
  barWidth: 10,
  grid: {
    top: '20%',
    bottom: '10%',
    left: '12%',
    right: '0'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: [
    {
      type: 'value',
      splitLine: { // 网格线
        lineStyle: {
          type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
        },
        show: true // 隐藏或显示
      }
    }
  ],
  series: [
    {
      data: [],
      type: 'line',
      symbolSize: 5
    }
  ]
}

// 三条红线结果
export const resultEnums = [
  {
    name: '安全',
    color: '#25CDBC'
  },
  {
    name: '提示',
    color: '#F7B500'
  },
  {
    name: '警示',
    color: '#FF8534'
  },
  {
    name: '危险',
    color: '#E05E62'
  },
]
// 三条红线配置
export const threeRedLineConfig = [
  {
    name: '净负债率',
    tip: '企业的净负债率不得大于100%',
    configName: 'netDebtRatio',
    leftText: '良好',
    rightText: '差',
    centerText: '100%',
    standard: 1,
    renderText: (value) => { return value ? parseFloat(value * 100).toFixed(2) + '%' : '暂无数据' }
  },
  {
    name: '剔除预收款后的资产负债率',
    tip: '企业剔除预收款后的资产负债率不得大于70%',
    configName: 'ebtratioaftereliminatedepositreceived',
    leftText: '良好',
    rightText: '差',
    centerText: '70%',
    standard: 0.7,
    renderText: (value) => { return value ? parseFloat(value * 100).toFixed(2) + '%' : '暂无数据' }
  },
  {
    name: '现金短债比',
    tip: '企业的“现金短债比”不小于1',
    configName: 'cashFlowsCoverageRatio',
    leftText: '差',
    rightText: '良好',
    centerText: '1',
    isHit: true,
    standard: 1,
    isReverse: true,
    renderText: (value) => { return value ? value.toFixed(2) : '暂无数据' }
  },
]
// 综合评分等级背景色
export const scoreColor = {
  高分: '#25BECD',
  中高分: '#25BECD',
  低高分: '#25BECD',
  中等: '#25BECD',
  低分: '#A9AFB8',
  中低分: '#A9AFB8',
  超低分: '#A9AFB8',
}
// 当年累计权益拿地金额/累计权益销售金额
export const saleBarConfig = [
  {
    configName: 'saleBar',
    leftText: '达标',
    rightText: '超标',
    centerText: '40%',
    standard: 0.4,
    renderText: (value) => { return parseFloat(value * 100).toFixed(2) + '%' }
  },
]
// 当年累计权益拿地金额/累计权益销售金额图表默认值
export const saleBarDataDefault = {
  saleBar: {
    value: 0,
    overHalf: false,
    left: 0,
    right: 0,
    text: 0,
    result: false,
  },
}
// 新闻舆情tabs
export const newsPublicTabs = [
  {
    label: '舆情热词',
    value: 'hotWords'
  }
]
// riskList新闻舆情，覆盖默认配置
export const riskConfigTabs = [
  { label: '司法诉讼', value: 'judicialLitigation' },
  { label: '被执行人', value: 'executee' },
  { label: '失信', value: 'breakPromise' },
  { label: '限制高消费', value: 'heightLimit' },
  { label: '经营异常', value: 'abnormalOperation' },
  { label: '动产抵押', value: 'chattelMortgage' },
  { label: '股权质押', value: 'equityPledge' },
]
