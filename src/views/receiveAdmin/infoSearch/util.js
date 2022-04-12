import { receiveTypes } from '@/consts/receive'
import { overdueStatusOptions } from './config'

export const getFileRequest = (data, statusOptions) => {
  const status = statusOptions?.find(item => item.statusCode === data?.status)?.statusName ?? ''

  return `${data?.receivablePlanName ? `应收名称：${data?.receivablePlanName};` : ''}${data?.customerName ? `收款对象：${data?.customerName};` : ''}${data?.extPlanCode ? `内部编号：${data?.extPlanCode};` : ''}${data?.receivablePlanCode ? `应收编号：${data?.receivablePlanCode};` : ''}${data?.receivableType ? `应收类型：${receiveTypes?.[data?.receivableType]};` : ''}${data?.overdueStatus ? `是否到期：${overdueStatusOptions?.[data?.overdueStatus]};` : ''}${status ? `应收总状态：${status};` : ''}`
}
