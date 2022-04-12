import { assetsBaseUrl } from '@/utils/config'

export const graphicList = [
  { key: 'totalReceivableCount', name: '应收计划总数', value: 0, icon: `${assetsBaseUrl}/receiveAdmin/workSpace/project-1.png` },
  { key: 'totalReceivableAmount', name: '应收金额总和', value: 0, icon: `${assetsBaseUrl}/receiveAdmin/workSpace/project-2.png`, isAmount: true },
  { key: 'totalReturnedAmount', name: '已收金额总和', value: 0, icon: `${assetsBaseUrl}/receiveAdmin/workSpace/project-3.png`, isAmount: true },
]
export const aBoxList = [
  { key: 'notDueReturnedAmount', name: '未到期已收金额总和', value: 0, isAmount: true },
  { key: 'notDueRemainingAmount', name: '未到期未收金额总和', value: 0, isAmount: true }
]
export const aPieList = [
  { key: 'notDuePlanCount', name: '未到期计划数量', value: 0 },
  { key: 'notDueReceivableAmount', name: '未到期应收金额总和', value: 0, isAmount: true }
]
export const bBoxList = [
  { key: 'dueReturnedAmount', name: '已到期已收金额总和', value: 0, isAmount: true },
  { key: 'dueRemainingAmount', name: '已到期未收金额总和', value: 0, isAmount: true }
]
export const bPieList = [
  { key: 'duePlanCount', name: '已到期计划数量', value: 0 },
  { key: 'dueReceivableAmount', name: '已到期应收金额总和', value: 0, isAmount: true }
]
export const pieOption = {
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
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      color: ['#FE9327', '#FEBB27'],
      data: null
    }
  ]
}
