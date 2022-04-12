import { productSignStatus } from '@/utils/enumsSaas'

export const columns = [
  { label: '产品标签名称', key: 'labelName', minWidth: 100 },
  { label: '标签编号（外部）', key: 'labelExtCode', minWidth: 100 },
  { label: '状态', key: 'status', minWidth: 100, render: (row, value) => productSignStatus[value] },
  { label: '优先扣款账户', key: 'accountTypeName', customHeader: 'accountTypeNameTh', minWidth: 100 },
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 150 },
]

export const formData = {
  labelName: undefined,
}

export const formConfig = [
  { type: 'input', key: 'labelName', label: '产品标签名称', clearable: true },
]
