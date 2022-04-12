const orderApis = (instanceQuiet) => {
  return {// 退货货管理相关接口----逆向订单
    // 获取退货列表
    getReverseOrderList: (params) => instanceQuiet.get('/saas-ofc/org/reverseOrder/pageInfo', {params}),
    // 获取退货的详情信息
    getReverseDetail: (params) => instanceQuiet.get('/saas-ofc/org/reverseOrder/getReverseOrderById', {params}),
    // 获取退货的详情产品列表
    getReverseProductList: (params) => instanceQuiet.get('/saas-ofc/org/reverseOrderItem/listReverseOrderItem', {params}),
    // 获取订单页面的退货列表
    getOrderReverseList: (params) => instanceQuiet.get('/saas-ofc/org/reverseOrder/listReverseOrder', {params}),
    // 确定退货申请
    confirmReverseOrder: (data) => instanceQuiet.post('/saas-ofc/org/reverseOrder/confirm', data),
    // 退货申请完成
    sucessReverseOrder: (data) => instanceQuiet.post('/saas-ofc/org/reverseOrder/returnSuccess', data),
    // 驳回退货申请
    rejectReverseOrder: (data) => instanceQuiet.post('/saas-ofc/org/reverseOrder/rejectedFlow', data),
  }
}

export default orderApis
