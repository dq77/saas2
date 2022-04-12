import { dataSourceTypes } from '@/types'
import { statusOptions } from '../config'
import { percent2 } from '@/utils/qjd'
interface baseInfoTypes extends dataSourceTypes {
  enums?: object
}

export const colColumns: dataSourceTypes[] = [
  { key: 'info', label: '盘点信息' },
  { key: 'product', label: '盘点产品' },
]

export const defaultActiveName: string[] = ['info', 'product']

export const baseInfoList: baseInfoTypes[] = [
  { label: '库存盘点单单号', key: 'stockCheckSn' },
  { label: '仓库', key: 'warehouseName' },
  { label: '盘点时间', key: 'createdTime' },
  { label: '状态', key: 'status', enums: statusOptions },
  { label: '操作人', key: 'createdName' },
  { label: '备注', key: 'reason' },
]

export const columns = [
  { label: '图片', key: 'mainPicPath' },
  { label: '产品', key: 'goodsName' },
  { label: '产品属性', key: 'extendData' },
  { label: '产品规格', key: 'specification' },
  { label: '销售单位', key: 'unitName' },
  { label: '库存数量', key: 'stockQuantity', render: (data, item) => percent2(item) },
  { label: '盘点数量', key: 'realQuantity', render: (data, item) => percent2(item) },
  { label: '盘盈盘亏', key: 'total' },
]
