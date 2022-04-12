import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default ({
  formApis
}) => {
  // ajax
  const { receive: { getCustomerList: getCustomerListOther } } = ajaxStore
  // 获取收款对象
  const { doResult: getCustomerList, result: customerList } = useAsync({
    init: false,
    isLoading: false,
    request: getCustomerListOther,
    preCallback: () => formApis.setConfig('customerId', 'loading', true),
    errorCallBack: () => formApis.setConfig('customerId', 'loading', true),
    successCallBack: ({ code, data }) => {
      code === '0' && formApis.setConfig('customerId', 'options', data || [])
      formApis.setConfig('customerId', 'loading', false)
    }
  })
  // 设置远程查询
  formApis.setConfig('customerId', 'remoteMethod', query => getCustomerList({ customerName: query }))
  // 选择收款对象存储相关数据
  const selectChange = ({ key, value }) => {
    if (key === 'customerId') {
      const { customerName, customerType } = customerList.value?.find(item => item.id === value) ?? {}
      console.log('customerType----', customerType)
      formApis.setFormItem('customerName', customerName)
      formApis.setFormItem('customerType', customerType)
    }
  }

  return {
    getCustomerList,
    customerList,
    selectChange
  }
}
