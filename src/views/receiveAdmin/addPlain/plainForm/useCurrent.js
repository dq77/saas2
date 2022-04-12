import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { getFiles, getContract, getproject } from './utils'
import { Message } from 'element-ui'
import router from '@/router'
import useDetail from './useDetail'
import useArea from '@/hooks/common/useArea'

export default ({
  formApis,
  id,
  customApis,
  setFileList
}) => {
  // useArea
  const { doResult: getArea, flatCitys } = useArea()
  // ajax
  const {
    receive: { createPlain, updatePlain, getPlainDetail, getCustomerList },
    common: { getCompanyNameListByTYC }
  } = ajaxStore
  // detail
  const { setBasic, setProject, setContract, setFiles } = useDetail(formApis, customApis, setFileList)
  // 获取收款对象-select-接口
  const { doResult: getListByTYC } = useAsync({
    init: false,
    isLoading: false,
    request: getCompanyNameListByTYC,
    preCallback: () => formApis.setConfig('projectCompany', 'loading', true),
    errorCallBack: () => formApis.setConfig('projectCompany', 'loading', true),
    successCallBack: ({ code, data }) => {
      code === '0' && formApis.setConfig('projectCompany', 'options', data || [])
      formApis.setConfig('projectCompany', 'loading', false)
    }
  })
  formApis.setConfig('projectCompany', 'remoteMethod', name => getListByTYC({ name }))
  // 获取经销商
  const { doResult: getCustomer } = useAsync({
    init: false,
    isLoading: false,
    request: getCustomerList,
    preCallback: () => formApis.setConfig('jsxName', 'loading', true),
    errorCallBack: () => formApis.setConfig('jsxName', 'loading', true),
    successCallBack: ({ code, data }) => {
      code === '0' && formApis.setConfig('jsxName', 'options', data || [])
      formApis.setConfig('jsxName', 'loading', false)
    }
  })
  formApis.setConfig('jsxName', 'remoteMethod', customerName => getCustomer({ customerName }))
  // 获取详情接口
  const { doResult: getDetail } = useAsync({
    request: getPlainDetail,
    init: false,
    successCallBack: res => {
      const { data, code } = res ?? {}
      if (code === '0') {
        setBasic(data ?? {})
        setProject(data?.projectDetail ?? {})
        setContract(data?.contractRelDetail ?? {})
        setFiles(data?.saArmBusinessFileListMaps ?? {})
      }
    }
  })
  // id存在，调用详情接口
  id && getDetail({ saArmReceivablePlanId: id })
  // 设置省市区数据
  // formApis.setConfig('address', 'options', citys ?? [])
  getArea().then(res => {
    const { code, data } = res ?? {}
    code === '0' && formApis.setConfig('address', 'options', data ?? [])
  })
  // 新增计划
  const { doResult: createHandle, loading: addLoading } = useAsync({
    request: createPlain,
    init: false,
    successCallBack: res => {
      if (res?.code === '0') {
        Message.success('保存成功')
        router.push({ name: 'AddPlain', query: { id: res?.data?.id } })
      }
    }
  })
  // 修改计划
  const { doResult: updateHandle, loading: editLoading } = useAsync({
    request: updatePlain,
    init: false,
    successCallBack: res => {
      if (res?.code === '0') {
        Message.success('修改成功')
        router.push({ name: 'AddPlain', query: { id } })
      }
    }
  })
  // 确定
  const sureHandle = () => {
    const { formData, submitHandle } = formApis
    submitHandle(() => {
      const params = {
        customerId: formData.customerId,
        customerName: formData.customerName,
        customerType: formData.customerType,
        extPlanCode: formData.extPlanCode,
        receivableAmount: formData.receivableAmount,
        receivableEndDate: formData.receivableEndDate,
        receivablePlanName: formData.receivablePlanName,
        receivableType: formData.receivableType,
        // 文件信息
        saArmBusinessFileDTO: getFiles(formData),
        // 合同信息
        saArmReceivableContractRelDTO: getContract(formData),
        // 项目信息
        saArmReceivableProjectRelDTO: getproject(formData, flatCitys.value)
      }
      // 新增
      !id && createHandle(params)
      // 修改
      id && updateHandle({ id, ...params })
    })
  }

  return {
    sureHandle,
    addLoading,
    editLoading,
    getListByTYC,
    getCustomer
  }
}
