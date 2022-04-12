import { accountType, accountTypeStatus, accountOrderRule } from '@/utils/enumsSaas'
import { toAmountStr } from '@/utils/util'

export const companyListData = [
  {
    label: '可用余额(元)',
    content: '--',
    svgId: 'iconzongshu',
  },
  {
    label: '冻结中金额(元)',
    content: '--',
    svgId: 'iconlishi',
  },
  {
    label: '账户总余额(元)',
    content: '--',
    svgId: 'iconqueren',
  },
]

export const columns = [
  { label: '账户类型', key: 'accountTypeName', minWidth: 100 },
  { label: '账户属性', key: 'accountType', minWidth: 100, render: (row, value) => accountType[value] },
  { label: '可用金额(元)', key: 'amountAvailable', minWidth: 100, align: 'right', render: (row, value) => toAmountStr(value, 2, true) },
  { label: '冻结中金额(元)', key: 'amountInFreeze', minWidth: 100, align: 'right', render: (row, value) => toAmountStr(value, 2, true) },
  { label: '总余额(元)', key: 'amountBalance', minWidth: 100, align: 'right', render: (row, value) => toAmountStr(value, 2, true) },
  { label: '账户状态', key: 'status', minWidth: 100, render: (row, value) => accountTypeStatus[value] },
  { label: '余额不足时下单', key: 'useRule', minWidth: 100, render: (row, value) => accountOrderRule[value] },
  { label: '操作', key: 'operate', minWidth: 100 },
]

export const formData = {
  accountTypeName: undefined,
  // status: undefined,
}

// const statusOptions = Object.keys(accountTypeStatus).map(key => ({value: key, label: accountTypeStatus[key]}))

export const getFormConfig = ({
  getAaccountTypeCodeList
}) => [
  {
    type: 'select',
    key: 'accountTypeCode',
    label: '账户类型',
    clearable: true,
    filterable: true,
    remote: true,
    remoteMethod: getAaccountTypeCodeList,
    options: []
  },
  // { type: 'select', key: 'status', label: '账户状态', clearable: true, options: statusOptions },
]
