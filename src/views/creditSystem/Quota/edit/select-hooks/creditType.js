// 切换授信类型相关逻辑
import { cFormConfig, types } from '../config'

export default ({
  formState,
  id,
  getCustomerList,
  getCreditCustomer,
  getSales,
  clearFiles
}) => {
  const checkType = (value, isOrg, orgOptions = []) => {
    const configs = types[value]
    // 更新fomConfig
    formState.setConfigs([...cFormConfig, ...configs])
    // 设置组织信息
    formState.setConfig('startUserDeptId', 'isHidden', isOrg)
    formState.setConfig('startUserDeptId', 'options', orgOptions)
    // 设置客户远程查询接口
    formState.setConfig('customerId', 'remoteMethod', query => getCustomerList({ customerName: query }))
    // 若为直签使用授信则显示直签额度客户/否则不显示
    formState.setConfig('parentCreditSourceId', 'isHidden', value !== 'direct_sign_use_credit')
    formState.setConfig('customerId', 'label', value === 'direct_sign_use_credit' ? '使用额度客户' : '选择客户')
    formState.setConfig('projectCompany', 'isHidden', value === 'direct_sign_use_credit')
    formState.setConfig('salesAreaAmount', 'isHidden', value === 'direct_sign_use_credit')
    // 非项目授信和直签使用授信文件非必填
    // formState.setFormRuleAttr('fileList', 0, 'required', value === 'direct_sign_use_credit' || value === 'project_credit')
    // 获取直签额度客户数据
    value === 'direct_sign_use_credit' && getCreditCustomer()
    // 非直签使用授信获取额度来源
    value !== 'direct_sign_use_credit' && getSales()
    // 重置数据
    formState.resetHandle()
    // 修改时会改变源数据调用resetFormData重置数据
    id && formState.resetFormData()
    formState.setFormItem('fileList', null)
    clearFiles()
    // 赋值授信类型
    formState.setFormItem('creditType', value)
  }

  return {
    checkType
  }
}
