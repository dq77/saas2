// 选择额度来源相关逻辑
export default ({
  formState
}) => {
  // 选择额度来源
  const checkSales = (value, saleSource = []) => {
    // 直签使用授信无需设置销区年度总额
    if (formState.formData.creditType === 'direct_sign_use_credit') return
    if (!saleSource) return
    const { salesAreaAmount } = saleSource.find(item => item.salesAreaCode === value) || {}
    formState.setFormItem('salesAreaAmount', salesAreaAmount)
  }

  return {
    checkSales
  }
}
