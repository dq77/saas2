import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { getDaterange } from '@/utils/qjd'

export default ({
  formApis,
  tableApis
}) => {
  // ajax
  const { factory: { wmwarehouseinfoList } } = ajaxStore
  // 仓库 - 接口
  useAsync({
    request: wmwarehouseinfoList,
    successCallBack: res => {
      formApis.setConfig('fromWarehouseId', 'options', res?.data ?? [])
      formApis.setConfig('toWarehouseId', 'options', res?.data ?? [])
    }
  })
  // 新建调拨
  const createHandle = () => router.push({ name: 'transfersCreate' })
  // 添加时分秒
  const getTime = (data, type = 'start') => {
    return data ? type === 'start' ? `${data} 00:00:00` : `${data} 23:59:59` : undefined
  }
  // 查询
  const searchFormHandle = (): void => {
    const { formData: { createTime, outTime, inTime, ...others } } = formApis
    const { end: queryEndDate, start: queryStartDate } = getDaterange(createTime)
    const { end: businessOutEndDate, start: businessOutStartDate } = getDaterange(outTime)
    const { end: businessInEndDate, start: businessInStartDate } = getDaterange(inTime)
    tableApis.searchHandle({
      ...others,
      queryEndDate: getTime(queryEndDate, 'end'),
      queryStartDate: getTime(queryStartDate),
      businessOutEndDate: getTime(businessOutEndDate, 'end'),
      businessOutStartDate: getTime(businessOutStartDate),
      businessInEndDate: getTime(businessInEndDate, 'end'),
      businessInStartDate: getTime(businessInStartDate)
    })
  }
  // 重置
  const resetFormHandle = (): void => {
    formApis.resetHandle()
    tableApis.resetHandle()
  }

  return {
    createHandle,
    searchFormHandle,
    resetFormHandle
  }
}
