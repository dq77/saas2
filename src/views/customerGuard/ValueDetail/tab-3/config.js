import { toAmountStr } from '@/utils/util'
// 带线条描述的饼图
export const pieOptionWithLabels = {
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
      radius: ['32%', '52%'],
      avoidLabelOverlap: false,
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
      data: [],
      width: 380,
      label: {
        alignTo: 'edge',
        formatter: '{name|{b}}\n{time|{c} 次 ({d}%)}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 25,
        rich: {
          time: {
            fontSize: 10,
            color: '#999'
          }
        }
      },
      labelLine: {
        length: 15,
        length2: 0,
        maxSurfaceAngle: 80
      },
      labelLayout: function (params) {
        const isLeft = params.labelRect.x < 190
        const points = params.labelLinePoints
        // Update the end point.
        points[2][0] = isLeft
          ? params.labelRect.x
          : params.labelRect.x + params.labelRect.width
        return {
          labelLinePoints: points
        }
      },
    }
  ]
}
// 双折线图基础配置
export const doubleLineOption = {
  color: ['#3C5DA4', '#25BECD'],
  legend: {
    data: [],
  },
  grid: {
    top: '15%',
    bottom: '10%',
    left: '10%',
    right: '0'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
      },
      show: true // 隐藏或显示
    }
  },
  series: []
}
export const chart3Legend = ['销售金额（亿元）']

export const chart3YData = [
  {
    name: '销售金额（亿元）',
    data: [],
    type: 'line',
    symbolSize: 5
  },
]
export const chart6Legend = ['aa', 'bb', 'cc']

