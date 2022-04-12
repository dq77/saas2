import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import moment from 'moment'

export default ({
  formApis,
  props
}) => {
  // ajax
  const { receive: { getPayInfo, getReceiveList } } = ajaxStore
  // 设置款项类型
  const { doResult: getPayKinds } = useAsync({
    request: getPayInfo,
    init: false,
    params: { dictCategoryCode: 'arm_receivable_accounts', dictStatus: 1 },
    successCallBack: res => {
      const { code, data } = res ?? {}
      code === '0' && formApis.setConfig('fundType', 'options', data ?? [])
    }
  })
  // 设置付款方式
  const { doResult: getPayTypes } = useAsync({
    request: getPayInfo,
    init: false,
    params: { dictCategoryCode: 'arm_receivable_payment_type', dictStatus: 1 },
    successCallBack: res => {
      const { code, data } = res ?? {}
      code === '0' && formApis.setConfig('paymentType', 'options', data ?? [])
    }
  })
  // 获取应收方案下拉列表
  const { doResult: getReceive, result } = useAsync({
    request: getReceiveList,
    init: false,
    successCallBack: res => {
      const { code, data } = res ?? {}
      code === '0' && formApis.setConfig('receivableSolutionCode', 'options', data ?? [])
    }
  })
  // 获取 & 设置计划应收时间（导入应收方案模式）
  const setDate = (time, cycle) => {
    if (!time || (!cycle && cycle !== 0)) return
    // 时间有火狐兼容问题，使用moment
    const date = moment(time).add(cycle, 'days').format('YYYY-MM-DD')
    formApis.setFormItem('planEndDate', date)
  }
  // 单选框选择
  const radioChange = ({ key, value }) => {
    // 切换应收款添加方式
    if (key === 'createType') {
      const { formData: { receivableCalculationType } } = formApis
      formApis.setConfig('planStartTime', 'isHidden', value === 1)
      formApis.setConfig('receivableSolutionCode', 'isHidden', value === 1)
      formApis.setConfig('receivableCycle', 'isHidden', value === 1)
      formApis.setConfig('planEndDate', 'disabled', value === 2)
      formApis.setConfig('receivableCalculationType', 'disabled', value === 2)
      formApis.setConfig('receivableProportion', 'disabled', value === 2 || receivableCalculationType === 1)
      formApis.setConfig('receivableAmount', 'disabled', value === 2 || receivableCalculationType !== 1)
      formApis.setFormItem('planStartTime', undefined)
      formApis.setFormItem('receivableSolutionCode', undefined)
      formApis.setFormItem('receivableCycle', undefined)
      formApis.setFormItem('planEndDate', undefined)
      formApis.setFormItem('receivableProportion', undefined)
      formApis.setFormItem('receivableAmount', undefined)
      formApis.setFormItem('receivableCalculationType', value === 2 ? 2 : 1)
    }
    // 切换计算方式
    if (key === 'receivableCalculationType') {
      formApis.setFormItem('receivableProportion', undefined)
      formApis.setFormItem('receivableAmount', null)
    }
  }
  // selectChange
  const selectChange = ({ key, value }) => {
    // 应收方案选择
    if (key === 'receivableSolutionCode') {
      const { formData: { planStartTime } } = formApis
      const current = result.value?.find(item => item.id === value) ?? {}
      formApis.setFormItem('receivableCycle', current?.receivableCycle)
      formApis.setFormItem('receivableProportion', current?.receivableProportion)
      formApis.setFormItem('receivableSolutionName', current?.receivableSolutionName)
      inputNumberChange({ key: 'receivableProportion', value: current?.receivableProportion })
      planStartTime && setDate(planStartTime, current?.receivableCycle)
    }
  }
  // 选择应收计算起始时间时计算计划应收时间
  const datePickerChange = ({ key, value }) => {
    if (key === 'planStartTime') {
      const { formData: { receivableCycle } } = formApis
      receivableCycle && setDate(value, receivableCycle)
    }
  }
  // 计算金额比例
  const inputNumberChange = ({ value, key }) => {
    if (key === 'receivableProportion') {
      if (!value && value !== 0) return
      const { moneyInfo: { notPlanProportion, notPlanAmount, receivableAmount } } = props
      // 如果比列等于剩余比例，金额为剩余金额
      if (value === notPlanProportion) {
        formApis.setFormItem('receivableAmount', notPlanAmount)
        return
      }
      const currentAmount = (receivableAmount * (value / 100)).toFixed(2)
      formApis.setFormItem('receivableAmount', currentAmount)
    } else if (key === 'receivableAmount') {
      if (!value && value !== 0) return
      const { moneyInfo: { notPlanProportion, notPlanAmount, receivableAmount } } = props
      // 如果金额等于剩余金额，比例为剩余比例
      if (value === notPlanAmount) {
        formApis.setFormItem('receivableProportion', notPlanProportion)
        return
      }
      const currentPre = ((value / receivableAmount) * 100).toFixed(2)
      formApis.setFormItem('receivableProportion', currentPre)
    }
  }

  return {
    radioChange,
    selectChange,
    datePickerChange,
    inputNumberChange,
    getPayKinds,
    getPayTypes,
    getReceive
  }
}
