// 基本信息
export const baseInfoColumns = [
  {
    label: '法定代表人',
    key: 'legalPersonName'
  },
  {
    label: '成立年限',
    key: 'estiblishTime'
  },
  {
    label: '经营年限',
    key: 'fromTime'
  },
  {
    label: '注册资本',
    key: 'regCapital'
  },
  {
    label: '实缴资本',
    key: 'actualCapital'
  },
  {
    label: '参保人数',
    key: 'socialStaffNum'
  },
  {
    label: '人数规模',
    key: 'staffNumRange'
  }
]

// 股权信息
export const stockInfoColumns = [
  {
    label: '出资人',
    key: 'name'
  },
  {
    label: '认缴出资额',
    key: 'amomon'
  },
  {
    label: '持股比例',
    key: 'percent'
  },
  {
    label: '出资方式',
    key: 'paymet'
  },
  {
    label: '认缴出资日期',
    key: 'time'
  },
]
// 主要成员top10
export const topInfoColumns = [
  {
    label: '职位',
    key: 'typeJoin'
  },
  {
    label: '成员姓名',
    key: 'name'
  },
  {
    label: '认缴出资额',
    key: 'amomon'
  },
  {
    label: '认缴出资占比',
    key: 'percent'
  },
]
// 关联股权穿透数量
export const relationList = [
  { label: '上层关联', value: 'up' },
  { label: '下层关联', value: 'down' },
]
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
      avoidLabelOverlap: true,
      emphasis: {
        label: {
          fontSize: '12',
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      color: ['#3B68F0', '#3B88EF', '#3BDDEF', '#3BB5EF', '#00B4CC', '#7885AB'],
      data: []
    }
  ]
}
export const echartPieApi = [
  { name: '一层', value: 0, key: 'levelOne' },
  { name: '二层', value: 0, key: 'levelTwo' },
  { name: '三层', value: 0, key: 'levelThree' },
  { name: '四层', value: 0, key: 'levelFour' }
]
// 提示文案
export const popoverTexts = {
  text1: '企业上下游直接或间接对外投资数量。',
  text2: '统计股东之间出资占比的标准差，越大说明股东之间股权差异越大。'
}
