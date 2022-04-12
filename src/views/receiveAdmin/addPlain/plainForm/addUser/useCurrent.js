import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default ({
  formApis,
  callback
}) => {
  // ajax
  const {
    common: {
      getCompanyNameListByTYC,
      customer: { getSubAccountList }
    },
    receive: { createReceiveUser }
  } = ajaxStore
  // 获取收款对象-select-接口
  const { doResult: getCustomerList, result: customerList } = useAsync({
    init: false,
    isLoading: false,
    request: getCompanyNameListByTYC,
    preCallback: () => formApis.setConfig('qName', 'loading', true),
    errorCallBack: () => formApis.setConfig('qName', 'loading', true),
    successCallBack: ({ code, data }) => {
      code === '0' && formApis.setConfig('qName', 'options', data || [])
      formApis.setConfig('qName', 'loading', false)
    }
  })
  // 获取业务员列表
  useAsync({
    request: getSubAccountList,
    params: { fileFlag: '1', pageNo: '1', pageSize: 9999 },
    successCallBack: res => {
      const { code, data } = res ?? {}
      code === '0' && formApis.setConfig('memberIds', 'options', data?.pagedRecords ?? [])
    }
  })
  // 设置企业信息查询接口
  formApis.setConfig('qName', 'remoteMethod', name => {
    name && getCustomerList({ name })
    !name && formApis.setConfig('qName', 'options', [])
  })
  // 切换收款对象类型
  const radioChange = ({ value }) => {
    const hidden = value === 1
    formApis.setConfig('gName', 'isHidden', !hidden)
    formApis.setConfig('qName', 'isHidden', hidden)
    formApis.setConfig('socialCode', 'isHidden', hidden)
    formApis.setConfig('legalPersonName', 'isHidden', hidden)
    formApis.setConfig('memberIds', 'isHidden', hidden)
    formApis.resetHandle()
    formApis.setFormItem('customerType', value)
  }
  // 选择收款对象设置相关信息
  const selectChange = ({ key, value }) => {
    if (key === 'qName') {
      const current = customerList.value?.find(item => item.name === value) ?? {}
      formApis.setFormItem('socialCode', current?.creditCode)
      formApis.setFormItem('legalPersonName', current?.legalPersonName)
    }
  }
  // 添加接口
  const { doResult: createHandle } = useAsync({
    request: createReceiveUser,
    init: false,
    successCallBack: res => {
      const { code } = res ?? {}
      if (code === '0') {
        Message.success('添加成功')
        callback && callback()
      }
    }
  })

  return {
    radioChange,
    selectChange,
    createHandle
  }
}
