import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import store from '@/store'

export default function ({
  formState,
}) {
  const fs = formState

  // 业务规则：业务类型 businessTypeCode，产品策略 ruleConfig，赊销相关文件 creditFileList
  const { doResult: getCreditRules } = useAsync({
    request: ajaxStore.factory.getCreditRules,
    init: false
  })

  // 创建页使用缓存状态
  const inCache = async (newFormData) => {
    const orderSalesType = store?.state?.userInfo?.tenants[0].orderSalesType
    const nfd = newFormData
    fs.loopFormData((formData, key) => {
      formData[key] = newFormData[key]
    })
    if (orderSalesType === 1 || orderSalesType === 2) { // 工程-1  零售-2
      fs.setConfig('purchaseType', 'isHidden', true)
    } else { // 工程与零售-3
      fs.setConfig('purchaseType', 'isHidden', false)
    }
    fs.setConfig('customerId', 'options', [{
      label: newFormData.customerId.customerName,
      value: newFormData.customerId
    }])
    if (nfd.purchaseType === '1') {
      fs.setConfig('projectId', 'options', [{
        label: newFormData.projectId.projectName,
        value: newFormData.projectId
      }])
      fs.setConfig('projectId', 'isHidden', false)
    } else {
      fs.setConfig('projectId', 'isHidden', true)
      fs.setConfig('addressCode', 'disabled', false)
      fs.setConfig('address', 'disabled', false)
    }
    fs.setConfig('projectId', 'disabled', false)
    fs.setConfig('paymentMethod', 'disabled', false)
    fs.setConfig('invoiceCompany', 'disabled', false)
    // 付款条件为仟金顶支付
    fs.setConfig('invoiceCompany', 'disabled', nfd.paymentMethod.dictCode === 'qjdAllPay')
    // 付款条件为赊销支付
    if (nfd.paymentMethod.dictCode === 'creditPay' && nfd.paymentMethod.payCategory === '1') {
      fs.setConfig('creditAmount', 'isHidden', false)
      fs.setFormItem('businessTypeConfigEnabled', nfd.businessTypeConfigEnabled)
      fs.setFormItem('customerLevelConfigEnabled', nfd.customerLevelConfigEnabled)
      fs.setFormItem('approvalMaterialsEnabled', nfd.approvalMaterialsEnabled)
      fs.setConfig('businessTypeCode', 'isHidden', !nfd.businessTypeConfigEnabled)
      fs.setConfig('ruleConfig', 'isHidden', !nfd.customerLevelConfigEnabled)
      fs.setConfig('creditFileList', 'isHidden', !nfd.approvalMaterialsEnabled)
      const res = await getCreditRules({ customerId: nfd.customerId.customerId })
      initCreditRules(res?.data ?? {})
      fs.setFormItem('creditFileList', nfd.creditFileList)
    } else {
      fs.setConfig('creditAmount', 'isHidden', true)
      fs.setConfig('businessTypeCode', 'isHidden', true)
      fs.setConfig('ruleConfig', 'isHidden', true)
      fs.setConfig('creditFileList', 'isHidden', true)
    }
    // 运费支付方式为厂家有条件承担时，显示输入框
    fs.setConfig('freightPayDescription', 'isHidden', nfd.freightPayId.dictCode !== 'manufacturerConditionalPay')
  }

  // 编辑页状态
  const inEdit = async (newFormData) => {
    const orderSalesType = store?.state?.userInfo?.tenants[0].orderSalesType
    const nfd = newFormData
    fs.loopFormData((formData, key) => {
      formData[key] = newFormData[key]
    })
    if (orderSalesType === 1 || orderSalesType === 2) { // 工程-1  零售-2
      fs.setConfig('purchaseType', 'isHidden', true)
    } else { // 工程与零售-3
      fs.setConfig('purchaseType', 'isHidden', false)
    }
    fs.setConfig('customerId', 'options', [{
      label: newFormData.customerId.customerName,
      value: newFormData.customerId
    }])
    if (nfd.purchaseType === '1') {
      fs.setConfig('projectId', 'options', [{
        label: newFormData.projectId.projectName,
        value: newFormData.projectId
      }])
      fs.setConfig('projectId', 'isHidden', false)
    } else {
      fs.setConfig('projectId', 'isHidden', true)
      fs.setConfig('addressCode', 'disabled', false)
      fs.setConfig('address', 'disabled', false)
    }

    fs.setConfig('purchaseType', 'disabled', true)
    fs.setConfig('customerId', 'disabled', true)
    fs.setConfig('projectId', 'disabled', true)
    fs.setConfig('paymentMethod', 'disabled', true)
    fs.setConfig('invoiceCompany', 'disabled', false)
    // 付款条件为仟金顶支付
    fs.setConfig('invoiceCompany', 'disabled', nfd.paymentMethod.dictCode === 'qjdAllPay')
    // 付款条件为赊销支付
    if (nfd.paymentMethod.dictCode === 'creditPay' && nfd.paymentMethod.payCategory === '1') {
      fs.setConfig('creditAmount', 'isHidden', false)
      fs.setFormItem('businessTypeConfigEnabled', nfd.businessTypeConfigEnabled)
      fs.setFormItem('customerLevelConfigEnabled', nfd.customerLevelConfigEnabled)
      fs.setFormItem('approvalMaterialsEnabled', nfd.approvalMaterialsEnabled)
      fs.setConfig('businessTypeCode', 'isHidden', !nfd.businessTypeConfigEnabled)
      fs.setConfig('ruleConfig', 'isHidden', !nfd.customerLevelConfigEnabled)
      fs.setConfig('creditFileList', 'isHidden', !nfd.approvalMaterialsEnabled)
      const res = await getCreditRules({ customerId: nfd.customerId.customerId })
      initCreditRules(res?.data ?? {})
      fs.setFormItem('creditFileList', nfd.creditFileList)
    } else {
      fs.setConfig('creditAmount', 'isHidden', true)
      fs.setConfig('businessTypeCode', 'isHidden', true)
      fs.setConfig('ruleConfig', 'isHidden', true)
      fs.setConfig('creditFileList', 'isHidden', true)
    }
    // 运费支付方式为厂家有条件承担时，显示输入框
    fs.setConfig('freightPayDescription', 'isHidden', nfd.freightPayId.dictCode !== 'manufacturerConditionalPay')
  }

  // 根据配置信息，设置赊销相关字段的显隐与下拉项
  const initCreditRules = (config) => {
    const {
      businessTypeConfigList,
      approvalMaterialsList,
      ruleConfigList,
      businessTypeConfigEnabled,
      approvalMaterialsEnabled,
      customerLevelConfigEnabled,
    } = config
    fs.setFormItem('businessTypeConfigEnabled', businessTypeConfigEnabled)
    fs.setFormItem('customerLevelConfigEnabled', customerLevelConfigEnabled)
    fs.setFormItem('approvalMaterialsEnabled', approvalMaterialsEnabled)
    fs.setConfig('businessTypeCode', 'isHidden', !businessTypeConfigEnabled)
    fs.setConfig('ruleConfig', 'isHidden', !customerLevelConfigEnabled)
    fs.setConfig('creditFileList', 'isHidden', !approvalMaterialsEnabled)
    // 业务类型
    if (businessTypeConfigEnabled) {
      const businessTypeOptions = businessTypeConfigList.map(item => {
        return {
          label: item.businessTypeName,
          value: {
            label: item.businessTypeName,
            code: item.businessTypeCode
          }
        }
      })
      fs.setConfig('businessTypeCode', 'options', businessTypeOptions)
    }

    // 产品策略
    if (customerLevelConfigEnabled) {
      const ruleConfigOptions = ruleConfigList.map(item => {
        return {
          label: item.productName,
          value: {
            id: item.id,
            label: item.productName
          }
        }
      })
      fs.setConfig('ruleConfig', 'options', ruleConfigOptions)
    }

    // 赊销相关文件
    if (approvalMaterialsEnabled) {
      const creditFileListConfig = approvalMaterialsList.map(item => {
        return {
          id: item.id,
          label: item.materialsName,
          mustPass: item.mustPass,
          fileList: []
        }
      })
      // 只有赊销相关文件是远程获取配置信息，所以会在initCreditRules中使用setFormItem
      fs.setFormItem('creditFileList', creditFileListConfig)
    }
  }

  return {
    inCache,
    inEdit,
    initCreditRules,
  }
}
