export const columns = [
  { label: '项目名称', key: 'name', minWidth: 140 },
  { label: '项目编号', key: 'projectSn', minWidth: 100 },
  { label: '外部项目编号', key: 'extId', minWidth: 100 },
  { label: '项目产品数量', key: 'projectProductAmount', sortable: 'custom', width: 120, align: 'right' },
  { label: '操作', key: 'operate' },
]

export const cFormData = {
  projectName: undefined,
}

export const cFormConfig = [
  { type: 'input', key: 'name', label: '项目名称' }
]
