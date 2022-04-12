import useTableEdit from '@/hooks/credit/useTableEdit'
import { Message } from 'element-ui'
import { dataSample } from './config'

export default ({
  tableApis,
  apiApis
}) => {
  // useTableEdit
  const {
    status,
    editHandle,
    cancleHandle,
    addHandle
  } = useTableEdit({ tableApis, dataSample })
  // success
  const successHandle = (row) => {
    status.value = null
    row.customType = null
    apiApis.getDataSource()
    Message.success('保存成功')
  }
  // 默认策略修改周期、还款比例
  const changeDefault = async (periodDays, downPaymentRatio) => {
    try {
      // 默认策略 - 还款周期
      const dayResult = await apiApis.updateDefaultProPolicy({ configValue: periodDays })
      // 默认策略 - 首付款比例
      const preResult = await apiApis.updateDefaultPre({ configKey: 'DEFAULT_DOWN_PAYMENT_RATIO', configValue: downPaymentRatio })
      return {
        dayResult,
        preResult
      }
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }
  // 保存
  const sureHandle = row => {
    const { dataSource } = tableApis
    // 校验
    if (!row.productName) return Message.warning('请输入策略')
    if (dataSource?.filter(item => item?.productName === row.productName)?.length > 1) return Message.warning('已存在相同策略名称')
    if (!row.periodDays && row.periodDays !== 0) return Message.warning('请输入还款周期')
    if (!row.downPaymentRatio && row.downPaymentRatio !== 0) return Message.warning('请输入首付款比例')
    const { productName, periodDays, downPaymentRatio, id } = row ?? {}
    // loading
    row.loading = true
    // 新增
    !id && apiApis.createProPolicy({ productName, periodDays, downPaymentRatio }).then(({ code }) => {
      row.loading = false
      code === '0' && successHandle(row)
    })
    // 编辑
    id && !row?.type && apiApis.updateProPolicy({ productName, periodDays, downPaymentRatio, id }).then(({ code }) => {
      row.loading = false
      code === '0' && successHandle(row)
    })
    // 默认策略编辑
    id && row?.type && changeDefault(periodDays, downPaymentRatio).then(({ dayResult, preResult }) => {
      row.loading = false
      dayResult?.code === '0' && preResult?.code === '0' && successHandle(row)
    })
  }

  return {
    status,
    addHandle,
    sureHandle,
    editHandle,
    cancleHandle
  }
}
