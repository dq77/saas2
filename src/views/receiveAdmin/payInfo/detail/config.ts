import { percent2 } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'

export const colColumns = [
  { label: '应收计划信息', key: 'plain' },
  { label: '应收款项信息', key: 'pay' },
]

export const defaultActiveName = ['plain', 'pay']

export const plainColumns = [
  { label: '应收类型：', key: 'receivableType', render: (data, item) => item && receiveTypes[item] ? receiveTypes[item] : '- -' },
  { label: '应收名称：', key: 'receivablePlanName' },
  { label: '收款对象：', key: 'customerName' },
  { label: '应收总金额(元)：', key: 'receivableAmount', render: (data, item) => percent2(item) },
  { label: '最后应收时间：', key: 'receivableEndDate', num: 1 },
]

export const payColumns = [
  { label: '款项类型：', key: 'fundTypeName' },
  { label: '计划应收时间：', key: 'planEndDate' },
  { label: '款项状态：', key: 'statusName' },
  { label: '计划应收金额：', key: 'receivableAmount', render: (data, item) => percent2(item) },
  { label: '已收金额：', key: 'returnedAmount', num: 1, render: (data, item) => percent2(item) },
  { label: '收款进度：', key: 'returnedProportion', num: 1 },
]

export const getOptions = (data, color) => {
  return {
    series: [{
      type: 'liquidFill',
      data: [data],
      color: [color],
      outline: {
        borderDistance: 2,
        itemStyle: {
          borderWidth: 2,
          borderColor: color,
        },
      },
      backgroundStyle: {
        color: '#fff'
      },
      label: {
        show: false
      },
      itemStyle: {
        shadowBlur: 0,
      },
      animationDuration: 500,
    }]
  }
}
