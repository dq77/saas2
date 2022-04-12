// 三条红线相关参数
export const threeRedLineDefault = {
  // 净负债率
  netDebtRatio: {
    value: 0,
    overHalf: false,
    left: 0,
    right: 0,
    text: 0,
    result: false,
  },
  // 剔除预收款后的资产负债率
  ebtratioaftereliminatedepositreceived: {
    value: 0,
    overHalf: false,
    left: 0,
    right: 0,
    text: 0,
    result: false,
  },
  // 现金短债比
  cashFlowsCoverageRatio: {
    value: 0,
    overHalf: false,
    left: 0,
    right: 0,
    text: 0,
    result: false,
  },
}
export const agencyRatingsDefault = [
  {
    agency: '标普评级',
    rating: '--',
    sort: '1',
    trend: '暂无'
  },
  {
    agency: '穆迪评级',
    rating: '--',
    sort: '2',
    trend: '暂无'
  },
  {
    agency: '惠誉评级',
    rating: '--',
    sort: '3',
    trend: '暂无'
  },
  {
    agency: '中诚信国际',
    rating: '--',
    sort: '4',
    trend: '暂无'
  },
  {
    agency: '联合资信',
    rating: '--',
    sort: '5',
    trend: '暂无'
  },
  {
    agency: '中债资信',
    rating: '--',
    sort: '6',
    trend: '暂无'
  },
  {
    agency: 'YY评级',
    rating: '--',
    sort: '7',
    trend: '暂无'
  }

]
// 仟金顶评分对应区间
export const scoreConfig = {
  list: [
    {
      grade: 'A',
      low: 81.2,
      high: 100,
      tips: '抗风险能力极强，风险总体较低',
      result: '高于行业平均水平',
      scoreText: '高分',
    },
    {
      grade: 'B',
      low: 71.2,
      high: 81.2,
      tips: '抗风险能力很强，风险总体较低',
      result: '高于行业平均水平',
      scoreText: '中高分'
    },
    {
      grade: 'C',
      low: 61.2,
      high: 71.2,
      tips: '抗风险能力较强，风险总体较低',
      result: '略高于行业平均水平',
      scoreText: '低高分'
    },
    {
      grade: 'D',
      low: 51.2,
      high: 61.2,
      tips: '抗风险能力一般，风险总体一般',
      result: '行业平均水平',
      scoreText: '中等'
    },
    {
      grade: 'E',
      low: 41.2,
      high: 51.2,
      tips: '抗风险能力较弱，风险总体略高',
      result: '低于行业平均水平',
      scoreText: '低分'
    },
    {
      grade: 'F',
      low: 31.2,
      high: 41.2,
      tips: '抗风险能力很弱，风险总体略高',
      result: '低于行业平均水平',
      scoreText: '中低分'
    },
    {
      grade: 'G',
      low: 0,
      high: 31.2,
      tips: '抗风险能力很弱，风险总体略高',
      result: '远低于行业平均水平',
      scoreText: '超低分'
    },
  ],
  notList: [
    {
      grade: 'A',
      low: 84.2,
      high: 100,
      tips: '抗风险能力极强，风险总体较低',
      result: '高于行业平均水平',
      scoreText: '高分'
    },
    {
      grade: 'B',
      low: 74.2,
      high: 84.2,
      tips: '抗风险能力很强，风险总体较低',
      result: '高于行业平均水平',
      scoreText: '中高分'
    },
    {
      grade: 'C',
      low: 59.2,
      high: 74.2,
      tips: '抗风险能力较强，风险总体较低',
      result: '略高于行业平均水平',
      scoreText: '低高分'
    },
    {
      grade: 'D',
      low: 39.2,
      high: 59.2,
      tips: '抗风险能力一般，风险总体一般',
      result: '行业平均水平',
      scoreText: '中等'
    },
    {
      grade: 'E',
      low: 29.2,
      high: 39.2,
      tips: '抗风险能力较弱，风险总体略高',
      result: '低于行业平均水平',
      scoreText: '低分'
    },
    {
      grade: 'F',
      low: 19.2,
      high: 29.2,
      tips: '抗风险能力很弱，风险总体略高',
      result: '低于行业平均水平',
      scoreText: '中低分'
    },
    {
      grade: 'G',
      low: 0,
      high: 19.2,
      tips: '抗风险能力极弱，风险总体高',
      result: '远低于行业平均水平',
      scoreText: '超低分'
    },
  ],
}
