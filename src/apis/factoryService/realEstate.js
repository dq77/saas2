const getApis = (instanceQuiet) => {
  return {
    // ------ 开发商评估 -------
    // 获取年度销售额排名
    getSalesAmountSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/salesAmount', { params }),
    // 获取年度销售面积排名
    getSalesAreaSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/salesArea', { params }),
    // 获取年度拿地额排名
    getAcquireLandAmountSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/acquireLandAmount', { params }),
    // 获取年度拿地面积排名
    getAcquireLandAreaSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/acquireLandArea', { params }),
    // 获取年度总资产排名
    getAssetsSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/zzc', { params }),
    // 获取年度总负债排名
    getLiabilitiesSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/zfz', { params }),
    // 获取年度净利润排名
    getNetProfitSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/jlr', { params }),
    // 获取年度负债率排名
    getDebtRatioSummary: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/zcfzl', { params }),
    // 获取舆情预警列表
    getSentimentWarning: (params) => instanceQuiet.get('/partner/enterprise/portal/sentiment/warning', { params }),
    // 获取开发商风险榜单表
    getCompanyRiskLevel: data => instanceQuiet.post('/partner/enterprise/portal/data/company/riskLevel', data),
    // 获取新闻资讯列表
    getTopNews: (params) => instanceQuiet.get('/partner/enterprise/portal/top/news', { params }),
    // 获取行业舆情预警日报
    getDailyReportList: (params) => instanceQuiet.get('/partner/enterprise/portal/industry/opinion/daily', { params }),
    // 获取行业舆情预警日报日期列表
    getPublishTime: (params) => instanceQuiet.get('/partner/enterprise/portal/message/getPublishTime', { params }),
    // 获取可查看企业列表
    getPermissionList: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/permissionList', { params }),
    // 获取企业总排名
    getEnterpriseCompanyTop: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/list', { params }),
    // 获取关注列表
    getFollowCompanyList: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/subscribeCompanyList', { params }),
    // 取消关注
    unfollowCompany: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/unSubscribe', { params }),
    // 关注
    followCompany: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/subscribe', { params }),
    // 批量添加关注
    batchSubscribe: (data) => instanceQuiet.post('/partner/enterprise/portal/data/company/batchSubscribe', data),
    // 获取所有客户名称列表
    getCompanyList: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/companyList', { params }),
    // 获取公司基本信息
    getCompanyBase: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/base', { params }),
    // 获取更多公司基本信息（比如LOGO）
    getCreditCompanyBase: (params) => instanceQuiet.get('/partner/v2/evaluation/project/companyInfo', { params }),
    // 获取股权穿刺图中更多个人信息
    getPersonNodeInfo: (params) => instanceQuiet.get('/partner/v2/evaluation/project/job', { params }),
    // 获取三条红线统计
    getThreeRedLine: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/threeRedLine', { params }),
    // 获取股东信息
    getHolder: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/holder', { params }),
    // 获取司法诉讼
    getSFSSList: (params) => instanceQuiet.get('/partner/enterprise/detail/page', { params }),
    // 获取被执行人
    getBZXRList: (params) => instanceQuiet.get('/partner/enterprise/detail/zx/page', { params }),
    // 获取失信
    getSXList: (params) => instanceQuiet.get('/partner/enterprise/detail/sx/page', { params }),
    // 获取限制高消费
    getXGList: (params) => instanceQuiet.get('/partner/enterprise/detail/xg/page', { params }),
    // 获取经营异常
    getJYYCList: (params) => instanceQuiet.get('/partner/enterprise/detail/jyyc/page', { params }),
    // 获取动产抵押
    getDCDYList: (params) => instanceQuiet.get('/partner/enterprise/detail/dcdy/page', { params }),
    // 获取股权质押
    getGYZYList: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/stockPledge', { params }),
    // 获取新闻舆情
    // getXWYQList: (params) => instanceQuiet.get('/partner/enterprise/detail/news/sentiment', { params }),
    getXWYQList: (data) => instanceQuiet.post('/ai/report/consensus/pageInfo', data),
    // 获取销售金额/拿地金额，销售面积/拿地面积
    getSaleLand: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/saleLand', { params }),
    // 获取项目个数统计
    getProjectSummary: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/projectStatistics', { params }),
    // 获取财务数据
    getFinanceSummary: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/finance', { params }),
    // 获取股权质押-数据概览
    getStockPledgeRatio: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/stockPledgeRatio', { params }),
    // 获取股权质押趋势
    getStockPledgeTrend: (params) => instanceQuiet.get('/partner/enterprise/detail/data/company/stockPledgeTrend', { params }),
    // 获取司法诉讼地区分布
    getRiskDistribution: (params) => instanceQuiet.get('/partner/enterprise/detail/riskDistribution', { params }),
    // 获取司法风险-数据概览
    getRiskDistributionSummary: (params) => instanceQuiet.get('/partner/enterprise/detail/statistics', { params }),
    // 获取关联公司上下关系图
    getRelatedCompanyByLevel: (params) => instanceQuiet.get('/partner/enterprise/portal/tyc/gqct', { params }),
    // 获取关联公司关联风险统计
    getRelationCompanyRiskCount: params => instanceQuiet.get('/partner/evaluation/project/relationCompanyRiskCount', { params }),
    // 获取关联公司司法诉讼列表
    getRelationSFSSList: (params) => instanceQuiet.get('/partner/evaluation/project/sfRelationCompany', { params }),
    // 获取关联公司被执行人列表
    getRelationBZXRList: (params) => instanceQuiet.get('/partner/evaluation/project/zxRelationCompany', { params }),
    // 获取关联公司失信列表
    getRelationSXList: (params) => instanceQuiet.get('/partner/evaluation/project/sxRelationCompany', { params }),
    // 获取关联公司限制高消费列表
    getRelationXGList: (params) => instanceQuiet.get('/partner/evaluation/project/xgRelationCompany', { params }),
    // 获取关联公司经营异常列表
    getRelationJYYCList: (params) => instanceQuiet.get('/partner/evaluation/project/jyycRelationCompany', { params }),
    // 获取关联公司动产抵押列表
    getRelationDCDYList: (params) => instanceQuiet.get('/partner/evaluation/project/dcdyRelationCompany', { params }),
    // 获取研究报告列表
    getReportList: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/reportList', { params }),
    // 申请研究报告
    applyReport: (data) => instanceQuiet.post('/partner/enterprise/portal/data/company/applyReport', data),
    // 查看客户报告
    checkReport: params => instanceQuiet.get('/partner/enterprise/portal/data/company/queryReportDetail', { params }),
    // 取消申请报告
    updateReport: (data) => instanceQuiet.post('/partner/enterprise/portal/data/company/updateReport', data),
    // 商票查询
    getTicketList: (params) => instanceQuiet.get('/partner/enterprise/detail/data/ticket/list', { params }),
    // 债券查询
    getIssuedList: data => instanceQuiet.post('/partner/enterprise/portal/data/bondIssuance/list', data),
    // 债券违约
    getBreachList: data => instanceQuiet.post('/partner/enterprise/portal/data/bondDefault/list', data),
    // 获取公司映射表
    getCompanyReplace: (params) => instanceQuiet.get('/partner/companyReplace/list', { params }),
    // 获取舆情热词
    getHotWords: (params) => instanceQuiet.get('/partner/newsHotwords/selectOne', { params }),

    // ------ 项目评估 -------
    // 保存、提交项目
    projectSave: (data) => instanceQuiet.post('/partner/evaluation/project/save', data),
    // 编辑项目
    projectEdit: (data) => instanceQuiet.post('/partner/evaluation/project/edit', data),
    // 取消项目评估
    cancelProgramme: (data) => instanceQuiet.post('/partner/evaluation/project/cancel', data),
    // 获取关联公司列表
    getRelatedCompanyList: (params) => instanceQuiet.get('/partner/evaluation/project/relatedCompany', { params }),
    // 获取项目评估概览
    getEvaluationStatistics: (params) => instanceQuiet.get('/partner/evaluation/project/evaluationStatistics', { params }),
    // 通过id获取项目信息-本方
    getProjectDetail: (params) => instanceQuiet.get('/partner/evaluation/project/getEvaluationProjectById', { params }),
    // 通过id获取项目信息-第三方
    getProjectById: (params) => instanceQuiet.get('/partner/evaluation/project/getProjectById', { params }),
    // 获取项目评估列表（人工、基本）
    getProgrammeList: (data) => instanceQuiet.post('/partner/evaluation/project/list', data),
    // 获取项目列表-第三方
    getBaseProgrammeList: (data) => instanceQuiet.post('/partner/evaluation/project/search', data),
    // 获取关联公司风险概况
    getRelationRiskSummary: (params) => instanceQuiet.get('/partner/evaluation/project/riskRelationStatistics', { params }),
    // 获取股权质押概览
    getStockPledgeSummary: (params) => instanceQuiet.get('/partner/evaluation/project/stockPledgeNum', { params }),
    // 获取股东信息
    getShareholder: (params) => instanceQuiet.get('/partner/v2/evaluation/project/companyStockRights', { params }),
    // 获取股权穿刺图信息
    getRelationMap: (params) => instanceQuiet.get('/partner/v2/evaluation/project/companyMap', { params }),
    // 获取三条红线对比
    getSubscribeThreeRedLine: (data) => instanceQuiet.post('/partner/enterprise/detail/data/company/subscribeThreeRedLine', data),
    // 企业关联关系查询
    queryCompany: (params) => instanceQuiet.get('/ai/report/company/match/name', { params }),
    queryRelation: (params) => instanceQuiet.get('/ai/report/shipment/path', { params }),
  }
}

export default getApis
