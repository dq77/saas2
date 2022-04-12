export const vProjectId = (rule, value, callback) => {
  if (!value.projectId) callback(new Error(rule.message))
  else callback()
}

export const vPaymentMethod = (rule, value, callback, formState) => {
  if (!value.dictCode) {
    callback(new Error('请选择付款条件'))
  } else if (value.dictCode === 'creditPay' &&
    value.payCategory === '1' &&
    (typeof formState.formData.creditAmount !== 'number' || formState.formData.creditAmount <= 0)
  ) {
    callback(new Error('暂无可用的赊销额度，请选择其他支付方式'))
  }
  callback()
}

export const vFreightPayId = (rule, value, callback) => {
  if (!value.dictCode) callback(new Error(rule.message))
  else callback()
}

// 运费支付方式的附加信息的校验
export const vFreightPayDescription = (rule, value, callback, formState) => {
  if (formState.formData.freightPayId.dictCode === 'manufacturerConditionalPay' && !value) {
    callback(new Error(rule.message))
  } else {
    callback()
  }
}

// 赊销相关文件的校验
export const vCreditFileList = (rule, value, callback, formState) => {
  const formData = formState.formData
  if (
    formData.paymentMethod.dictCode === 'creditPay' &&
    formData.paymentMethod.payCategory === '1' &&
    formData.approvalMaterialsEnabled === true
  ) {
    for (let i = 0; i < formData.creditFileList.length; i++) {
      const item = formData.creditFileList[i]
      if (item.mustPass === '1' && (!item.fileList || item.fileList.length <= 0)) {
        callback(new Error(rule.message))
        return
      }
    }
    callback()
  } else {
    callback()
  }
}

// 检查产品表格的重复行
export const checkRepeatRow = (dataSource) => {
  const abnormalRowMsg = {}
  const added = []
  dataSource && dataSource.length && dataSource.forEach(row => {
    const obj = {
      goodsId: '',
      extendData: [],
    }
    if (row?.name?.goodsId) {
      obj.goodsId = row.name.goodsId
    } else { // 没填写完整的不收集
      return
    }
    for (let i = 0; i < row.extendData.length; i++) {
      const item = row.extendData[i]
      if (item?.value?.id) {
        obj.extendData.push({
          key: item?.key ?? '',
          value: item?.value?.id ?? ''
        })
      } else { // 没填写完整的不收集
        return
      }
    }
    added.push(JSON.stringify(obj))
  })
  added.forEach((item, index) => {
    if (added.slice(0, index).includes(item)) {
      abnormalRowMsg[index] = true
    }
  })
  return abnormalRowMsg
}
