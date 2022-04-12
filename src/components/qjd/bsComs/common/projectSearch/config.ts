// 新建催收记录-form
export const formData = {
  name: null,
  projectSn: null,
  customerName: null,
  status: null
}
export const formConfig = [
  { type: 'input', key: 'name', label: '项目名称' },
  { type: 'input', key: 'projectSn', label: '项目编号' },
  { type: 'input', key: 'customerName', label: '客户名称' },
  { type: 'select', key: 'status', label: '状态', options: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }] },
]
export const columns = [
  { label: '选择', key: 'radio', width: 50 },
  { label: '项目编号', key: 'projectSn' },
  { label: '项目名称', key: 'name' },
  { label: '外部编号', key: 'extId' },
  { label: '客户名称', key: 'customerName' },
  { label: '状态', key: 'status', render: (data, item) => item === 1 ? '启用' : '禁用' },
]

