import { percent2 } from '@/utils/qjd'
import { toAmountStr } from '@/utils/util'
export const columns = [
  { label: '活动名称', key: 'activityName', minWidth: 125 },
  { label: '活动时间', key: 'startTime', minWidth: 166, render: (row, item) => row ? (row.startTime + ' 至 ' + row.endTime) : '- -' },
  { label: '创建时间', key: 'createdTime', minWidth: 100 },
  { label: '状态', key: 'status', minWidth: 60, render: (row, item) => item ? statusEnumOptions[row.status] : '- -' },
  { label: '折扣产品购买数量', key: 'sellGoodsQuantity', minWidth: 135, align: 'right', render: (row, item) => toAmountStr(item || 0, -1, true) },
  { label: '折扣产品购买金额(元)', key: 'activityPriceVolume', minWidth: 135, align: 'right', render: (row, item) => percent2(item || 0) },
  { label: '优惠总金额(元)', key: 'preActivityVolume', minWidth: 110, align: 'right', render: (row, item) => percent2(row.preActivityVolume - row.activityPriceVolume || 0) },
  { label: '参与客户数(人)', key: 'participantCustomerNum', minWidth: 110, align: 'right', render: (row, item) => toAmountStr(item || 0, -1, true) },
  { label: '操作', key: 'operate', minWidth: 166 },
]

// 活动状态
export const statusEnumOptions: object = {
  '': '全部',
  RUNNING: '进行中',
  INIT: '未开始',
  EXPIRED: '已结束',
  TERMINATED: '已关闭'
}
export const formData: object = {
  activityName: undefined,
  status: ''
}

export const formConfig = [
  { type: 'input', key: 'activityName', label: '活动名称' },
  { type: 'select', key: 'status', label: '状态', options: Object.keys(statusEnumOptions).map(key => ({ label: statusEnumOptions[key], value: key }))},
]

export const promptTitle: string = '订货大师可支持根据客户、产品维度配置限时折扣活动。您可以通过折扣优惠活动，让产品推广效果翻倍！'
