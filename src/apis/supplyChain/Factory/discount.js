const discountApis = (instanceQuiet) => {
  return {// 限时折扣活动
    // 查询活动列表
    getActivityList: data => instanceQuiet.post('/saas-marketing/org/activity/pagelist', data),
    // 获取统计状态
    getStatusCount: params => instanceQuiet.get('/saas-marketing/org/activity/statisticStatus', { params }),
    // 获取活动明细
    getActivityDtl: params => instanceQuiet.get('/saas-marketing/org/activity/detail', { params }),
    // 创建活动
    createActivity: data => instanceQuiet.post('/saas-marketing/org/activity/create', data),
    // 修改活动
    editActivity: data => instanceQuiet.post('/saas-marketing/org/activity/edit', data),
    // 关闭活动
    closeActivity: params => instanceQuiet.get('/saas-marketing/org/activity/ternimate', { params }),
  }
}

export default discountApis
