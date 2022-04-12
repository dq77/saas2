const getRiskApis = (instanceQuiet) => {
  return {
    // 企业基本信息
    getBaseInfo: (params) => instanceQuiet.get('/ai/report/company/base', { params }),
    // 诉讼和舆情新增数量
    getBasicRenew: (params) => instanceQuiet.get('/ai/reportNew/credit/renew', { params }),
    // 正负面消息总量查询
    getsentimentCount: (params) => instanceQuiet.get('/ai/report/consensus/aggregation', { params }),
    // 正负面消息分页查询
    getsentimentList: (params) => instanceQuiet.get('/ai/report/consensus/page', { params }),
    // 正负面消息分页查询(天眼查)
    getTYCSentimentList: (params) => instanceQuiet.get('/ai/report/consensus/pageTianYanCha', { params }),
    // 经营信息查询
    getBusinessInfo: (params) => instanceQuiet.get('/ai/report/business/info', { params }),
    // 现金流分析
    getCashAnalysisInfo: (params) => instanceQuiet.get('/ai/report/cash/analysis', { params }),
    // 关系图谱
    getRelationMap: (params) => instanceQuiet.get('/ai/report/shipment/mapNew', { params }),
    getCompanyNodeInfo: (params) => instanceQuiet.get('/ai/report/shipment/company', { params }),
    getPersonNodeInfo: (params) => instanceQuiet.get('/ai/report/shipment/job', { params }),
    // 企业画像信息查询
    getCompanyPortraitDetail: (params) => instanceQuiet.get('/ai/report/portraits/info', { params }),
    // 企业画像五力模型查询
    getCompanyPortraitFiveGraph: (params) => instanceQuiet.get('/ai/report/portraits/five/graph', { params }),
    // 股权图谱查询
    getStockInfo: (params) => instanceQuiet.get('/ai/report/stock/info', { params }),
    // 风险扫描汇总查询
    getRiskScanList: (params) => instanceQuiet.get('/ai/report/risk/scan/list', { params }),
    // 风险扫描table查询
    getRiskScanDetail: (params) => instanceQuiet.get('/ai/report/risk/scan/detail/page', { params }),
    // 诉讼分析裁判文书统计查询
    getlawsuitChartInfo: (params) => instanceQuiet.get('/ai/reportNew/judge/count', { params }),
    // 诉讼分析裁判文书talbe查询
    getlawsuitTableInfo: (params) => instanceQuiet.get('/ai/reportNew/judge/page', { params }),
    // 诉讼分析裁判文书talbe查询(天眼查)
    getlawsuitTYCTableInfo: (params) => instanceQuiet.get('/ai/reportNew/judge/pageTianYanCha', { params }),
    // 诉讼分析案由列表查询
    getlawsuitCaseReason: (params) => instanceQuiet.get('/ai/reportNew/judge/caseReason', { params }),
    // 诉讼分析案裁判文书内容查询
    getlawsuitJudgeDetail: (params) => instanceQuiet.get('/ai/reportNew/judge/detail', { params }),
    // 诉讼分析案裁判文书内容查询(天眼查)
    getlawsuitJudgeDetailByTyc: (params) => instanceQuiet.get('/ai/reportNew/judge/pageTianYanChaDetail', { params }),
    // 价值分层-数据概览
    getRedLineCount: (params) => instanceQuiet.get('/partner/pcompany/redCount', { params }),
    // 价值分层-列表
    getSincerityList: (params) => instanceQuiet.get('/partner/pcompany/page', { params }),
    getPageCustomized: (params) => instanceQuiet.get('/partner/pcompany/pageCustomized', { params }),
    checkCompanyModelResult: data => instanceQuiet.post('/partner/pcompany/model/result', data),
    getTaskCount: params => instanceQuiet.get('/partner/pcompany/import/runingJob/count', { params }),
    // 价值分层-修改信息
    checkCompanyInfoById: (params) => instanceQuiet.get('/partner/pcompany/id/info', { params }),
    // 确定导入企业
    checkCompanyInfoByRegNo: params => instanceQuiet.get('/partner/pcompany/regNO/info', { params }),
    // 添加、编辑诚信查询
    addCompanySincerity: data => instanceQuiet.post('/partner/pcompany/add', data),
    editCompanySincerity: data => instanceQuiet.post(`/partner/pcompany/update/${data.id}`, data.params),
    // 更新评级
    updateScore: params => instanceQuiet.get('/partner/pcompany/updateScore', { params }),
    // 移除
    deleteById: params => instanceQuiet.get('/partner/pcompany/deleteById', { params }),
    // 企业触发红线条数
    getOneByCompanyName: params => instanceQuiet.get('/partner/redLine/getOneByCompanyName', { params }),
    // 价值分层-任务列表
    selectOneYuqing: (params) => instanceQuiet.get('/riskmanagement/riskDetail/selectOneYuqing', { params }),
    getTaskList: params => instanceQuiet.get('/partner/pcompany/import', { params }),
    getStatisticsDetailList: params => instanceQuiet.get('/partner/pcompany/excel/statistics/result', { params }),
    getTaskDetailList: params => instanceQuiet.get('/partner/pcompany/importDetails', { params }),
    // 获取搜索列表
    getCompanyList: (params) => instanceQuiet.get('/ai/report/company/match2', { params }),
    // 获取关注列表
    getFollowList: data => instanceQuiet.post('/riskmanagement/followList/page', data),
    // 批量关注
    batchSubscribe: data => instanceQuiet.post('/riskmanagement/followList/saveBatch', data),
    saveOne: data => instanceQuiet.post('/riskmanagement/followList/saveOne', data),
    // 取消关注
    cancelFollow: data => instanceQuiet.post('/riskmanagement/followList/cancel', data),
    // 获取全量关注列表
    getFollowCompanyList: (params) => instanceQuiet.get('/riskmanagement/followList/list', { params }),
    // 获取客户画像主页-最新舆情
    getConsensusList: (params) => instanceQuiet.get('/ai/report/consensus/getCaiJingWang', { params }),
    /** 风险管理 */
    getRiskDetailNum: data => instanceQuiet.post('/riskmanagement/riskDetail/getRiskDetailNum', data),
    getRiskDetailPage: data => instanceQuiet.post('/riskmanagement/riskDetail/page', data),
    getFollowListPage: data => instanceQuiet.post('/riskmanagement/followList/page', data),
    updateShortName: data => instanceQuiet.post('/riskmanagement/followList/updateShortName', data),
    getFollowListImport: (params) => instanceQuiet.get('/riskmanagement/followList/import', { params }),
    getFollowListImportDetails: (params) => instanceQuiet.get('/riskmanagement/followList/importDetails', { params }),
    newsSentimentList: (data) => instanceQuiet.post('/riskmanagement/followList/news/sentiment', data),
    updateScoreList: data => instanceQuiet.post('/partner/pcompany/updateScoreList', data),
    companyExport: data => instanceQuiet.post('/partner/pcompany/excel/export', data)
  }
}

export default getRiskApis
