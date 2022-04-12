const getOrderMasterApis = (instanceQuiet) => {
  return {
    getOrderTotalInfo: (params) => instanceQuiet.get('/saas-ofc/biz/order/getOrderDataOverview', { params }),
    // 头部统计信息(发货统计接口)
    getDeliverDataOverview: (params) => instanceQuiet.get('/saas-ofc/org/deliver/getDeliverDataOverview', { params }),
    // 头部统计信息(退货统计接口)
    getReverseOrderDataOverview: (params) => instanceQuiet.get('/saas-ofc/org/reverseOrder/getReverseOrderDataOverview', { params }),
    // 头部统计信息(开票统计接口)
    getDeliverInvoiceDataOverview: (params) => instanceQuiet.get('/saas-ofc/org/invoice/getDeliverInvoiceDataOverview', { params }),
    getOrderList: (data) => instanceQuiet.post('/saas-ofc/biz/order/page', data),
    getOrderPriceInfo: (params) => instanceQuiet.get('/saas-ofc/biz/orderAddedCost/getByOrderId', { params }),
    createOrder: (data) => instanceQuiet.post('/saas-ofc/biz/order/create', data),
    updateOrder: (data) => instanceQuiet.post('/saas-ofc/biz/order/updateOrder', data),
    getProjectListByCustomerId: params => instanceQuiet.get('/saas-boss/org/v1/boss/project/getProjectList', { params }),
    getProjectDetail: (params) => instanceQuiet.get('/saas-boss/biz/v1/boss/project/get', { params }),
    getProjectInfo: (params) => instanceQuiet.get('/saas-boss/biz/v1/boss/project/getInfo', { params }),
    // 查询订单基础信息
    getOrderBasicInfo: (params) => instanceQuiet.get('/saas-ofc/biz/order/findInfoById', { params }),
    // 订单详情的产品类表
    getOrderProductInfo: (params) => instanceQuiet.get('/saas-ofc/biz/orderItem/getByOrderId', { params }),
    // 获取赊销对应的规则信息
    getCreditRules: (params) => instanceQuiet.get('/saas-ofc/biz/order/getRuleConfigInfoForOrder', { params }),
    // 计算单行产品价格
    calculatePriceBacth: (data) => instanceQuiet.post('/saas-ofc/biz/payCompute/batchPayCompute', data),
    // 下单时获取产品列表
    getProductRelateOrderList: data => instanceQuiet.post('/saas-ofc/biz/payCompute/pagePrice', data),
    // 下单时获取项目列表
    getProjectList: params => instanceQuiet.get('/saas-ofc/biz/project/getProjectList', { params }),
    // 优化获取属性方式
    getSpecsListRemote: params => instanceQuiet.get('/saas-ofc/biz/attrValue/pageList', { params }),
    // 获取付款方式
    getPayTypeList: data => instanceQuiet.post('/saas-ofc/biz/order/getMenuList', data),
    // 获取常用开票信息
    getHistoryPayCompany: params => instanceQuiet.get('/saas-ofc/biz/orderInvoice/getLatestInvoiceCompanyName', { params }),
    // 获取赊销额度
    getCreditAmount: (data) => instanceQuiet.post('/saas-ofc/biz/order/getChargeSalesAmount', data),
    // 手机验证码签收
    phoneCodeReceipt: data => instanceQuiet.post('/saas-ofc/biz/deliver/phoneCodeReceipt', data),
    // 手机验证码签收
    orderPhoneCodeReceipt: data => instanceQuiet.post('/saas-ofc/biz/order/phoneCodeReceipt', data),
    // 获取验证码
    getMobileVerifyCode: data => instanceQuiet.post('/saas-contract/contract/authenticate/getMobileVerifyCode', data),
    // 分页查询物流信息
    getLogisticsList: data => instanceQuiet.post('/saas-ofc/biz/deliver/page', data),
    // 查询单个包裹的详细信息
    getLogisticsDetail: params => instanceQuiet.get('/saas-ofc/biz/deliverItem/findByDeliverId', { params }),
    // 获取常用联系人和联系方式和地址
    getCommonlyUsedList: (params) => instanceQuiet.get('/saas-ofc/biz/order/getCommonlyUsedList', {params}),
    // 订单缓存创建
    createOrderCache: data => instanceQuiet.post('/saas-ofc/biz/order/createCache', data),
    // 获取订单缓存
    getOrderCache: params => instanceQuiet.get('/saas-ofc/biz/order/getOrderCache', { params }),
    // 删除订单缓存
    delOrderCache: data => instanceQuiet.post('/saas-ofc/biz/order/delOrderCache', data),
    // 查询库存配置，是否允许超库存，是否显示库存
    getInventoryConfig: params => instanceQuiet.get('/saas-ofc/biz/warehouse/sysconfig/detail', { params }),
    // 根据产品信息获取当前库存量
    getCurrentInventorys: data => instanceQuiet.post('/saas-ofc/biz/warehouse/wmsellinfo/getSellInfoListByGoodsAttributeIds', data),
  }
}

export default getOrderMasterApis
