export const summaryRedLineList = [
  { label: '个人-被执行人', key: 8 },
  { label: '个人-限制高消费', key: 7 },
  { label: '个人-失信被执行', key: 6 },
  { label: '企业-税务违法', key: 5 },
  { label: '企业-失信被执行', key: 1 },
  { label: '企业-被执行人', key: 3 },
  { label: '企业-限制高消费', key: 2 },
  { label: '企业-三年内因借贷纠纷成为被告', key: 4 }
]
export const barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '0%',
    right: '2%',
    bottom: 5,
    top: 10,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    minInterval: 1, // 默认整数
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    // data: ['企业-失信被执行', '企业-限制高消费', '企业-被执行人', '企业-三年内因借贷纠纷成为被告', '企业-税务违法', '个人失信', '个人限高', '个人当前有被执行']
    data: summaryRedLineList.map(item => item.label)
  },
  series: [
    {
      type: 'bar',
      color: ['#3B68F0'],
      barWidth: 12,
      data: []
    },
  ]
}

export const vsRiskExplain = {
  title: '每项风险红线被触发的公司数量',
  list: [
    { label: '企业-三年内因借贷纠纷成为被告', value: '三年内因金融借贷纠纷及民间借贷纠纷成为被告；' },
    { label: '企业-限制高消费', value: '当前企业、法定代表人、自然人股东、企业股东及其法定代表人被限制高消费；' },
    { label: '企业-被执行人', value: '企业当前有被执行；' },
    { label: '企业-失信被执行', value: '当前企业、法定代表人、自然人股东、企业股东及其法定代表人成为失信被执行人；' },
    { label: '企业-税务违法', value: '企业有税务违法或税务黑名单中；' },
    { label: '个人-失信被执行', value: '当前企业的实际控制人成为失信被执行；' },
    { label: '个人-限制高消费', value: '当前企业的实际控制人被限制高消费；' },
    { label: '个人-被执行人', value: '当前企业的实际控制人成为被执行人。' }
  ]
}
