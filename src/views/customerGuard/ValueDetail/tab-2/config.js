/** echarts data */
// 变更类型
export const echartApi1 = [
  { name: '注册资本变更', value: 0, key: 'zhucezibenAllChangeTimes' },
  { name: '经营范围变更', value: 0, key: 'jingyingfanweiAllChangeTimes' },
  { name: '重要人员变更', value: 0, key: 'personAllChangeTimes' },
  { name: '公司地址变更', value: 0, key: 'addressAllChangeTimes' },
  { name: '投资人变更', value: 0, key: 'touzirenAllChangeTimes' },
  { name: '其他', value: 0, key: 'otherAllChangeTimes' },
]
// 变更趋势
export const chartLegend2 = ['注册资本变更', '经营范围变更', '重要人员变更', '公司地址变更', '投资人变更', '其他']
export const chartYData2 = [
  { name: '注册资本变更', type: 'line', symbolSize: 5, data: [] },
  { name: '经营范围变更', type: 'line', symbolSize: 5, data: [] },
  { name: '重要人员变更', type: 'line', symbolSize: 5, data: [] },
  { name: '公司地址变更', type: 'line', symbolSize: 5, data: [] },
  { name: '投资人变更', type: 'line', symbolSize: 5, data: [] },
  { name: '其他', type: 'line', symbolSize: 5, data: [] }
]
export const echartApi2 = [
  { name: '注册资本变更', key: 'zhucezibenChangeTimes' },
  { name: '经营范围变更', key: 'jingyingfanweiChangeTimes' },
  { name: '重要人员变更', key: 'personChangeTimes' },
  { name: '公司地址变更', key: 'addressChangeTimes' },
  { name: '投资人变更', key: 'touzirenChangeTimes' },
  { name: '其他', key: 'otherChangeTimes' }
]
// 行政许可类型
export const echartApi3 = [
  { name: '经营变更', value: 0, key: 'alterCountTime' },
  { name: '主体成立', value: 0, key: 'establishCountTime' },
  { name: '制度修改', value: 0, key: 'changeCountTime' },
  { name: '补换发', value: 0, key: 'updateCountTime' },
  { name: '其他', value: 0, key: 'restCountTime' }
]
// 动产抵押
export const chartLegend6 = ['动产抵押次数（次）', '动产抵押金额（元）']
// 提示文案
export const popoverTexts = {
  text1: '统计重要人员变更，经营范围变更等不同变更类型的数量。',
  text2: '统计最近5年不同变更类型的趋势。',
  text3: '统计最近两年不同类型的变更次数及对应的最近一次变更时间。',
  text4: '统计补换发，制度修改等不同行政许可类型的数量。',
  text5: '统计最近5年行政处罚的趋势。',
  text6: '统计最近5年经营异常的趋势。',
  text7: '统计最近5年动产抵押次数及被担保债权金额的趋势。',
  text8: '统计最近5年归母净利润和净利率的趋势。',
  text9: '统计最近5年存货周转天数和总资产周转率的趋势。',
  text10: '统计最近5年销售现金比率和速动比率的趋势。',
  text11: '统计最近5年流动比率和利息倍数的趋势。',
}
