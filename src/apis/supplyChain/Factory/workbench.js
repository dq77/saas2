const workbenchApis = (instanceQuiet) => {
  return {// 开票流程相关接口
    // 查询业务总览数据
    getBusiOverview: params => instanceQuiet.get('/saas-ofc/org/statistics/getBusinessOverview', { params }),
    // 获取本月新增数据
    getNewIncreased: params => instanceQuiet.get('/saas-ofc/org/statistics/getMonthNewIncrease', { params }),
    // 获取待处理数据
    getTaskList: params => instanceQuiet.get('/saas-ofc/org/statistics/getTaskCardInfo', { params }),
    // 获取每月订单数量变化统计
    getOderStatics: params => instanceQuiet.get('/saas-ofc/org/statistics/getOrderLineChartInfoVO', {params}),
    // 获取每月下单客户数统计
    getOderCustomerStatics: params => instanceQuiet.get('/saas-ofc/org/statistics/getCustomerLineChartInfo', {params}),
  }
}

export default workbenchApis
