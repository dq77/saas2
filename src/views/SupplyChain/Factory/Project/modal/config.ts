// 新建催收记录-form
export const formData = {
  memberId: [],
  name: null
}
export const formConfig = [
  { type: 'text', key: 'name', label: '项目名称' },
  { type: 'select', key: 'memberId', label: '跟进人', options: [], otherKeys: { label: 'memberName', value: 'id' }, multiple: true },
]
