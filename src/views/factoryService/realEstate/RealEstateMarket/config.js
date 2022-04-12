import { isNumber, toAmountStr } from '@/utils/util'
export const companyColumns = [
  { label: '企业名称', key: 'comName', minWidth: '100'},
  { label: '近两年销售额（亿元）', key: 'sellMoney', align: 'right', minWidth: '140', render: (scope, v) => isNumber(v) ? `${toAmountStr(v, 2)}` : '-', },
  { label: '近两年销售面积（万㎡）', key: 'sellArea', align: 'right', minWidth: '160', render: (scope, v) => isNumber(v) ? `${toAmountStr(v, 2)}` : '-', },
  { label: '近两年拿地金额（亿元）', key: 'acquireMoney', align: 'right', minWidth: '160', render: (scope, v) => isNumber(v) ? `${toAmountStr(v, 2)}` : '-', },
  { label: '近两年拿地面积（万㎡）', key: 'acquireArea', align: 'right', minWidth: '160', render: (scope, v) => isNumber(v) ? `${toAmountStr(v, 2)}` : '-', },
  { label: '近两年净利润（亿元）', key: 'gmjlr', align: 'right', minWidth: '140', render: (scope, v) => isNumber(v) ? `${toAmountStr(v, 2)}` : '-', },
  { label: '操作', key: 'operate', minWidth: '110'},
]
export const businessChartOptions = {
  year: [
    {
      label: '近一年',
      value: 'one'
    },
    {
      label: '近两年',
      value: 'two'
    },
  ],
  business: {
    sale: [
      {
        label: '销售额',
        key: 'salesVolume',
        unit: '亿元',
      },
      {
        label: '销售面积',
        key: 'salesArea',
        unit: '万㎡'
      },
    ],
    landTaken: [
      {
        label: '拿地额',
        key: 'landTakenAmount',
        unit: '亿元',
      },
      {
        label: '拿地面积',
        key: 'landTakenArea',
        unit: '万㎡'
      },
    ],
    assetsLiabilities: [
      {
        label: '总资产',
        key: 'assets',
        unit: '亿元',
      },
      {
        label: '总负债',
        key: 'liabilities',
        unit: '亿元'
      },
    ],
    netProfitDebtRatio: [
      {
        label: '净利润',
        key: 'netProfit',
        unit: '亿元',
      },
      {
        label: '负债率',
        key: 'debtRatio',
        unit: '%'
      },
    ]
  },
  data: {
    salesVolume: [],
    salesArea: [],
    landTakenAmount: [],
    landTakenArea: [],
    assets: [],
    liabilities: [],
    netProfit: [],
    debtRatio: []
  }
}
export const formData = {
  sale: 'salesVolume',
  saleTime: 'two',
  landTaken: 'landTakenAmount',
  landTakenTime: 'two',
  assetsLiabilities: 'assets',
  assetsLiabilitiesTime: 'two',
  netProfitDebtRatio: 'netProfit',
  netProfitDebtRatioTime: 'two'
}
export const chartFormart = {
  salesVolume: {
    type: 'sale',
    yName: 'sellMoney',
  },
  salesArea: {
    type: 'sale',
    yName: 'sellArea',
  },
  landTakenAmount: {
    type: 'landTaken',
    yName: 'acquireMoney',
  },
  landTakenArea: {
    type: 'landTaken',
    yName: 'acquireArea',
  },
  assets: {
    type: 'assetsLiabilities',
    yName: 'zzc',
  },
  liabilities: {
    type: 'assetsLiabilities',
    yName: 'zzc',
  },
  debtRatio: {
    type: 'netProfitDebtRatio',
    yName: 'zcfzl',
  },
  netProfit: {
    type: 'netProfitDebtRatio',
    yName: 'gmjlr',
  },
}
export const yearList = ['2021', '2020', '2019']

export const barOptions = {
  color: ['#3C5DA4'],
  barWidth: 20,
  grid: {
    top: '15%',
    bottom: '10%',
    left: '12%',
    right: '0'
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      return toAmountStr(params[0].data, 2)
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      rotate: 0,
      textStyle: {
        color: '#000',
        fontSize: 12
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
    data: [],
    type: 'bar'
  }]
}
export const sentimentColor = {
  司法诉讼: '#3C5DA4',
  行政处罚: '#56E5DA',
  失信: '#7FA5F1',
  限制高消费: '#C79F5F',
  被执行人: '#25BECD',
  动产抵押: '#5480DE',
  经营异常: '#E4767A'
}
// 三条红线档位
const threeRedLineNumEnum = ['绿档', '黄档', '橙档', '红档']
export const threeRedLineNum = threeRedLineNumEnum
// 三条红线对比
export const threeLineCompareColumns = [
  { label: '企业名称', key: 'thsStockShortName', minWidth: '100' },
  { label: '档位', key: 'hits', minWidth: '50', render: (scope, v) => threeRedLineNumEnum[v] || '-' },
  { label: '净负债率', key: 'netDebtRatio', minWidth: '70', render: (scope, v) => v ? `${toAmountStr(v * 100, 2)}%` : '-' },
  { label: '剔除预收款后的资产负债率', key: 'ebtratioaftereliminatedepositreceived', minWidth: '170', render: (scope, v) => v ? `${toAmountStr(v * 100, 2)}%` : '-' },
  { label: '现金短债比', key: 'cashFlowsCoverageRatio', minWidth: '100', render: (scope, v) => v ? `${toAmountStr(v, 2)}` : '-' },
]
export const developerRiskListColor = {
  五星风险: { bgColor: '#FFEEEB', color: '#FF3E3E' },
  四星风险: { bgColor: 'rgba(250, 100, 0, .2)', color: '#FA6400' },
  三星风险: { bgColor: 'rgba(226, 154, 39, .2)', color: '#E29A27' },
  二星风险: { bgColor: 'rgba(37, 190, 205, .2)', color: '#25BECD' },
  一星风险: { bgColor: 'rgba(98, 174, 252, .2)', color: '#62AEFC' }
}