export const chart6YData = [
  {
    name: 'aa',
    data: [],
    type: 'line',
    symbolSize: 5
  },
  {
    name: 'bb',
    data: [],
    type: 'line',
    symbolSize: 5
  },
  {
    name: 'cc',
    data: [],
    type: 'line',
    symbolSize: 5
  },
]
// 基础柱状图基础配置
export const barOptions = {
  color: ['#3C5DA4'],
  barWidth: 20,
  grid: {
    top: '15%',
    bottom: '10%',
    left: '12%',
    right: '0'
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      return toAmountStr(params[0].data, 2)
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      rotate: 0,
      textStyle: {
        color: '#000',
        fontSize: 12
      }
    },
  },
  yAxis: {
    type: 'value',
    splitLine: { // 网格线
      lineStyle: {
        type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
      },
      show: true // 隐藏或显示
    }
  },
  series: [{
    data: [],
    type: 'bar'
  }]
}
// 柱状折线混合图基础配置
export const barAndLineOption = {
  color: ['#3C5DA4', '#25BECD'],
  legend: {
    data: [],
  },
  barWidth: 10,
  grid: {
    top: '20%',
    bottom: '10%',
    left: '12%',
    right: '10%'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: [
    {
      name: [],
      type: 'value',
      splitLine: { // 网格线
        lineStyle: {
          type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
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
      name: '',
      data: [],
      type: 'bar'
    },
    {
      name: '',
      data: [],
      type: 'line',
      yAxisIndex: 1,
      symbolSize: 5
    }
  ]
}
export const chartLegend7 = ['归母净利润（亿元）', '净利率（%）']
export const chartLegend8 = ['存货周转天数（天）', '总资产周转率（次）']
export const chartLegend9 = ['销售现金比率（%）', '速动比率']
export const chartLegend10 = ['流动比率', '利息倍数']
// 近期变更
export const recentlyInfo = {
  columns: [
    {
      label: '变更类型',
      key: 'legal',
      width: '200'
    },
    {
      label: '次数',
      key: 'establish',
      width: '100'
    },
    {
      label: '最近一次变更日期',
      key: 'manage',
      width: '100'
    },
  ]
}
// china map
export const mapOption = {
  visualMap: { // 地图图例
    type: 'continuous',
    show: true,
    left: 15,
    bottom: 25,
    showLabel: true,
    itemWidth: 8,
    itemHeight: 60,
    min: 0,
    // max: this.maxAmount > 6 ? this.maxAmount : 6,
    // text: [this.maxAmount > 6 ? this.maxAmount : 6, 0],
    inRange: {
      color: ['#E1EBF7', '#5792D7', '#406DBD', '#2E4CA5', '#1E339E', '#0A003C']
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      let place = ''
      let value = 0
      if (params.name === '南海诸岛') {
        place = '涉案地区分布'
        value = '南海诸岛：0家'
      } else {
        if (params.data) {
          place = '涉案地区分布'
          value = `${params.data.name}：${params.data.value}家`
        }
      }
      return `${place}<br />${value}`
    }
  },
  geo: { // 中国地图设置
    map: 'china',
    roam: true,
    // scaleLimit: { // 缩放比例
    //   min: 0.5,
    //   max: 2
    // },
    zoom: 1.1,
    label: {
      opacity: 0,
      // show: false
    },
    itemStyle: {
      borderColor: '#406DBD'
    },
    emphasis: {
      itemStyle: {
        areaColor: '#3C5DA4',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0
      }
    }
  },
  series: [
    {
      name: '省份',
      type: 'map',
      geoIndex: 0,
      selectedMode: false,
      data: null
    }
  ]
}
/** echarts data */
// 案件身份
export const echartApi1 = [
  { name: '其他', value: 0, key: 'otherCount' },
  { name: '原告', value: 0, key: 'accuserCount' },
  { name: '被告', value: 0, key: 'defendantCount' }
]
// 法律诉讼趋势
export const chartLegend2 = ['法律诉讼趋势']
export const chartYData2 = [
  { name: '法律诉讼趋势', type: 'line', symbolSize: 5, data: [] }
]
// 司法类别（自身风险） - 关联风险类型 （关联风险）
export const echartApi3 = [
  { name: '裁判文书', value: 0, key: 'beigaoAllScount' },
  { name: '送达公告次数', value: 0, key: 'gonggaoCount' },
  { name: '失信人次数', value: 0, key: 'shixingAllCount' },
  { name: '被执行人次数', value: 0, key: 'beizhixingAllCount' },
  { name: '终本案件次数', value: 0, key: 'zhongbenAllCount' },
  { name: '限制高消费次数', value: 0, key: 'xiangaoAllCount' },
]
// 关联风险趋势
export const chartLegend6 = ['送达公告次数', '失信人次数', '被执行人次数', '终本案件次数', '限制高消费次数', '裁判文书']
export const chartYData6 = [
  { name: '送达公告次数', type: 'line', symbolSize: 5, data: [] },
  { name: '失信人次数', type: 'line', symbolSize: 5, data: [] },
  { name: '被执行人次数', type: 'line', symbolSize: 5, data: [] },
  { name: '终本案件次数', type: 'line', symbolSize: 5, data: [] },
  { name: '限制高消费次数', type: 'line', symbolSize: 5, data: [] },
  { name: '裁判文书', type: 'line', symbolSize: 5, data: [] },
]
// 变更趋势
export const echartApi6 = [
  { name: '送达公告次数', key: 'gongGaoTime' },
  { name: '失信人次数', key: 'shiXinTime' },
  { name: '被执行人次数', key: 'beiZhiXingTime' },
  { name: '终本案件次数', key: 'zhongBenTime' },
  { name: '限制高消费次数', key: 'xianGaoTime' },
  { name: '裁判文书', key: 'cpwsTime' }
]
// 地图
export const nameEnums = {
  云南: '云南',
  黑龙江: '黑龙江',
  贵州: '贵州',
  北京: '北京',
  河北: '河北',
  山西: '山西',
  吉林: '吉林',
  宁夏: '宁夏',
  辽宁: '辽宁',
  海南: '海南',
  内蒙古: '内蒙古',
  天津: '天津',
  新疆: '新疆',
  上海: '上海',
  陕西: '陕西',
  甘肃省: '甘肃',
  安徽省: '安徽',
  香港特别行政区: '香港',
  广东: '广东',
  河南: '河南',
  湖南: '湖南',
  江西: '江西',
  四川: '四川',
  广西: '广西',
  江苏: '江苏',
  澳门: '澳门',
  浙江省: '浙江',
  山东: '山东',
  青海: '青海',
  重庆: '重庆',
  福建: '福建',
  湖北: '湖北',
  西藏自治区: '西藏',
  台湾: '台湾'
}
// 提示文案
export const popoverTexts = {
  text1: '统计原告，被告及其他身份的数量。',
  text2: '统计最近5年被告数量的趋势。',
  text3: '统计自身法律诉讼，限高，失信等的数量及占比间。',
  text4: '统计法律诉讼法院名称Top10及其数量。',
  text5: '统计公司关联的法律诉讼，限高，失信等的数量及占比。',
  text6: '统计最近5年公司关联的法律诉讼，限高，失信等的趋势。',
  text7: '统计法律诉讼涉案地区及对应的数量。',
  text8: '统计法律诉讼涉案案由及对应的数量。'
}
