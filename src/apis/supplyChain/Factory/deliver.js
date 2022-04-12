const deliverApis = (instanceQuiet) => {
  return {// 发货管理相关接口
    // 获取发货单状态列表
    getReceiptStatusList: params => instanceQuiet.get('/saas-ofc/org/deliver/getDeliverStatusMenu', { params }),
    // 获取订单下发货信息列表
    getOderDeliverList: params => instanceQuiet.get('/saas-ofc/org/deliver/findDeliverList', { params }),
    // 获取发货信息
    getDeliverInfo: data => instanceQuiet.post('/saas-ofc/org/order/getOrderInfo', data),
    // 获取货物明细列表（新建he编辑）
    getCreateCargoList: data => instanceQuiet.post('/saas-ofc/org/deliverItem/getDeliverItemInfoListByDeliverId', data),
    // 创建发货
    createDeliver: data => instanceQuiet.post('/saas-ofc/org/deliver/create', data),
    // 编辑发货
    editDeliver: data => instanceQuiet.post('/saas-ofc/org/deliver/update', data),
    // 确认发货
    confirmDeliver: params => instanceQuiet.get('/saas-ofc/org/deliver/confirmDeliver', { params }),
    // 关闭发货
    closeDeliver: params => instanceQuiet.get('/saas-ofc/org/deliver/closeDeliver', { params }),
    // 查询单个包裹的详细信息
    getLogisticsDetail: params => instanceQuiet.get('/saas-ofc/org/deliverItem/findByDeliverId', { params }),
    // 修改发货数量时计算发货总价
    calculateDeliverPrice: data => instanceQuiet.post('/saas-ofc/org/deliverItem/getDeliverItemPrice', data),
  }
}

export default deliverApis
