import { accountType, accountTypeStatus, accountOrderRule } from '@/utils/enumsSaas'

export const columns = [
  { label: '账户类型', key: 'accountTypeName', minWidth: 100 },
  { label: '账户类型编号（外部）', key: 'accountTypeExtCode', minWidth: 100 },
  { label: '账户属性', key: 'type', minWidth: 100, render: (row, value) => accountType[value] },
  { label: '状态', key: 'status', minWidth: 60, render: (row, value) => accountTypeStatus[value] },
  { label: '余额不足时下单（默认配置）', key: 'useRule', customHeader: 'useRuleTh', minWidth: 200, render: (row, value) => accountOrderRule[value] },
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 100 },
]

export const formData = {
  accountTypeName: undefined,
}

export const formConfig = [
  { type: 'input', key: 'accountTypeName', label: '账户类型', clearable: true },
]
