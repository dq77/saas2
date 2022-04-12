import useTimeout from 'hooks/useTimeout'
// 选择直签额度客户时查询额度来源
export default ({
  formState,
  getCreditSales
}) => {
  const { perTimeout } = useTimeout()

  const checkParCredit = value => {
    // 重置额度来源
    formState.setFormItem('salesAreaCode', undefined)
    perTimeout(() => formState.clearValidate('salesAreaCode'))
    getCreditSales({ creditSourceId: value, creditType: 'direct_sign_credit' })
  }

  return {
    checkParCredit
  }
}
