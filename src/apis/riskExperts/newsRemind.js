const getApis = (instanceQuiet) => {
  return {
    // 新闻舆情列表
    getReriskopiniondistribution: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/reriskopiniondistribution/page', { params }),
    // 一键已读
    readEvent: data => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/reriskopiniondistribution/read', data),
    // 模糊搜索-下拉列表
    getDropDownList: data => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/reriskopiniondistribution/dropDownList', data),
    // 风险事件
    getListByMemberPage: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/reriskevent/getListByMemberPage', { params }),
    // 风险事件客户模糊搜索
    getCorporationList: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/reriskevent/getCorporationList', { params }),
    // 风险事件-已读
    riskReadEvent: data => instanceQuiet.post('/v1/riskexpert/reriskeventdistribution/read', data),
  }
}

export default getApis
