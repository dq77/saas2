// 项目相关逻辑
export default ({
  formApis
}) => {
  // 选择项目时赋值项目其他信息
  const setOtherPro = data => {
    formApis.setFormItem('hasName', data?.name)
    formApis.setFormItem('projectSn', data?.projectSn)
    formApis.setFormItem('address', data ? [data?.provinceCode, data?.cityCode, data?.regionCode] : [])
    formApis.setFormItem('detailAddress', data?.detailAddress)
    formApis.setFormItem('projectCompany', data?.projectCompany)
    formApis.setFormItem('jsxName', data?.customerName)
    formApis.setFormItem('remark', data?.remark)
  }

  return {
    setOtherPro
  }
}
