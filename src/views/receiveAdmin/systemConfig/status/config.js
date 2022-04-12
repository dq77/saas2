export const columns = [
  { label: '收款状态', key: 'statusCode', width: 240, align: 'center' },
  { label: '是否到达计划应收时间', key: 'overdueDays', align: 'center'},
  { label: '是否完全收回', key: 'repayStatus', align: 'center' },
  { label: '', key: 'operate', width: 240, align: 'center' },
]
export const defaultData = { statusCode: '', statusName: '', overdueDays: 0, repayStatus: 2, conditionType: '>' }
export const title = '收款状态配置'
export const formData = { dictName: '' }
export const formConfig = [
  { type: 'input', key: 'dictName', label: '状态名称', maxlength: 50 },
]
export const formRules = {
  dictName: [
    { required: true, message: '请输入状态名称', trigger: 'blur' },
  ]
}
