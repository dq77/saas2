import moment from 'moment'
const getSelectOption = (enums) => {
  const options = []
  for (const i in enums) {
    options.push({
      label: enums[i],
      value: i
    })
  }
  return options
}
const typeEnums = {
  1: '快速评估',
  2: '深度评估'
}
const statusEnums = {
  1: '待提交',
  2: '评估中',
  3: '完成',
  4: '已取消'
}
const resultEnums = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  通过: '通过',
  拒绝: '拒绝'
}
const type = getSelectOption(typeEnums)
const status = getSelectOption(statusEnums)
const result = getSelectOption(resultEnums)

export const cFormData = {
  name: undefined,
  type: undefined,
  status: undefined,
  result: undefined,
  starter: undefined,
  riskLevel: undefined,
  memberName: undefined,
  insDatetime: undefined,
  insDatetimeFrom: undefined,
  insDatetimeTo: undefined,
  resultTime: undefined,
  resultTimeFrom: undefined,
  resultTimeTo: undefined,
}
export const getFormConfig = [
  {
    type: 'input',
    key: 'name',
    label: '客户名称',
    clearable: true
  },
  {
    type: 'select',
    key: 'type',
    label: '评估模式',
    clearable: true,
    options: type
  },
  {
    type: 'select',
    key: 'status',
    label: '评估状态',
    clearable: true,
    options: status
  },
  {
    type: 'select',
    key: 'result',
    label: '评估结果',
    clearable: true,
    options: result
  },
  {
    type: 'input',
    key: 'starter',
    label: '发起人',
    clearable: true
  },
  {
    type: 'datePicker',
    key: 'insDatetime',
    label: '发起时间',
    clearable: true,
    kind: 'daterange'
  },
  {
    type: 'datePicker',
    key: 'resultTime',
    label: '评估完成时间',
    clearable: true,
    kind: 'daterange'
  },
]

export const collectionColumns = [
  { label: '任务编号', key: 'taskNumber', fixed: 'left', width: 150 },
  { label: '客户名称', key: 'name', minWidth: 150, fixed: 'left' },
  { label: '评估模式', key: 'type', render: (row, item) => { return typeEnums[item] || '- -' } },
  { label: '评估状态', key: 'status', render: (row, item) => { return statusEnums[item] || '- -' } },
  { label: '评估结果', key: 'result', render: (row, item) => { return resultEnums[item] || '- -' } },
  { label: '发起人', key: 'starter' },
  { label: '发起时间', key: 'insDatetime', render: (row, item) => item ? moment(item).format('YYYY-MM-DD HH:mm:ss') : '- -', minWidth: 150 },
  { label: '评估完成时间', key: 'resultTime', render: (row, item) => item ? moment(item).format('YYYY-MM-DD HH:mm:ss') : '- -', minWidth: 150 },
  { label: '操作', key: 'operate', slotName: 'operate', width: 200, fixed: 'right' },
]
