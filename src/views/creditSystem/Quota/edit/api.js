import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { ref } from '@vue/composition-api'

export default ({
  formState
}) => {
  // 存储组织信息
  const isOrg = ref(true)
  const orgOptions = ref([])
  const {
    common: { getDepartmentMemberList, getProjectList, getCustomerListOther },
    credit: { getSalesAreaAccountList, getProByCode, getCreditCustomerList, getCreditSalesAreaList, getCreditDetail, checkBusinessRules }
  } = ajaxStore
  // 获取组织名称列表-select-接口
  useAsync({
    isLoading: false,
    request: getDepartmentMemberList,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        if (data && data.length === 1) {
          formState.setFormItem('startUserDeptId', data[0].departmentId)
        }
        isOrg.value = !(data && data.length > 1)
        orgOptions.value = data || []
        formState.setConfig('startUserDeptId', 'options', data || [])
        formState.setConfig('startUserDeptId', 'isHidden', !(data && data.length > 1))
      }
    }
  })
  // 获取客户列表-select-接口
  const { doResult: getCustomerList, result: customerList } = useAsync({
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
  // 非直签使用授信---获取额度来源-select-接口
  const { doResult: getSales, result: saleSource } = useAsync({
    init: false,
    isLoading: false,
    request: getSalesAreaAccountList,
    successCallBack: ({ code, data }) => {
      code === '0' && formState.setConfig('salesAreaCode', 'options', data || [])
    }
  })
  // 直签使用授信---获取额度来源-select-接口
  const { doResult: getCreditSales } = useAsync({
    init: false,
    isLoading: false,
    request: getCreditSalesAreaList,
    successCallBack: ({ code, data }) => code === '0' && formState.setConfig('salesAreaCode', 'options', data || [])
  })
  // 获取项目-select-接口
  const { doResult: getProject, result: proSource } = useAsync({
    init: false,
    isLoading: false,
    request: getProjectList,
    successCallBack: ({ code, data }) => code === '0' && formState.setConfig('projectId', 'options', data || [])
  })
  // 合同编号-select-接口
  const { doResult: getProCode, result: codeSource } = useAsync({
    init: false,
    isLoading: false,
    request: getProByCode,
    successCallBack: ({ code, data }) => code === '0' && formState.setConfig('contractCode', 'options', data || [])
  })
  // 获取直签额度客户-select-接口
  const { doResult: getCreditCustomer } = useAsync({
    init: false,
    isLoading: false,
    request: getCreditCustomerList,
    successCallBack: ({ code, data }) => code === '0' && formState.setConfig('parentCreditSourceId', 'options', data || [])
  })
  // 重新授信-获取详情
  const { doResult: getCreDetail } = useAsync({
    init: false,
    isLoading: false,
    request: getCreditDetail
  })
  // 消息提示接口
  const { doResult: checkInfo } = useAsync({
    init: false,
    isLoading: false,
    request: checkBusinessRules
  })

  return {
    isOrg,
    orgOptions,
    getCustomerList,
    customerList,
    getSales,
    saleSource,
    getCreditSales,
    getProject,
    proSource,
    getProCode,
    codeSource,
    getCreditCustomer,
    getCreDetail,
    checkInfo
  }
}
