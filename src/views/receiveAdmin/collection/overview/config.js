import { percent2 } from '@/utils/qjd'
export const columns = [
  { label: '客户名称', key: 'customerName', minWidth: 125 },
  { label: '剩余应收总金额', key: 'remainReceivableAmount', minWidth: 100, render: (row, item) => item ? percent2(item || 0) : '- -' },
  { label: '逾期总金额', key: 'overdueAmount', minWidth: 100, render: (row, item) => item ? percent2(item || 0) : '- -' },
  { label: '系统催收总记录数', key: 'systemUrgeCount', minWidth: 110 },
  { label: '人工催收总记录数', key: 'manualUrgeCount', minWidth: 110 },
  { label: '客户回款总记录数', key: 'customerReturnCount', minWidth: 110 },
  { label: '操作', key: 'operate', minWidth: 166 },
]

export const cFormData = {
  customerName: undefined,
}

export const cFormConfig = [
  { type: 'input', key: 'customerName', label: '客户名称' },
]
