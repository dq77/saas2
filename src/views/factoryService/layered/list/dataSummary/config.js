export const pieOption = {
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
      radius: ['62%', '80%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '12',
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      color: ['#3B68F0', '#3B88EF', '#3BB5EF', '#3BDDEF', '#00B4CC', '#7885AB'],
      data: []
    }
  ]
}
export const barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '0%',
    right: '2%',
    bottom: 5,
    top: 10,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['企业-失信被执行', '企业-限制高消费', '企业-被执行人', '企业-三年内因借贷纠纷成为被告', '企业-税务违法', '个人失信', '个人限高', '个人当前有被执行']
  },
  series: [
    {
      type: 'bar',
      color: ['#3B68F0'],
      barWidth: 12,
      data: []
    },
  ]
}
export const summaryRedLine = {
  1: '企业-失信被执行',
  2: '企业-限制高消费',
  3: '企业-被执行人',
  4: '企业-三年内因借贷纠纷成为被告',
  5: '企业-税收违法',
  6: '个人失信',
  7: '个人限高',
  8: '个人当前有被执行',
}
