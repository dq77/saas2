const statusList = {
  0: '禁用',
  1: '启用',
}

export const columns = [
  { label: '仓库名称', key: 'name' },
  { label: '仓库编号', key: 'code' },
  { label: '状态', key: 'status', render: (row, value) => statusList[value] },
  { label: '仓库地址', key: 'address', render: (row, value) => row.province ? (row.province + row.city + row.region + row.detailAddress) : '- -'},
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 150 },
]

export const formData = {
  name: undefined,
}

export const formConfig = [
  { type: 'input', key: 'name', label: '仓库名称', clearable: true },
]
