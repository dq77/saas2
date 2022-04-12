// table
export const columns = [
  { label: '任务批次', key: 'taskSn' },
  { label: '任务模块', key: 'moduleName' },
  { label: '创建人', key: 'createdName' },
  { label: '提交时间', key: 'createdTime' },
  { label: '任务类型', key: 'taskTypeName' },
  { label: '提交任务数', key: 'totalNum' },
  { label: '处理成功数', key: 'successNum' },
  { label: '处理失败数', key: 'failNum' },
  { label: '失败原因反馈', key: 'operate', fixed: 'right' }
]
// 查询-form
export const formData = {
  moduleName: undefined,
  businessType: undefined,
  createdName: undefined,
  time: undefined,
}
export const formConfig = [
  { type: 'select', key: 'moduleName', label: '任务模块', options: [] },
  { type: 'select', key: 'businessType', label: '任务类型', options: [], otherKeys: { label: 'name', value: 'code' } },
  { type: 'input', key: 'createdName', label: '创建人' },
  { type: 'datePicker', key: 'time', label: '提交时间', kind: 'daterange' },
]
