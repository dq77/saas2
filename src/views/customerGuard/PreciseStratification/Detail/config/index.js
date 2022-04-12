import moment from 'moment'
import { preciseLevel, preciseStatus, } from '@/utils/enums'
// 0 未申请 1 申请中 2 回退  3 拒绝  4 通过',
// const applyStatus = {
//   0: '未申请',
//   1: '申请中',
//   2: '退回',
//   3: '拒绝',
//   4: '通过'
// }
// 仪表盘配置
export const guageOption = (grade = '获取中', score = '获取中') => {
  return {
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true,
          width: 10,
          roundCap: 10
        },
        axisLine: {
          lineStyle: {
            width: 10,
          },
          roundCap: 10
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
        },
        anchor: {
          show: false,
        },
        pointer: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: score === '获取中' ? 20 : 30,
          color: '#3B68F0',
          offsetCenter: [0, '0%'],
          formatter: function(value) {
            return score
          }
        },
        title: {
          show: true,
          offsetCenter: [0, '90%'],
          fontSize: 14
        },
        data: [
          {
            value: score,
            name: preciseLevel[grade] || '获取失败'
          },
        ]
      }
    ]
  }
}

// 评估记录resultColumns
export const resultColumns = [
  // { label: '修改人', key: 'companyName', minWidth: 100 },
  { label: '更新时间', key: 'updateTime', minWidth: 100, render: (row, item) => item ? moment(item).format('YYYY-MM-DD HH:mm:ss') : '- -' },
  { label: '评估状态', key: 'status', minWidth: 80, render: (row, item) => preciseStatus[item]},
  { label: '分数分段', key: 'grade', minWidth: 80, render: (row, item) => item ? preciseLevel[item] : '- -' },
  { label: '价值分数', key: 'score', width: 100 },
  { label: '操作', key: 'operate', type: 'text', precision: 2, align: 'center' },
]

// 评估结果对应描述
export const resultTip = {
  // 偿还债务能力
  repay: {
    A: '极强',
    B: '较强',
    C: '中等',
    D: '偏弱',
    E: '很弱',
  },
  // 企业经营状态
  manager: {
    A: '良性循环',
    B: '良性循环',
    C: '正常',
    D: '不佳',
    E: '基本处于恶性循环',
  },
  // 不确定因素对企业经营和发展
  influenceToDevelop: {
    A: '影响最小',
    B: '影响较小',
    C: '影响中等',
    D: '影响较大',
    E: '走向良性循环内外部因素少',
  },
  // 不确定因素对盈利和偿债能力
  influenceToRepay: {
    A: '影响最小',
    B: '较小波动',
    C: '易产生波动',
    D: '较大波动',
    E: '走向良性循环内外部因素少',
  },
  // 违约风险
  risk: {
    A: '极低',
    B: '较低',
    C: '中等',
    D: '较高',
    E: '高',
  },
  // 违约概率
  chance: {
    A: '0%',
    B: '4%',
    C: '11%',
    D: '21%',
    E: '47%',
  },
}
