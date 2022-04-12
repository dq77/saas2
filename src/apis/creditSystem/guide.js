const getGuideApis = (instanceQuiet) => {
  return {
    // 获取指引操作记录
    getGuideList: (params) => instanceQuiet.get('/saas-credit/v1/credit/opguide/list', { params }),
    // 判断是否做过指引
    getIsGuide: (params) => instanceQuiet.get('/saas-credit/v1/credit/opguide/count', { params }),
    // 创建指引记录接口
    createGuide: (data) => instanceQuiet.post('/saas-credit/v1/credit/opguide/create', data),
    // 还款日历
    calendarDetailList: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/calendarDetailList', { params })
  }
}

export default getGuideApis
