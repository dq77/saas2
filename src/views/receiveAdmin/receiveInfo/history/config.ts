export const kindOptions = [
  { label: '天', value: 'day' },
  { label: '月', value: 'month' },
  { label: '年', value: 'year' }
]

export const getOptions = (xData, data) => {
  return {
    title: {
      subtext: '金额(万元)'
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        return `
          <div>${params?.[0]?.name}</div>
          <div>收款金额：${params?.[0]?.data}元</div>
        `
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xData,
        axisLabel: {
          formatter: (value) => {
            const repaymentTime = value?.split('-')
            const len = repaymentTime?.length - 1
            return repaymentTime?.[len]
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '收款金额',
        smooth: 0.6,
        symbol: 'none',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data
      }
    ]
  }
}
