import * as echarts from 'echarts/core'

export const getOptions = ({
  data = []
}) => {
  return {
    backgroundColor: '#FAFBFF',
    radar: {
      shape: 'circle',
      splitArea: ['#fff'],
      splitNumber: 8,
      indicator: [
        { name: '资产实力', max: 1 },
        { name: '企业风险', max: 1 },
        { name: '信用历史', max: 1 },
        { name: '个人资质', max: 1 },
        { name: '欺诈风险', max: 1 },
      ],
      axisLine: {
        lineStyle: {
          color: '#EEEEF6'
        }
      },
      axisName: {
        color: '#606266'
      },
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        symbol: 'none',
        color: new echarts.graphic.RadialGradient(1, 1, 1, [
          {
            color: '#3B68F0',
            offset: 0
          },
          {
            color: '#E9BDFF',
            offset: 1
          }
        ]),
        data: [
          {
            value: data,
            areaStyle: {
              color: new echarts.graphic.RadialGradient(1, 1, 1, [
                {
                  color: '#3B68F0',
                  offset: 0
                },
                {
                  color: '#E9BDFF',
                  offset: 1
                }
              ])
            }
          }
        ]
      }
    ]
  }
}
