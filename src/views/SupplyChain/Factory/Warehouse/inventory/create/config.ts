import { dataSourceTypes } from '@/types'

export const colColumns: dataSourceTypes[] = [
  { key: 'info', label: '盘点信息' },
  { key: 'product', label: '盘点产品' },
]

export const defaultActiveName: string[] = ['info', 'product']

export const formData: object = {
  warehouseName: undefined,
  reason: undefined
}

export const formConfig = [
  { type: 'input', key: 'warehouseName', label: '仓库', disabled: true },
  { type: 'input', key: 'reason', kind: 'textarea', label: '备注', maxlength: 200 }
]

