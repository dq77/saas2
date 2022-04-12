const orderApis = (instanceQuiet) => {
  return {
    getOrderTotalInfo: (params) => instanceQuiet.get('/saas-ofc/org/order/getOrderDataOverview', { params }),
    getOrderList: (data) => instanceQuiet.post('/saas-ofc/org/order/pageInfo', data),
    getOrderBasicInfo: (params) => instanceQuiet.get('/saas-ofc/org/order/findInfoById', { params }),
    getOrderProductInfo: (params) => instanceQuiet.get('/saas-ofc/org/orderItem/getByOrderId', { params }),
    getOrderPriceInfo: (params) => instanceQuiet.get('/saas-ofc/org/orderAddedCost/getByOrderId', { params }),
    createOrder: (data) => instanceQuiet.post('/saas-ofc/org/order/create', data),
    updateOrder: (data) => instanceQuiet.post('/saas-ofc/org/order/updateOrder', data),
    // 获取操作记录
    getGuideList: params => instanceQuiet.get('/saas-boss/guideline/getGuideLineList', { params }),
    // 同步订单
    auditAudit: params => instanceQuiet.get('/saas-ofc/org/order/advice', { params }),
    // 获取赊销对应的规则信息
    getCreditRules: params => instanceQuiet.get('/saas-ofc/org/order/getRuleConfigInfoForOrder', { params }),
    // 计算单行产品价格
    calculatePriceBacth: (data) => instanceQuiet.post('/saas-ofc/org/payCompute/batchPayCompute', data),
    // 下单时通过经销商 id 获取项目列表
    getProjectListByCustomer: params => instanceQuiet.get('/saas-boss/org/v1/boss/project/getProjectList', { params }),
    // 下单时获取产品列表
    getProductRelateOrderList: data => instanceQuiet.post('/saas-ofc/org/payCompute/pagePrice', data),
    // 获取组织下的客户列表
    getCustomerList: data => instanceQuiet.post('/saas-boss/customer/getCustomerByPersonForSaaS', data),
    // 废弃接口 获取订单进行的状态合集，流程外的步骤节点需要前端自己拼
    getOrderStatusGather: params => instanceQuiet.get('/saas-flow/task/stack', { params }),
    // 新接口 获取订单进行的状态合集，不需要前端自己拼步骤节点，替代/saas-flow/task/stack
    getOrderStep: params => instanceQuiet.get('/saas-ofc/org/order/orderStack', { params }),
    // 优化获取属性方式
    getSpecsListRemote: params => instanceQuiet.get('/saas-ofc/org/attrValue/pageList', { params }),
    // 获取付款方式
    getPayTypeList: data => instanceQuiet.post('/saas-ofc/org/order/getMenuList', data),
    // 获取常用开票信息
    getHistoryPayCompany: params => instanceQuiet.get('/saas-ofc/org/orderInvoice/getLatestInvoiceCompanyName', { params }),
    // 获取赊销额度
    getCreditAmount: (data) => instanceQuiet.post('/saas-ofc/org/order/getChargeSalesAmount', data),
    // 审核订单
    approvedOrder: (data) => instanceQuiet.post('/saas-ofc/org/order/approveOrder', data),
    // 审核取消
    cancelOrder: (data) => instanceQuiet.post('/saas-ofc/org/order/cancelOrder', data),
    // getProjectList: (params) => instanceQuiet.get('/saas-boss/org/v1/boss/project/list', { params }),
    getProjectDetail: (params) => instanceQuiet.get('/saas-boss/org/v1/boss/project/get', { params }),
    getProjectInfo: (params) => instanceQuiet.get('/saas-boss/org/v1/boss/project/getInfo', { params }),
    // 分页查询物流信息
    getLogisticsList: data => instanceQuiet.post('/saas-ofc/org/deliver/page', data),
    // 查询单个包裹的详细信息
    getLogisticsDetail: params => instanceQuiet.get('/saas-ofc/org/deliverItem/findByDeliverId', { params }),
    // 手机验证码签收
    phoneCodeReceipt: data => instanceQuiet.post('/saas-ofc/biz/deliver/phoneCodeReceipt', data),
    // 手机验证码签收
    orderPhoneCodeReceipt: data => instanceQuiet.post('/saas-ofc/biz/order/phoneCodeReceipt', data),
    // 获取验证码
    getMobileVerifyCode: data => instanceQuiet.post('/saas-contract/contract/authenticate/getMobileVerifyCode', data),
    // 订单缓存创建
    createOrderCache: data => instanceQuiet.post('/saas-ofc/org/order/createCache', data),
    // 获取订单缓存
    getOrderCache: params => instanceQuiet.get('/saas-ofc/org/order/getOrderCache', { params }),
    // 删除订单缓存
    delOrderCache: data => instanceQuiet.post('/saas-ofc/org/order/delOrderCache', data),
    // 开票信息options查询接口
    getInvoiceOptions: params => instanceQuiet.get('/saas-ofc/org/orderInvoice/getLatestInvoiceCompanyNameOrQcc', { params }),
    // 查询库存配置，是否允许超库存，是否显示库存
    getInventoryConfig: params => instanceQuiet.get('/saas-ofc/org/warehouse/sysconfig/detail', { params }),
    // 根据产品信息获取当前库存量
    getCurrentInventorys: data => instanceQuiet.post('/saas-ofc/org/warehouse/wmsellinfo/getSellInfoListByGoodsAttributeIds', data),
  }
}

export default orderApis
