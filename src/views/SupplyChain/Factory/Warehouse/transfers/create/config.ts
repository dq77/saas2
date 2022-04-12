import { dataSourceTypes } from '@/types'
import * as moment from 'moment'

export const colColumns: dataSourceTypes[] = [
  { key: 'info', label: '调拨信息' },
  { key: 'product', label: '调拨产品' },
]

export const defaultActiveName: string[] = ['info', 'product']

export const formData: object = {
  fromWarehouseId: undefined,
  toWarehouseId: undefined,
  businessOutDatetime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
  reason: undefined
}

export const formConfig = [
  { type: 'select', key: 'fromWarehouseId', label: '调出仓', options: [], otherKeys: { label: 'name', value: 'id' } },
  { type: 'select', key: 'toWarehouseId', label: '调入仓', options: [], otherKeys: { label: 'name', value: 'id' } },
  { type: 'datePicker', key: 'businessOutDatetime', label: '调出时间', kind: 'datetime', valueFormat: 'yyyy-MM-dd HH:mm', format: 'yyyy-MM-dd HH:mm' },
  { type: 'input', key: 'reason', kind: 'textarea', label: '备注', maxlength: 200 }
]

export const formRules: object = {
  fromWarehouseId: [
    { required: true, message: '请选择调出仓', trigger: 'blur' },
  ],
  toWarehouseId: [
    { required: true, message: '请选择调入仓', trigger: 'blur' },
  ],
  businessOutDatetime: [
    { required: true, message: '请选择调出时间', trigger: 'blur' },
  ]
}

