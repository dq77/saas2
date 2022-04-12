import ajaxStore from '@/apis'

export default function ({
  formState
}) {
  // 根据配置信息，设置赊销相关字段的显隐与下拉项
  const initCreditRules = (config) => {
    const fs = formState
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

  // 可用赊销额度 creditAmount
  const getCreditAmount = async () => {
    const res = await ajaxStore.dealer.getCreditAmount({
      payId: formState.formData.paymentMethod?.id,
      customerId: formState.formData.customerId?.customerId,
      projectId: formState.formData.projectId?.projectId,
    })
    let creditAmount = '--'
    if (res?.data?.code === '0') {
      creditAmount = res.data.data || '--'
    }
    formState.setFormItem('creditAmount', creditAmount)
    formState.setConfig('creditAmount', 'isHidden', false)
  }

  // 业务规则：业务类型 businessTypeCode，产品策略 ruleConfig，赊销相关文件 creditFileList
  const getCreditRules = async () => {
    const res = await ajaxStore.dealer.getCreditRules({
      customerId: formState.formData.customerId?.customerId,
    })
    if (res?.data?.code === '0') {
      initCreditRules(res.data.data)
    }
  }

  // 切换是否使用赊销支付，isCredit表示是否使用赊销
  const changeCredit = async (isCredit) => {
    if (isCredit) {
      // 获取可用赊销额度。此函数不用传入isDetail，因为它不是真实的表单项
      await getCreditAmount()
      // 获取业务类型、赊销相关文件
      await getCreditRules()
    } else {
      formState.setConfig('creditAmount', 'isHidden', true)
      formState.setConfig('businessTypeCode', 'isHidden', true)
      formState.setConfig('ruleConfig', 'isHidden', true)
      formState.setConfig('creditFileList', 'isHidden', true)
    }
  }

  return {
    initCreditRules,
    changeCredit,
    getCreditAmount,
    getCreditRules,
  }
}
