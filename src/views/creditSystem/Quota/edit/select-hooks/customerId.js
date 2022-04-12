import useTimeout from 'hooks/useTimeout'

// 选择客户相关逻辑
export default ({
  formState
}) => {
  const { perTimeout } = useTimeout()
  // 切换客户时重置项目相关信息
  const resetPro = () => {
    formState.setFormItem('projectId', undefined)
    formState.setFormItem('projectName', undefined)
    formState.setFormItem('proAddress', undefined)
    formState.setFormItem('contractAmount', undefined)
    formState.setFormItem('projectCompany', undefined)
    formState.setConfig('projectId', 'options', [])
    perTimeout(() => formState.clearValidate('projectId'))
  }
  // 切换客户时重置合同相关信息
  const resetCode = () => {
    formState.setFormItem('contractCode', undefined)
    formState.setFormItem('contractName', undefined)
    formState.setFormItem('signingDate', undefined)
    formState.setFormItem('amount', undefined)
    formState.setConfig('contractCode', 'options', [])
    perTimeout(() => formState.clearValidate('contractCode'))
  }
  // 选择客户-存储customerName
  const checkCustom = ({
    value,
    id,
    customerList,
    getProject
  }) => {
    // 切换客户时且非初始化时重置项目相关信息
    !id && resetPro()
    // 切换客户时且非初始化时重置合同相关信息
    !id && resetCode()
    if (!customerList) return
    // 存储customerName
    const { customerName } = customerList.find(item => item.id === value) ?? {}
    formState.setFormItem('customerName', customerName || '')
    // 调用客户接口获取下拉接口数据
    getProject({ customerId: value })
  }

  return {
    checkCustom
  }
}
