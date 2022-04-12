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
