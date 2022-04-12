// chart-data
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
        fontSize: 28,
        color: '#3B68F0',
        formatter: function(value) {
          return value
        }
      },
      progress: {
        width: 20,
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
          width: 20,
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
        size: 13,
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
const defaultGuageOption = guageOption
// 仪表盘配置(触及红线)
const redGuageOption = {
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
        width: 20,
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
const noneGuageOption = (text) => {
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
            width: 20,
            color: [[1, '#ffffff']]
          }
        },
        progress: {
          width: 20,
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
/** 基础表格 */
// 总分
const totalList = [
  { id: 1, dimension: '总分', condition: '(70，100]', level: '高', text: '高' },
  { id: 2, dimension: '总分', condition: '(36，70]', level: '中', text: '中' },
  { id: 3, dimension: '总分', condition: '[0，35]', level: '低', text: '低' }
]
// 基本信息 工商信息
const baseList = [
  {
    id: 4,
    dimension: '基本信息',
    condition: '(70，100]',
    level: '较好',
    text: '企业规模较大，资本实力较强，具备较强的抗风险能力'
  },
  {
    id: 5,
    dimension: '基本信息',
    condition: '(35，70]',
    level: '一般',
    text: '企业规模一般，资本实力一般，具备一般的抗风险能力'
  },
  {
    id: 6,
    dimension: '基本信息',
    condition: '[0，35]',
    level: '差',
    text: '企业规模较小，资本实力较弱，具备较差的抗风险能力'
  },
]
// 经营状况
const operateList = [
  {
    id: 7,
    dimension: '经营状况',
    condition: '(70，100]',
    level: '稳定',
    text: '企业整体运营状况相对良好，经营风险相对较低'
  },
  {
    id: 8,
    dimension: '经营状况',
    condition: '(35，70]',
    level: '一般',
    text: '企业整体运营状况一般，经营风险一般'
  },
  {
    id: 9,
    dimension: '经营状况',
    condition: '[0，35]',
    level: '不稳定',
    text: '企业整体运营状况差，可能存在较高的经营风险'
  }
]
// 司法风险
const riskList = [
  {
    id: 10,
    dimension: '司法风险',
    condition: '(70，100]',
    level: '低',
    text: '企业无司法案件或司法涉案风险影响极低，对企业舆论信息影响较低'
  },
  {
    id: 11,
    dimension: '司法风险',
    condition: '(35，70]',
    level: '中',
    text: '企业司法涉案风险影响一般，对企业舆论信息影响一般'
  },
  {
    id: 12,
    dimension: '司法风险',
    condition: '[0，35]',
    level: '高',
    text: '企业司法涉案风险影响较大，可能对企业舆论信息影响较大'
  }
]
// 履约行为
const performanceList = [
  {
    id: 13,
    dimension: '履约行为',
    condition: '(70，100]',
    level: '较好',
    text: '企业信用历史较好，有少量或无违约行为'
  },
  {
    id: 14,
    dimension: '履约行为',
    condition: '(35，70]',
    level: '一般',
    text: '企业信用历史一般，有较多的的违约行为'
  },
  {
    id: 15,
    dimension: '履约行为',
    condition: '[0，35]',
    level: '差',
    text: '企业信用历史差，有大量违约行为'
  }
]
// 财务分析
const financeList = [
  {
    id: 16,
    dimension: '财务分析',
    condition: '(70，100]',
    level: '较好',
    text: '企业财务数据表现较好，具备较好的可持续发展能力'
  },
  {
    id: 17,
    dimension: '财务分析',
    condition: '(35，70]',
    level: '一般',
    text: '企业财务数据表现一般，存在一定的可持续发展能力'
  },
  {
    id: 18,
    dimension: '财务分析',
    condition: '[0，35]',
    level: '差',
    text: '企业财务数据表现差，可能不具备可持续发展能力'
  }
]

const tableData = [
  ...totalList,
  ...baseList,
  ...operateList,
  ...riskList,
  ...performanceList,
  ...financeList
]

const columns = [
  {
    label: '分数维度',
    key: 'dimension',
    width: '100'
  },
  {
    label: '得分',
    key: 'condition',
    width: '100'
  },
  {
    label: '描述',
    key: 'desc',
    width: '500',
    render: (row, v) => {
      if (row.dimension === '总分') {
        return row.text
      } else {
        return `${row.level}：${row.text}`
      }
    }
  }
]

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    if (rowIndex % 3 === 0) {
      return {
        rowspan: 3,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}
// tableSource
const tableSource = [
  {score: 0, dimension: '基本信息', key: 'enterpriseBasicInfoScore', desc: '', level: '', status: 1, content: '根据企业成立年限，资本规模，股东情况等综合分析'},
  {score: 0, dimension: '经营状况', key: 'enterpriseRiskInfoScore', desc: '', level: '', status: 1, content: '根据企业经营合规，经营动态，发展创新等综合分析'},
  {score: 0, dimension: '司法风险', key: 'enterpriseLawsuitInfoScore', desc: '', level: '', status: 1, content: '根据涉诉情况，结合企业基本信息，分析案件风险'},
  {score: 0, dimension: '履约行为', key: 'enterpriseCreditInfoScore', desc: '', level: '', status: 1, content: '根据企业历史信用行为，分析企业近期履约状况'},
  {score: 0, dimension: '财务分析', key: 'financialDataInfoScore', desc: '', level: '', status: 1, content: '根据企业发布的财务数据，综合对比分析'}
]

const getKey = (value) => {
  if (value > 70) {
    return 0
  } else if (value > 35) {
    return 1
  } else {
    return 2
  }
}

export {
  defaultGuageOption,
  redGuageOption,
  noneGuageOption,
  totalList,
  baseList,
  operateList,
  riskList,
  performanceList,
  financeList,
  tableData,
  columns,
  tableSource,
  objectSpanMethod,
  getKey
}
