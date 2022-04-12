import { dataSourceTypes } from '@/types'
import { statusOptions } from '../config'

interface baseInfoTypes extends dataSourceTypes {
  enums?: object
}

export const colColumns: dataSourceTypes[] = [
  { key: 'info', label: '调拨信息' },
  { key: 'product', label: '调拨产品' },
]

export const defaultActiveName: string[] = ['info', 'product']

export const baseInfoList: baseInfoTypes[] = [
  { label: '调拨单号', key: 'transfersSn' },
  { label: '创建时间', key: 'createdTime' },
  { label: '调出仓', key: 'fromWarehouseName' },
  { label: '调出时间', key: 'businessOutDatetime' },
  { label: '调入仓', key: 'toWarehouseName' },
  { label: '调入时间', key: 'businessInDatetime' },
  { label: '调出操作人', key: 'transfersOutOpName' },
  { label: '调入操作人', key: 'transfersInOpName' },
  { label: '状态', key: 'status', enums: statusOptions },
  { label: '备注', key: 'reason' },
]

export const columns = [
  { label: '图片', key: 'mainPicPath' },
  { label: '产品', key: 'goodsName' },
  { label: '产品属性', key: 'extendData' },
  { label: '产品规格', key: 'specification' },
  { label: '销售单位', key: 'unitName' },
  { label: '调拨数量', key: 'goodsQuantity' }
]
