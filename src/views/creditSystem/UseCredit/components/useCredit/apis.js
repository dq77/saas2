import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default ({
  formState,
  checkLevel
}) => {
  const {
    common: { getProjectList, getCustomerListOther },
    credit: { getBusinessList, getCreditSalesAreaList, getRuleConfigsByCustomerId }
  } = ajaxStore

  // 获取客户列表-select-接口
  const { doResult: getCustomerList } = useAsync({
    init: false,
    isLoading: false,
    request: getCustomerListOther,
    preCallback: () => formState.setConfig('customerId', 'loading', true),
    errorCallBack: () => formState.setConfig('customerId', 'loading', true),
    successCallBack: ({ code, data }) => {
      code === '0' && formState.setConfig('customerId', 'options', data || [])
      formState.setConfig('customerId', 'loading', false)
    }
  })
  // 设置客户远程查询接口
  formState.setConfig('customerId', 'remoteMethod', query => getCustomerList({ customerName: query }))
  // 获取项目-select-接口
  const { doResult: getProject } = useAsync({
    init: false,
    isLoading: false,
    request: getProjectList,
    successCallBack: ({ code, data }) => {
      code === '0' && formState.setConfig('projectId', 'options', data || [])
    }
  })
  // 获取业务类型
  useAsync({
    request: getBusinessList,
    successCallBack: ({ code, data }) => {
      const arr = []
      if (code === '0') {
        data.forEach(item => arr.push({ value: item?.businessTypeCode, label: `${item?.businessTypeName}-还款周期${item?.periodDays}天，首付款比例${item?.downPaymentRatio}%`, periodDays: item?.periodDays }))
        formState.setConfig('businessType', 'options', arr || [])
      }
    }
  })
  // 额度来源
  const { doResult: getCreditSale } = useAsync({
    init: false,
    isLoading: false,
    request: getCreditSalesAreaList,
    successCallBack: ({ code, data }) => code === '0' && formState.setConfig('organizationCode', 'options', data || [])
  })
  // 等级策略
  const { doResult: getRuleConfigs } = useAsync({
    init: false,
    isLoading: false,
    request: getRuleConfigsByCustomerId,
    successCallBack: ({ code, data }) => {
      const arr = []
      if (code === '0') {
        if (!data || !data.length) {
          checkLevel(false)
          formState.setConfig('ruleConfigId', 'isHidden', true)
          formState.setConfig('ruleConfigId', 'options', [])
        } else {
          checkLevel(true)
          formState.setConfig('ruleConfigId', 'isHidden', false)
          data.forEach(item => arr.push({ value: item?.id, label: `${item?.productName}-还款周期${item?.periodDays}天，首付款比例${item?.downPaymentRatio}%`, periodDays: item?.periodDays }))
          formState.setConfig('ruleConfigId', 'options', arr || [])
        }
      }
    }
  })

  return {
    getCreditSale,
    getRuleConfigs,
    getProject
  }
}
