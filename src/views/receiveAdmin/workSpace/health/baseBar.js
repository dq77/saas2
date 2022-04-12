/**
 * @param xData x轴数据
 * @param dataSource y轴数据
 * @param xDeg x轴倾斜角度，默认为零，为了容错提供配置入口
 * @param grid x、y轴位置，为了容错提供配置入口，bottom默认为8%，demo： { left: '1%', right: '1%' }
 */
export const getBaseBar = ({
  xData = [],
  dataSource = [],
  xDeg = 0,
  grid = {}
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
        rotate: xDeg
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
    series: [
      {
        data: dataSource,
        type: 'bar',
        barWidth: 12,
        backgroundStyle: {
          color: '#3B86F0'
        },
        color: ['#3B86F0']
      },
      {
        data: dataSource,
        type: 'bar',
        barWidth: 12,
        backgroundStyle: {
          color: '#8CC5F6'
        },
        color: ['#8CC5F6']
      }
    ]
  }
}
