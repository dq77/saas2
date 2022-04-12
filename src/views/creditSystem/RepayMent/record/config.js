const resultStatus = {
  1: '处理中',
  2: '处理完成'
}

export const columns = [
  { label: '文件名称', key: 'fileName' },
  { label: '操作账号', key: 'memberName' },
  { label: '操作时间', key: 'createdTime' },
  { label: '执行结果', key: 'statusName' },
  { label: '含处理失败情况', key: 'haveFailures', render: (item, val) => val ? '是' : '否' },
  { label: '操作', key: 'operate' }
]

export const cFormData = { fileName: undefined, memberName: undefined, time: undefined, status: undefined }

export const cFormConfig = [
  { type: 'input', key: 'fileName', label: '文件名称' },
  { type: 'input', key: 'memberName', label: '操作账号' },
  { type: 'datePicker', key: 'time', label: '操作时间', kind: 'daterange' },
  { type: 'select', key: 'status', label: '执行结果', options: Object.keys(resultStatus).map(key => ({ label: resultStatus[key], value: key })) },
]
