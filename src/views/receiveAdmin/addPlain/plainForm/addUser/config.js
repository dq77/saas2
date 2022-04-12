export const formData = {
  customerType: 1,
  gName: undefined,
  qName: undefined,
  socialCode: undefined,
  legalPersonName: undefined,
  memberIds: undefined
}
export const formConfig = [
  { type: 'radio', key: 'customerType', label: '收款对象类型', options: [{ label: '个人', value: 1 }, { label: '企业（含个体工商户）', value: 0 }] },
  { type: 'input', key: 'gName', label: '收款对象名称', isHidden: false },
  { type: 'select', key: 'qName', label: '收款对象名称', isHidden: true, loading: false, filterable: true, remote: true, options: [], otherKeys: { label: 'name', value: 'name' }, remoteMethod: null },
  { type: 'input', key: 'socialCode', label: '统一社会信用代码', disabled: true, isHidden: true },
  { type: 'input', key: 'legalPersonName', label: '法人姓名', disabled: true, isHidden: true },
  { type: 'select', key: 'memberIds', label: '业务员', multiple: true, options: [], otherKeys: { label: 'memberName', value: 'id' }, isHidden: true }
]
export const formRules = {
  customerType: [{ required: true, message: '请选择收款对象类型', trigger: 'blur' }],
  gName: [{ required: true, message: '请输入收款对象名称', trigger: ['blur'] }],
  qName: [{ required: true, message: '请输入收款对象名称', trigger: ['blur'] }]
}
