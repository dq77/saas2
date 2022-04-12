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
        { name: '运营状况', max: 1 },
        { name: '企业规模', max: 1 },
        { name: '企业发展', max: 1 },
        { name: '综合实力', max: 1 },
        { name: '企业竞争力', max: 1 },
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
