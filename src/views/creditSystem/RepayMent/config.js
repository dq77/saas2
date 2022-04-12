import moment from 'moment'
import { percent2 } from '@/utils/qjd'
import { repayStatus, overdueStatus } from '@/utils/enums'

export const columns = [
  { label: '订单编号', key: 'extOrderCode', minWidth: 120 },
  { label: '发货单号', key: 'extDeliveryCode', minWidth: 100 },
  { label: '剩余应收账款金额', key: 'leftLoanAmount', minWidth: 140, sortable: 'custom', render: (row, item) => percent2(item), align: 'right' },
  { label: '可退款金额', key: 'backAmount', minWidth: 200, align: 'right' },
  { label: '客户名称', key: 'customerName', minWidth: 100 },
  { label: '还款周期', key: 'debtPeriodDays', minWidth: 100 },
  { label: '发货时间', key: 'deliveryTime', sortable: 'custom', minWidth: 110 },
  { label: '最终还款时间', key: 'debtEndTime', sortable: 'custom', minWidth: 120, render: (row, item) => item ? moment(item).format('YYYY-MM-DD') : '- -'},
  { label: '还款状态', key: 'repayStatus', minWidth: 80, render: (row, item) => repayStatus[item] },
  { label: '逾期状态', key: 'overdueStatus', minWidth: 80, render: (row, item) => overdueStatus[item] },
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 60, options: [{ label: '查看' }] },
]

export const cFormData = {
  customerName: undefined,
  extOrderCode: undefined,
  extDeliveryCode: undefined,
  repayStatus: undefined,
  goodTime: undefined,
  endTime: undefined,
  overdueStatus: undefined
}

export const cFormConfig = [
  { type: 'input', key: 'customerName', label: '客户名称' },
  { type: 'input', key: 'extOrderCode', label: '订单编号' },
  { type: 'input', key: 'extDeliveryCode', label: '发货单号' },
  { type: 'select', key: 'repayStatus', label: '还款状态', options: Object.keys(repayStatus).map(key => ({ label: repayStatus[key], value: key })) },
  { type: 'datePicker', key: 'goodTime', label: '发货时间', kind: 'daterange' },
  { type: 'datePicker', key: 'endTime', label: '最后还款时间', kind: 'daterange' },
  { type: 'select', key: 'overdueStatus', label: '逾期状态', options: Object.keys(overdueStatus).map(key => ({ label: overdueStatus[key], value: key })) },
]
