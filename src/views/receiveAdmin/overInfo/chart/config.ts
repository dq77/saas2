export const getOptions = ({
  splitNumber = 4,
  max = 120,
  data = []
}) => {
  return {
    title: {
      subtext: '逾期天数(天)'
    },
    tooltip: {
      formatter: params => {
        const { data } = params
        const item = data?.[2]
        return `
          <div>${item.customerName}</div>
          <div>应收名称： ${item.receivablePlanName}</div>
          <div>款项名称： ${item.fundTypeName}</div>
          <div>逾期金额： ${item.overdueAmount}元</div>
          <div>逾期天数： ${item.overdueDays}天</div>
        `
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      splitNumber: 4
    },
    yAxis: {
      splitNumber: 4,
      max
    },
    series: [
      {
        symbolSize: 10,
        data,
        type: 'scatter'
      }
    ]
  }
}
