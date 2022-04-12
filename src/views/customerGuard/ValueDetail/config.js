// redline-data
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
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['企业-失信被执行', '企业-限制高消费', '企业-被执行人', '企业-三年内因借贷纠纷成为被告', '企业-税务违法', '个人失信', '个人限高', '个人当前有被执行']
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
export const summaryRedLine = {
  1: '企业-失信被执行',
  2: '企业-限制高消费',
  3: '企业-被执行人',
  4: '企业-三年内因借贷纠纷成为被告',
  5: '企业-税收违法',
  6: '个人失信',
  7: '个人限高',
  8: '个人当前有被执行',
}
// tab
export const ddTabs = [
  { label: '基础信息', value: 'tab-1' },
  { label: '经营状况', value: 'tab-2' },
  { label: '司法风险', value: 'tab-3' },
  { label: '履约行为', value: 'tab-4' },
  { label: '财务分析', value: 'tab-5' }
]
// 子模型keys
export const sourceKeys = ['enterpriseBasicInfoScore', 'enterpriseCreditInfoScore', 'enterpriseLawsuitInfoScore', 'enterpriseRiskInfoScore']

// 更多跳转type类型
const tab1 = 'base'
const tab2 = 'management'
const tab3 = 'relation'
const tab4 = 'litigation'
const event1 = 'getRefs'
const event2 = 'peripheralRisk'
export const linkType = {
  // tab-1
  工商信息: `${tab1}`,
  股权信息: `${tab1}-holders`,
  主要成员TOP10: `${tab1}-mainPerson`,
  关联股权穿透数量: `${tab3}`,
  股权分散程度: `${tab1}-holders`,
  // tab-2
  变更类型: `${tab2}-businessChanges-${event1}`,
  变更趋势: `${tab2}-businessChanges-${event1}`,
  最近变更: `${tab2}-businessChanges-${event1}`,
  行政许可类型: `${tab2}-administrativeLicensing`,
  行政处罚趋势: `${tab2}-administrative-${event1}`,
  动产抵押: `${tab2}-chattelMortgage-${event1}`,
  经营异常趋势: `${tab2}-abnormalOperation-${event1}`,
  // tab-3
  案件身份: `${tab4}-lawSuit-${event1}`,
  法律诉讼被告趋势: `${tab4}-lawSuit-${event1}`,
  司法类别: `${tab4}`,
  法院top10: `${tab4}-lawSuit-${event1}`,
  关联风险类型: `${tab3}-main-${event2}`,
  关联风险趋势: `${tab3}-main-${event2}`,
  涉案地区分布: `${tab4}-lawSuit-${event1}`,
  案由分布: `${tab4}-lawSuit-${event1}`,
  // tab4
  税务评级分布: `${tab2}-taxRating-${event1}`,
  税收违法趋势: `${tab2}-taxViolation-${event1}`,
  被执行次数及标的: `${tab4}-zhixinginfo-${event1}`,
  执行法院top10: `${tab4}-zhixinginfo-${event1}`,
  失信履行: `${tab4}-dishonest-${event1}`,
  失信趋势: `${tab4}-dishonest-${event1}`,
  限制高消费趋势: `${tab4}-consumptionRestriction-${event1}`,
  失信法院top10: `${tab4}-dishonest-${event1}`,
  终本案件趋势: `${tab4}-endCase-${event1}`,
  终本执行金额: `${tab4}-endCase-${event1}`
}
