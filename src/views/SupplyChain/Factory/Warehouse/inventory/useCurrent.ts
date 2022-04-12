import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { getDaterange } from '@/utils/qjd'

export default ({
  formApis,
  tableApis,
  modalApis
}) => {
  // ajax
  const { factory: { wmwarehouseinfoList } } = ajaxStore
  // 仓库 - 接口
  const { result } = useAsync({
    request: wmwarehouseinfoList,
    successCallBack: res => formApis.setConfig('warehouseId', 'options', res?.data ?? [])
  })
  // 新建调拨
  const createHandle = () => modalApis.openHandle()
  // 添加时分秒
  const getTime = (data, type = 'start') => {
    return data ? type === 'start' ? `${data} 00:00:00` : `${data} 23:59:59` : undefined
  }
  // 查询
  const searchFormHandle = (): void => {
    const { formData: { createTime, ...others } } = formApis
    const { end: queryEndDate, start: queryStartDate } = getDaterange(createTime)
    tableApis.searchHandle({
      ...others,
      queryEndDate: getTime(queryEndDate, 'end'),
      queryStartDate: getTime(queryStartDate),
    })
  }
  // 重置
  const resetFormHandle = (): void => {
    formApis.resetHandle()
    tableApis.resetHandle()
  }

  return {
    result,
    createHandle,
    searchFormHandle,
    resetFormHandle
  }
}
