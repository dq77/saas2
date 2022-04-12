// 转换出用于提交的基本信息form数据
export const transformBaseInfoToSubmit = (data) => {
  const res = {
    sourceType: data.sourceType, // 用户支持的业务类型
    purchaseType: data.purchaseType, // 采购方式

    address: data.address,
    province: data.addressName[0],
    city: data.addressName[1],
    area: data.addressName[2],
    provinceCode: data.addressCode[0],
    cityCode: data.addressCode[1],
    areaCode: data.addressCode[2],
    customerId: data.customerId.customerId,
    description: data.description,
    orderFreightPayDTO: { // 运费支付方式
      freightPayId: data.freightPayId.id,
      description: data.freightPayDescription // 运费支付方式的备注
    },
    orderInvoiceDTO: { // 开票信息
      invoiceCompany: data.invoiceCompany
    },
    orderOptionsDTOS: [ // 付款方式
      { keyId: data.paymentMethodKeyId, valueId: data.paymentMethod.id }
    ],
    projectId: data?.projectId?.projectId ?? null,
    // receiptPerson可以是选择，也可以自己输入
    receiptPerson: data.receiptPerson.receiptPerson || data.receiptPerson,
    receiptPhone: data.receiptPhone,
    receiveTime: data.receiveTime,
    sendTime: data.sendTime,
  }
  // 赊销相关
  if (data.paymentMethod.dictCode === 'creditPay' && data.paymentMethod.payCategory === '1') {
    // 业务类型
    if (data.businessTypeConfigEnabled) {
      res.businessTypeCode = data.businessTypeCode.code
      res.businessTypeName = data.businessTypeCode.label
    }
    // 产品策略
    if (data.customerLevelConfigEnabled) {
      res.ruleConfigId = data.ruleConfig.id
      res.ruleConfigName = data.ruleConfig.label
    }
    // 赊销相关文件
    if (data.approvalMaterialsEnabled) {
      const fileArrayList = data.creditFileList.map(fileBox => {
        return {
          businessType: fileBox.id,
          label: fileBox.label,
          mustPass: fileBox.mustPass,
          fileList: fileBox.fileList.map(file => {
            return {
              fileId: file.key,
              fileName: file.name,
            }
          })
        }
      })
      res.fileArrayList = fileArrayList
    }
  }
  // 汇款单
  if (data.moneyOrderList?.fileList?.length) {
    res.moneyOrderList = {
      fileId: data.moneyOrderList.fileList[0].key,
      fileName: data.moneyOrderList.fileList[0].name,
    }
  }
  return res
}

// 转换出用于提交的产品行table数据
export const transformProductDataToSubmit = (tableData) => {
  const rows = []
  tableData.forEach(row => {
    // 产品属性
    const extendData = row.extendData.map(item => {
      return {
        name: item.label,
        nameId: item.value.spuAttributeId,
        value: '@@' + item.key,
        valueId: item.value.id,
      }
    })
    // 附加费
    const itemAddedCostDTOS = row.addedCostPriceVOS.map(item => {
      return {
        name: item.name,
        code: item.code,
        fee: item.fee, // 后端固定需要，前端无用
        singleFee: item.singleFee
      }
    })
    // 新数据
    const newRow = {
      goodsId: row.name.goodsId,
      name: row.name.name,
      specification: row.specification,
      extendData,
      quantity: row.quantity,
      itemAddedCostDTOS,
      goodsPrice: row.goodsPrice,
      price: row.validatePrice, // 商品价格，后端做价格校验用，前端无用
      marketingDiscount: row.marketingDiscount,
      activityId: row.activityId,
      // freight: null, // 暂时不需要
    }
    rows.push(newRow)
  })
  return rows
}
