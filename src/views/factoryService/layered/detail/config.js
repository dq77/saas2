// 公司风险类型
export const companyRedLine = [
  {
    name: '失信被执行',
    type: '1'
  },
  {
    name: '限制高消费',
    type: '2'
  },
  {
    name: '被执行人',
    type: '3'
  },
  {
    name: '税收违法',
    type: '5'
  },
  {
    name: '三年内因借贷纠纷成为被告',
    type: '4'
  },
]
// 个人风险类型
export const personRedLine = [
  {
    name: '失信被执行',
    type: '6'
  },
  {
    name: '限制高消费',
    type: '7'
  },
  {
    name: '被执行人',
    type: '8'
  }
]
// 仪表盘基础配置
const guageOption = {
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      radius: '100%',
      startAngle: 205,
      endAngle: -25,
      splitNumber: 4,
      title: {
        show: true,
        offsetCenter: [0, '45%'],
        fontSize: 14
      },
      detail: {
        show: true,
        offsetCenter: [0, '25%'],
        fontSize: 36,
        color: '#3B68F0',
        formatter: function(value) {
          return value || '触及红线'
        }
      },
      progress: {
        width: 25,
        show: true,
        roundCap: true,
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 1, color: '#1FC0DF' // 0% 处的颜色
            }, {
              offset: 0, color: '#3B68F0' // 100% 处的颜色
            }],
            globalCoord: true
          }
        }
      },
      axisLine: {
        show: true,
        roundCap: true,
        lineStyle: {
          width: 25,
          color: [[1, '#F8F8F8']]
        }
      },
      axisLabel: {
        show: true,
        distance: 32,
        fontSize: 14
      },
      splitLine: {
        length: 10,
        distance: 17,
        color: '#DFDFDF',
        lineStyle: {
          color: '#DFDFDF'
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#DFDFDF'
        },
        distance: 17
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 12,
        itemStyle: {
          borderWidth: 5,
          borderColor: '#3B68F0',
        }
      },
      pointer: {
        width: 3,
        length: '45%',
        itemStyle: {
          color: '#3B68F0'
        }
      },
      data: [],
    }
  ]
}
// 仪表盘配置(默认状态)
export const defaultGuageOption = guageOption
// 仪表盘配置(触及红线)
export const redGuageOption = {
  series: [
    {
      ...guageOption.series[0],
      detail: {
        show: true,
        offsetCenter: [0, '25%'],
        fontSize: 28,
        color: '#E95257',
        formatter: function(value) {
          return '触发红线'
        }
      },
      progress: {
        width: 25,
        show: true,
        roundCap: true,
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 1, color: '#FF6A6B' // 0% 处的颜色
            }, {
              offset: 0, color: '#E95257' // 100% 处的颜色
            }],
            globalCoord: true
          }
        }
      },
      anchor: {
        show: false,
      },
      pointer: {
        show: false,
      },
      data: [
        {
          value: 100,
          name: '当前分数',
        }
      ]
    }
  ]
}
// 仪表盘配置(生成中、信息不足)
export const noneGuageOption = (text) => {
  return {
    series: [
      {
        ...guageOption.series[0],
        detail: {
          show: true,
          offsetCenter: [0, '25%'],
          fontSize: 28,
          color: '#3B68F0',
          formatter: function(value) {
            return text
          }
        },
        axisLine: {
          show: true,
          roundCap: true,
          lineStyle: {
            width: 25,
            color: [[1, '#ffffff']]
          }
        },
        progress: {
          width: 25,
          show: true,
          roundCap: true,
          itemStyle: {
            color: {
              type: 'linear',
              x: 1,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 1, color: '#F8F8F8' // 0% 处的颜色
              }, {
                offset: 0, color: '#F8F8F8' // 100% 处的颜色
              }],
              globalCoord: true
            }
          }
        },
        anchor: {
          show: false,
        },
        pointer: {
          show: false,
        },
        data: [
          {
            value: 100,
            name: '当前分数',
          }
        ]
      }
    ]
  }
}
