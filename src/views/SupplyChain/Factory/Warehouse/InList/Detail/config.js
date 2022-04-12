
import { whInStatus, whStorageType, whOutboundType } from '@/utils/enumsSaas'

export const baseInfoList = [
  { label: '入库单号', key: 'storageSn' },
  { label: '仓库', key: 'warehouseName' },
  { label: '入库类型', key: 'storageType', enums: whStorageType },
  { label: '入库时间', key: 'businessDatetime' },
  { label: '创建时间', key: 'createdTime' },
  { label: '状态', key: 'status', enums: whInStatus },
  { label: '操作人', key: 'createdName' },
  { label: '备注', key: 'reason' },
]

export const outBaseInfoList = [
  { label: '出库单号', key: 'outboundSn' },
  { label: '仓库', key: 'warehouseName' },
  { label: '出库类型', key: 'outboundType', enums: whOutboundType },
  { label: '出库时间', key: 'businessDatetime' },
  { label: '创建时间', key: 'createdTime' },
  { label: '状态', key: 'status', enums: whInStatus },
  { label: '操作人', key: 'createdName' },
  { label: '备注', key: 'reason' },
]

// businessName 业务类型，入库/出库
export const getColumns = ({ businessName }) => [
  { label: '图片', key: 'mainPicPath', minWidth: 80 },
  { label: '产品名称', key: 'goodsName', minWidth: 100 },
  { label: '产品型号', key: 'productSn', minWidth: 80 },
  { label: '产品规格', key: 'specification', minWidth: 80 },
  { label: '销售单位', key: 'unitName', minWidth: 60 },
  { label: '产品属性', key: 'extendData', minWidth: 100 },
  { label: `${businessName}数量`, key: 'goodsQuantity', minWidth: 60 },
]

