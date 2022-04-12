// 选择合同编号相关逻辑
export default ({
  formState
}) => {
  const checkCode = (value, codeSource = []) => {
    if (!codeSource) return
    const { contractName, signingDate, contractAmount } = codeSource.find(item => item.contractCode === value) || {}
    // 设置合同编号相关信息
    formState.setFormItem('contractName', contractName)
    formState.setFormItem('signingDate', signingDate)
    formState.setFormItem('amount', contractAmount)
  }

  return {
    checkCode
  }
}
