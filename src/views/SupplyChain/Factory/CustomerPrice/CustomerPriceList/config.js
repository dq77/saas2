export const columns = [
  { label: '客户名称', key: 'customerName', minWidth: 140 },
  { label: '外部客户编号', key: 'extCustomCode', minWidth: 100 },
  { label: '客户产品数量', key: 'userProductAmount', sortable: 'custom', width: 120, align: 'right' },
  { label: '操作', key: 'operate' },
]

export const cFormData = {
  customerName: undefined,
}

export const cFormConfig = [
  { type: 'input', key: 'customerName', label: '客户名称' }
]
