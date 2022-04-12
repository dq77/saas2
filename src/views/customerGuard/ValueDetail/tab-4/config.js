// 税务评级
export const chartLegend1 = ['税务评级']
export const chartYData1 = [
  { name: '税务评级', type: 'line', symbolSize: 5, data: [] }
]
// 被执行次数
export const chartLegend3 = ['执行次数（次）', '执行标的（万元）']
// 失信履行
export const echartApi5 = [
  { name: '其他', value: 0, key: 'otherWeilvxingCount' },
  { name: '全部未履行', value: 0, key: 'quanbuWeilvxingCount' },
  { name: '部分未履行', value: 0, key: 'bufenWeilvxingCount' }
]
// 限制高消费趋势
export const chartLegend7 = ['限制高消费趋势']
export const chartYData7 = [
  { name: '限制高消费趋势', type: 'line', symbolSize: 5, data: [] }
]
// 终本执行金额
export const chartLegend10 = ['执行金额（万元）', '未执行金额（万元）']
export const chartYData10 = [
  { name: '执行金额（万元）', type: 'bar', barGap: 0, emphasis: { focus: 'series' }, data: [] },
  { name: '未执行金额（万元）', type: 'bar', barGap: 0, emphasis: { focus: 'series' }, data: [] }
]

// 提示文案
export const popoverTexts = {
  text1: '统计最近5年税务评级。',
  text2: '统计最近5年税务违法数量趋势。',
  text3: '统计最近5年被执行次数及执行标的趋势。',
  text4: '统计被执行法院名称Top10及其数量。',
  text5: '统计失信全部未履行，部分未履行，其他的数量及占比。',
  text6: '统计最近5年失信数量趋势。',
  text7: '统计最近5年限高数量趋势。',
  text8: '统计失信法院名称Top10及其数量。',
  text9: '统计最近5年终本案件数量趋势。',
  text10: '统计最近5年终本执行金额，未执行金额趋势。'
}











