// 环形图，任务评估总览
export function getCircleOption1({
  percent,
  sum,
  ongoing,
  primaryColor,
}) {
  const restCount = sum - ongoing
  return {
    graphic: {
      type: 'group',
      left: 'center',
      top: 'center',
      children: [
        {
          type: 'text',
          top: 0,
          style: {
            text: `${percent}%`,
            textAlign: 'center',
            font: 'bolder 2em sans-serif',
            fill: '#394D78'
          }
        },
        {
          type: 'text',
          top: 30,
          style: {
            text: `任务数：${sum}`,
            textAlign: 'center',
            fill: '#9AA6B8'
          }
        },
        {
          type: 'text',
          top: 50,
          style: {
            text: `完成数：${ongoing}`,
            textAlign: 'center',
            fill: '#9AA6B8'
          }
        }
      ]
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: restCount,
            name: 'restCount',
            itemStyle: {
              color: '#F4F4F4'
            },
            emphasis: {
              itemStyle: {
                color: '#F4F4F4'
              },
            }
          },
          {
            value: ongoing,
            name: 'ongoing',
            itemStyle: {
              color: primaryColor
            }
          }
        ]
      }
    ]
  }
}

// 环形图，任务结果总览-赊销评估-客户风险评级分布
// 环形图，任务结果总览-项目评估-快速评估结果分布
export function getCircleOption2({
  totalLabel = '总量',
  totalValue = 0,
  color = ['#3B68F0', '#3BB5EF', '#F7B500', '#D3997A', '#7885AB'],
  data = []
}) {
  // 用于图例渲染
  const dataMap = {}
  data.forEach(item => {
    dataMap[item.name] = item
  })
  return {
    color,
    graphic: {
      type: 'group',
      x: 120,
      top: 'center',
      children: [
        {
          type: 'text',
          left: 'center',
          top: 0,
          style: {
            text: totalValue,
            textAlign: 'center',
            font: 'bolder 2em sans-serif',
            fill: '#394D78'
          }
        },
        {
          type: 'text',
          left: 'center',
          top: 30,
          style: {
            text: totalLabel,
            textAlign: 'center',
            fill: '#9AA6B8'
          }
        }
      ]
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      right: 0,
      itemGap: 20,
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 12,
      formatter: (name) => `{label|风险等级}{level|${name}}{percent|${dataMap[name].percent}}{count|${dataMap[name].value}}`,
      textStyle: {
        rich: {
          label: {
            width: 54,
            color: '#9AA6B8'
          },
          level: {
            width: 30,
            color: '#494949',
            fontSize: 18
          },
          percent: {
            width: 50,
            color: '#9AA6B8'
          },
          count: {
            width: 46,
            color: '#9AA6B8'
          }
        }
      },
    },
    series: [
      {
        type: 'pie',
        center: [120, '50%'],
        radius: ['54%', '70%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        data
      }
    ]
  }
}

// 环形图，任务结果总览-项目评估-深度评估结果分布
export function getCircleOption3({
  totalLabel = '总量',
  totalValue = 0,
  color = ['#3B68F0', '#3BB5EF'],
  data = [], // [{name, value}]
}) {
  // 用于图例渲染
  const dataMap = {}
  data.forEach(item => {
    dataMap[item.name] = item
  })
  return {
    color,
    graphic: {
      type: 'group',
      x: 120,
      top: 'center',
      children: [
        {
          type: 'text',
          left: 'center',
          top: 0,
          style: {
            text: totalValue,
            textAlign: 'center',
            font: 'bolder 2em sans-serif',
            fill: '#394D78'
          }
        },
        {
          type: 'text',
          left: 'center',
          top: 30,
          style: {
            text: totalLabel,
            textAlign: 'center',
            fill: '#9AA6B8'
          }
        }
      ]
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      right: 100,
      itemGap: 40,
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 12,
      formatter: (name) => `{level|${dataMap[name].value}}\n\n{label|${name}}`,
      textStyle: {
        rich: {
          label: {
            width: 56,
            color: '#9AA6B8'
          },
          level: {
            width: 42,
            color: '#494949',
            fontSize: 18,
            fontWeight: 'bold'
          },
          percent: {
            width: 46,
            color: '#9AA6B8'
          },
          count: {
            width: 46,
            color: '#9AA6B8'
          }
        }
      },
    },
    series: [
      {
        type: 'pie',
        center: [120, '50%'],
        radius: ['54%', '70%'],
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        data
      }
    ]
  }
}

// 环形图，客户风险总览-风险类型分布
export function getCircleOption4({
  totalLabel = '总量',
  totalValue = '0',
  color = ['#3B68F0', '#3BB5EF', '#F7B500', '#D3997A', '#7885AB'],
  data = []
}) {
  // 用于图例渲染
  const dataMap = {}
  data.forEach(item => {
    dataMap[item.name] = item
  })
  return {
    color,
    legend: {
      orient: 'vertical',
      top: 'center',
      right: 0,
      itemGap: 20,
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 12,
      formatter: (name) => `{label|${name}}{percent|${dataMap[name].percent}}{count|${dataMap[name].value}}`,
      textStyle: {
        rich: {
          label: {
            width: 106,
            color: '#9AA6B8'
          },
          percent: {
            width: 50,
            color: '#9AA6B8'
          },
          count: {
            width: 46,
            color: '#9AA6B8'
          }
        }
      },
    },
    series: [
      {
        type: 'pie',
        center: ['26%', '50%'],
        radius: ['54%', '70%'],
        label: {
          show: true,
          position: 'center',
          formatter: [
            `{value|${totalValue}}`,
            `{label|${totalLabel}}`,
          ].join('\n'),
          rich: {
            value: {
              padding: [0, 0, 10, 0],
              verticalAlign: 'middle',
              fontSize: 24,
              fontWeight: 'bolder',
              color: '#394D78'
            },
            label: {
              verticalAlign: 'middle',
              color: '#9AA6B8'
            },
          },
        },
        labelLine: {
          show: false
        },
        data
      }
    ]
  }
}

// 柱状图，评估结果总览-赊销评估-评估模式及评级结果
export function getBarOption1({
  data = [[100, 30, 70], [20, 30, 55]], // [[], []]
  legnedData = ['赊销评估任务数', '赊销评估客户数'],
  xAxisData = ['快速评估', '标准评估', '精准评估'],
  color = ['#3B68F0', '#25BECD']
}) {
  return {
    grid: {
      containLabel: true,
      left: 30,
      right: 130,
      top: 30,
      bottom: 20,
    },
    color,
    tooltip: {
      show: true,
      trigger: 'axis',
      valueFormatter: (value) => `${value}个`
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      right: 0,
      itemGap: 20,
      data: legnedData,
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 12,
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          lineStyle: {
            color: '#9AA6B8'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 10
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '数量',
        splitNumber: 5,
        minInterval: 1,
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#EAEBEE'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#9AA6B8'
          }
        },
      }
    ],
    series: [
      {
        name: legnedData[0],
        type: 'bar',
        barWidth: 16,
        data: data[0]
      },
      {
        name: legnedData[1],
        type: 'bar',
        barWidth: 16,
        data: data[1]
      },
    ]
  }
}

