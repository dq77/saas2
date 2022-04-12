/**
 * 场景：适用于目前ui设计通用柱状图（参考赊销总览柱状图），若有差异需额外扩展或另外封装
 * @param xData x轴数据
 * @param dataSource y轴数据
 * @param xDeg x轴倾斜角度，默认为零，为了容错提供配置入口
 * @param grid x、y轴位置，为了容错提供配置入口，bottom默认为8%，demo： { left: '1%', right: '1%' }
 * @param barWidth 柱子宽度
 * @param labelMaxLen x轴文案长度大于labelMaxLen时显示....
 */
export const getBaseBar = ({
  xData = [],
  dataSource = [],
  xDeg = 0,
  grid = {},
  barWidth = 16,
  labelMaxLen = 3
} = {}) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      bottom: '8%',
      containLabel: true,
      ...grid,
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#9AA6B8'
        }
      },
      axisLabel: {
        interval: 0,
        rotate: xDeg,
        formatter: (value) => {
          if (value.length > labelMaxLen) return value.substring(0, labelMaxLen) + '...'
          return value
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      data: dataSource,
      type: 'bar',
      barWidth,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      label: {
        show: true,
        position: 'top',
        color: '#9AA6B8'
      },
      color: ['#3B68F0']
    }]
  }
}
