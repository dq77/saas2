// import { toAmountStr } from '@/utils/util'
const colors1 = ['#3B68F0', '#3BB5EF', '#00B4CC', '#F7B500', '#D3997A', '#7885AB']
const labelColor = '#9AA6B8'
const yLabeColor = '#EAEBEE'
const axisLine = { lineStyle: { color: '#EAEBEE' } }
const color = '#3B68F0'
// 饼图  category
export const pieOptionWithLabels = {
  legend: {
    type: 'plain',
    orient: 'horizontal',
    y: 'center',
    x: 'right',
    width: 240,
    itemGap: 10,
    itemWidth: 24,
    textStyle: {
      rich: {
        a: {
          width: 80,
          fontSize: 18,
          verticalAlign: 'top',
          lineHeight: 22,
          color: '#494949'
        },
        b: {
          fontSize: 12,
          lineHeight: 17,
          color: '#9AA6B8'
        }
      }
    }
  },
  tooltip: {
    show: true,
    trigger: 'item',
    className: 'echarts-tooltip-point',
    formatter: function (params) {
      return `
        <div class="toolbox">
            <div class="left-box">
            <div class="icon" style="background-color:${params.color}"></div>
            <div class="text">${params.data.name}</div>
            </div>
            <div class="num">${params.data.value}</div>
        </div>
        `
    },
    position: function (point, params, dom, rect, size) {
      return [point[0] + 10, point[1] + 10]
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['38%', '52%'],
      center: ['22%', '50%'],
      avoidLabelOverlap: true,
      // minAngle: 3, // 扇形最小值
      emphasis: {
        label: {
          fontSize: '12',
        }
      },
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      color: colors1,
      data: []
    }
  ]
}
// 折线图基础配置
export const lineOption = {
  color: colors1,
  legend: {
    show: false
  },
  grid: {
    top: '15%',
    bottom: '10%',
    left: '10%',
    right: '9%'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: labelColor
    },
    axisLine: axisLine,
    data: [],
  },
  yAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      color: labelColor
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255, 255, 255, 0)'
      }
    },
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: yLabeColor
      },
      show: true // 隐藏或显示
    },
    data: [0, 'D', 'C', 'M', 'B', 'A']
  },
  series: []
}
// 多折线图基础配置 value
export const lineOption2 = {
  color: colors1,
  legend: {
    data: []
  },
  grid: {
    top: '15%',
    bottom: '10%',
    left: '10%',
    right: '9%'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: labelColor
    },
    axisLine: axisLine,
    data: [],
  },
  yAxis: {
    type: 'value',
    minInterval: 1, // 默认整数
    right: '80%',
    axisLabel: {
      color: labelColor
    },
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: yLabeColor
      },
      show: true // 隐藏或显示
    }
  },
  series: []
}
export const chartLegend = ['税务评级']
export const chartYData = [
  { name: '税务评级', type: 'line', symbolSize: 5, data: [] }
]
// 基础柱状图基础配置
export const barOptions = {
  color: color,
  barWidth: 16,
  grid: {
    top: '15%',
    bottom: '10%',
    left: '10%',
    right: '9%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      color: labelColor,
      formatter: (value) => {
        if (value.length > 4) return value.substring(0, 4) + '...'
        return value
      }
    },
    axisLine: axisLine
  },
  yAxis: {
    type: 'value',
    minInterval: 1, // 默认整数
    axisLabel: {
      color: labelColor
    },
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: yLabeColor
      },
      show: true // 隐藏或显示
    }
  },
  series: [{
    data: [],
    type: 'bar'
  }]
}
export const barOptionsCategory = {
  color: color,
  barWidth: 16,
  grid: {
    top: '15%',
    bottom: '10%',
    left: '10%',
    right: '9%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      color: labelColor,
      formatter: (value) => {
        if (value.length > 4) return value.substring(0, 4) + '...'
        return value
      }
    },
    axisLine: axisLine
  },
  yAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      color: labelColor
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0)'
      },
      show: false
    },
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: yLabeColor
      },
      show: true // 隐藏或显示
    },
    data: [0, 'D', 'C', 'M', 'B', 'A']
  },
  series: [{
    data: [],
    type: 'bar'
  }]
}
// 多柱状图基础配置
export const barOptions2 = {
  color: [color, '#25BECD'],
  barWidth: 16,
  legend: {
    data: []
  },
  grid: {
    top: '15%',
    bottom: '10%',
    left: '10%',
    right: '9%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      color: labelColor,
      formatter: (value) => {
        if (value.length > 4) return value.substring(0, 4) + '...'
        return value
      }
    },
    axisLine: axisLine
  },
  yAxis: {
    type: 'value',
    minInterval: 1, // 默认整数
    axisLabel: {
      color: labelColor
    },
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        color: yLabeColor
      },
      show: true // 隐藏或显示
    }
  },
  series: []
}
// 柱状折线混合图基础配置
export const barAndLineOption = {
  color: [color, '#25BECD'],
  legend: {
    data: []
  },
  barWidth: 16,
  grid: {
    top: '20%',
    bottom: '10%',
    left: '10%',
    right: '9%'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: labelColor
    },
    axisLine: axisLine,
    data: [],
  },
  yAxis: [
    {
      name: [],
      type: 'value',
      minInterval: 1, // 默认整数
      splitLine: { // 网格线
        lineStyle: {
          type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
          color: yLabeColor
        },
        show: true // 隐藏或显示
      }
    },
    {
      name: [],
      type: 'value',
      splitLine: { // 网格线
        lineStyle: {
          type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
        },
        show: false // 隐藏或显示
      }
    }
  ],
  series: [
    {
      name: '动产抵押次数（次）',
      data: [],
      type: 'bar'
    },
    {
      name: '动产抵押金额（元）',
      data: [],
      type: 'line',
      yAxisIndex: 1,
      symbolSize: 5
    }
  ]
}