// 柱状图，客户风险总览-风险原因分布
export function getBarOption2({
  yAxisData = [],
  data = [],
  dataZoomStart = 0, // 缩放轴的起始百分比，因为缩放轴在y轴，所以轴的范围从上到下，应该是[100, start]
}) {
  const sum = data.reduce((sum, a) => sum + a, 0)
  const dataMap = {}
  yAxisData.forEach((label, index) => {
    dataMap[label] = (data[index] / sum * 100).toFixed(2) + '%'
  })
  return {
    grid: {
      containLabel: true,
      left: 0,
      top: 20,
      bottom: 20,
    },
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: ['#EAEBEE']
        }
      }
    },
    yAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: '#EAEBEE'
        }
      },
      axisLabel: {
        color: '#494949',
        width: '100',
        overflow: 'truncate'
      },
      data: yAxisData
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: params => {
        return `${params[0].name}<br />
          ${params[0].marker}
          <span style="margin-right: 20px;">${dataMap[params[0].name]}</span>
          ${params[0].value}起`
      }
    },
    dataZoom: [
      {
        type: 'inside',
        zoomLock: true,
        orient: 'vertical',
        filterMode: 'none',
        start: dataZoomStart,
        end: 100,
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 30,
        height: '88%',
        right: 2,
        showDataShadow: false,
        showDetail: false,
        brushSelect: false,
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: 16,
        data,
      }
    ]
  }
}
