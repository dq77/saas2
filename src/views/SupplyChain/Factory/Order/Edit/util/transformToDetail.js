// import { getGoodsPriceText } from '@/utils/qjd/supplyChain/tools'

// 转换出用于详情展示或编辑的基本信息form数据
export const transformBaseInfoToDetail = (data) => {
  const res = {
    purchaseType: String(data.purchaseType), // 采购方式
    customerId: {
      customerId: data.customerId,
      customerName: data.customerName,
    },
    projectId: {
      projectId: data.projectId,
      projectName: data.projectName
    },
    paymentMethod: {
      id: data.orderOptionsVOS[0].payId,
      dictName: data.orderOptionsVOS[0].valueTitle,
      dictCode: data.orderOptionsVOS[0].value,
      payCategory: data.orderOptionsVOS[0].payCategory
    },
    paymentMethodKeyId: data.orderOptionsVOS[0].parentId,
    receiptPerson: {
      id: data.receiptPerson + data.receiptPhone,
      receiptPerson: data.receiptPerson,
      receiptPhone: data.receiptPhone,
    },
    receiptPhone: data.receiptPhone,
    sendTime: data.sendTime,
    receiveTime: data.receiveTime,
    addressCode: [data.provinceCode, data.cityCode, data.areaCode],
    addressName: [data.province, data.city, data.area],
    addressNameText: [data.province, data.city, data.area].join(' / '),
    address: data.address,
    invoiceCompany: data.orderInvoiceVO.invoiceCompany,
    freightPayId: {
      id: data.orderFreightPayVO.freightPayId,
      dictCode: data.orderFreightPayVO.dictCode,
      dictName: data.orderFreightPayVO.name,
    },
    freightPayDescription: data.orderFreightPayVO.description, // 运费支付方式为厂家有条件承担时需要输入的补充说明，非必填
    description: data.description,
    moneyOrderList: { // 汇款单
      fileList: []
    },

    // 赊销相关字段
    businessTypeConfigEnabled: null,
    customerLevelConfigEnabled: null,
    approvalMaterialsEnabled: null,
    businessTypeCode: null,
    ruleConfig: null,
    creditFileList: null,

    // 详情展现的附加数据
    endTime: data.endTime,
    createdTime: data.createdTime,
    orderBlankFileKey: data.orderBlankFileKey,
    isSign: data.isSign,
    createdByName: data.createdByName,

    // 产品表格展现的附加数据
    // status: data.status, // 订单状态
    reversePrice: data.reversePrice, // 退货中金额
    hasBeenReversePrice: data.hasBeenReversePrice, // 已退货金额
  }
  if (data.orderOptionsVOS[0].value === 'creditPay' && data.orderOptionsVOS[0].payCategory === '1') {
    res.businessTypeConfigEnabled = data.ruleConfigInfoForOrder?.businessTypeConfigEnabled
    res.customerLevelConfigEnabled = data.ruleConfigInfoForOrder?.customerLevelConfigEnabled
    res.approvalMaterialsEnabled = data.ruleConfigInfoForOrder?.approvalMaterialsEnabled
    // 业务类型
    if (data?.ruleConfigInfoForOrder?.businessTypeConfigEnabled) {
      res.businessTypeCode = {
        code: data.businessTypeCode,
        label: data.businessTypeName
      }
    }
    // 产品策略
    if (data?.ruleConfigInfoForOrder?.customerLevelConfigEnabled) {
      res.ruleConfig = {
        id: data.ruleConfigId,
        label: data.ruleConfigName
      }
    }
    // 赊销相关文件
    if (data?.ruleConfigInfoForOrder?.approvalMaterialsEnabled) {
      const fileArrayList = data?.fileArrayList?.length ? data.fileArrayList.map(fileBox => {
        return {
          id: fileBox.businessType,
          label: fileBox.label,
          mustPass: fileBox.mustPass,
          fileList: fileBox.fileList.map(file => {
            return {
              key: file.fileId,
              name: file.fileName,
            }
          })
        }
      }) : []
      res.creditFileList = fileArrayList
    }
  }
  // 汇款单
  if (data?.moneyOrderList?.fileId) {
    res.moneyOrderList.fileList = [
      { key: data?.moneyOrderList?.fileId ?? '', name: data?.moneyOrderList?.fileName ?? '未命名' }
    ]
  }
  return res
}

// 转换出用于详情展示或编辑的产品行table数据
export const transformProductDataToDetail = (tableData) => {
  const newTableData = []
  tableData.forEach(row => {
    const newRow = {
      orderItemId: row.id,
      mainPicPath: row.mainPicPath,
      name: {},
      productSn: {},
      productOptions: [], // 附加字段
      specification: row.specification,
      unitName: row.unitName,
      extendData: [],
      goodsPrice: row.price,
      goodsPriceText: '', // 如果有intervalPrice，用来显示其中的单价
      addedCostPriceVOS: [],
      quantity: row.quantity,
      stockQuantity: row.stockQuantity,
      payAmount: row.payAmount,
      validatePrice: row.price, // 附加字段
      activityId: row.activityId, // 营销活动id
      marketingLogos: row.marketingLogos, // 是否有折扣
      marketingDiscount: row.marketingDiscount, // 折扣
      marketingPrice: row.marketingPrice, // 折后单价
      marketingCount: row.marketingCount, // 剩余折扣数量
      marketingQuantity: row.marketingQuantity, // 折扣价数量
      originalPriceCount: row.originalPriceCount || 0, // 原价数量
      overRestrictedStrategy: row.overRestrictedStrategy, // 超限策略
      isPurchaseRestricted: row.isPurchaseRestricted, // 是否限购，“Y”表示限购
    }

    // 字段转换，产品名称、产品型号
    const productOption = {
      goodsId: row.goodsId,
      name: row.name,
      productSn: row.productSn,
      intervalPrice: row.intervalPrice, // 表格中的intervalPrice来源于此
      price: row.price, // 编辑时当前的单价
    }
    newRow.productOptions[0] = { value: productOption }
    newRow.name = productOption
    newRow.productSn = productOption

    // 字段转换，产品属性
    const extendData = []
    row.extendData && row.extendData.forEach(item => {
      const option = {
        id: item.valueId, // 对应valueId
        label: item.valueName,
        Key: item.value.substr(2),
        spuAttributeId: item.nameId // 对应nameId
      }
      extendData.push({
        label: item.name,
        key: item.value.substr(2),
        value: option,
        options: [{
          value: option
        }],
      })
    })
    newRow.extendData = extendData

    // 字段转换，附加费
    const addedCostPriceVOS = []
    row.itemAddedCostVOS && row.itemAddedCostVOS.forEach(item => {
      addedCostPriceVOS.push({
        code: item.code,
        name: item.name,
        singleFee: item.singleFee,
        fee: item.fee // fee用于后端校验，前端无用
      })
    })
    newRow.addedCostPriceVOS = addedCostPriceVOS
    newTableData.push(newRow)
  })
  return newTableData
}
