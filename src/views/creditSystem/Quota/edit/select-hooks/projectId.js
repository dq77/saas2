import useTimeout from 'hooks/useTimeout'

// 选择项目相关逻辑
export default ({
  formState,
  getProCode
}) => {
  // timeout
  const { perTimeout } = useTimeout()
  // 重置合同相关信息
  const resetContract = id => {
    if (id) return
    formState.setFormItem('contractCode', undefined)
    formState.setFormItem('contractName', undefined)
    formState.setFormItem('amount', undefined)
    formState.setFormItem('signingDate', undefined)
    perTimeout(() => formState.clearValidate('contractCode'))
  }
  // 选择项目逻辑
  const checkPro = ({
    value,
    proSource = [],
    customerList = [],
    id
  }) => {
    if (!proSource) return
    const current = proSource.find(item => item.id === value) || {}
    // 存储projectName
    formState.setFormItem('projectName', current.name || '')
    const address = current ? `${current.province}/${current.city}/${current.region}/${current.detailAddress}` : ''
    // 设置合同相关信息
    formState.setFormItem('proAddress', address)
    formState.setFormItem('contractAmount', current ? current.contractAmount : '')
    formState.setFormItem('projectCompany', current ? current.projectCompany : '')
    const currentCustom = customerList.find(item => item.id === formState.formData.customerId) ?? {}
    // 查询合同编号
    getProCode({ customId: currentCustom.id || '', projectId: current.id || '' })
    // 重置合同相关信息
    resetContract(id)
  }

  return {
    checkPro
  }
}
