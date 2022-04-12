
const getApis = (instanceQuiet) => {
  return {
    // 获取搜索列表
    getCompanyList: (params) => instanceQuiet.get('/riskmanagement/report/company/match2', { params }),
    // 企业画像信息查询
    getCompanyPortraitDetail: (params) => instanceQuiet.get('/riskmanagement/report/portraits/info', { params }),
    // 股东（多层级）、投资（多层级）
    getShipmentAtlas: (params) => instanceQuiet.get('/riskmanagement/report/shipment/corp/atlas', { params }),
    // 历史股东
    getHistoryShareHolders: (params) => instanceQuiet.get('/riskmanagement/report/shipment/historyHolder', { params }),
    // 历史投资
    getHistoryInvestment: (params) => instanceQuiet.get('/riskmanagement/report/shipment/historyInvest', { params }),
    // 分支机构
    getBranch: (params) => instanceQuiet.get('/riskmanagement/report/shipment/branch', { params }),
    // 兄弟公司
    getBrotherCorp: (params) => instanceQuiet.get('/riskmanagement/report/shipment/brotherCorp', { params }),
    // 风险扫描汇总查询
    getRiskScanList: (params) => instanceQuiet.get('/riskmanagement/report/shipment/riskInfo', { params }),
    // 风险扫描table查询
    getRiskScanDetail: (params) => instanceQuiet.get('/riskmanagement/report/shipment/riskDetail', { params }),
    // 竞品分析
    getJingpin: (params) => instanceQuiet.get('/riskmanagement/report/business/findJingpin', { params }),
    // 动产抵押
    getMortgageInfo: (params) => instanceQuiet.get('/riskmanagement/report/business/mortgageInfo', { params }),
    // 股权出质
    getEquityInfo: (params) => instanceQuiet.get('/riskmanagement/report/business/equityInfo', { params }),
    // 行政处罚
    getPunishmentInfo: (params) => instanceQuiet.get('/riskmanagement/report/business/punishmentInfo', { params }),
    // 行政许可
    getAdministrativeLicense: (params) => instanceQuiet.get('/riskmanagement/report/business/getAdministrativeLicense', { params }),
    // 税务评级
    getTaxCredit: (params) => instanceQuiet.get('/riskmanagement/report/business/taxCredit', { params }),
    // 税收违法
    getTaxContravention: (params) => instanceQuiet.get('/riskmanagement/report/business/taxContravention', { params }),
    // 欠税公告
    getOwnTax: (params) => instanceQuiet.get('/riskmanagement/report/business/ownTax', { params }),
    // 经营异常
    getAbnormal: (params) => instanceQuiet.get('/riskmanagement/report/business/abnormal', { params }),
    // 对外担保
    getGuarantees: (params) => instanceQuiet.get('/riskmanagement/report/business/guarantees', { params }),
    // 立案信息
    getCourtRegister: (params) => instanceQuiet.get('/riskmanagement/report/judgement/courtRegister', { params }),
    // 开庭公告
    getKtannouncement: (params) => instanceQuiet.get('/riskmanagement/report/judgement/ktannouncement', { params }),
    // 法律诉讼
    getLawSuit: (params) => instanceQuiet.get('/riskmanagement/report/judgement/lawSuit', { params }),
    // 失信
    getDishonest: (params) => instanceQuiet.get('/riskmanagement/report/judgement/dishonest', { params }),
    // 被执行
    getZhixinginfo: (params) => instanceQuiet.get('/riskmanagement/report/judgement/zhixinginfo', { params }),
    // 终本案件
    getEndCase: (params) => instanceQuiet.get('/riskmanagement/report/judgement/endCase', { params }),
    // 限制消费令
    getConsumptionRestriction: (params) => instanceQuiet.get('/riskmanagement/report/judgement/consumptionRestriction', { params }),
    // 获取舆情热词
    getHotWords: (data) => instanceQuiet.post('/partner/newsHotwords/getHotWords', data),
    // 获取新闻舆情
    getXWYQList: (data) => instanceQuiet.post('/riskmanagement/report/consensus/page', data),
    // 企业速览
    getScanning: (params) => instanceQuiet.get('/riskmanagement/report/scanning/list', { params }),
    // 获取顶部信息
    getTopInfo: (params) => instanceQuiet.get('/riskmanagement/report/common/top', { params }),
    // 获取预警动态
    getScanningWarining: (params) => instanceQuiet.get('/riskmanagement/report/scanning/early/warning', { params }),
    // 获取关联公司上下关系图
    getRelatedCompanyByLevel: (params) => instanceQuiet.get('/partner/enterprise/portal/tyc/gqct/qjy', { params }),
    // 关系图谱
    getRelationMap: (params) => instanceQuiet.get('/riskmanagement/report/shipment/mapNew', { params }),
    getCompanyNodeInfo: (params) => instanceQuiet.get('/riskmanagement/report/shipment/company', { params }),
    getPersonNodeInfo: (params) => instanceQuiet.get('/riskmanagement/report/shipment/job', { params }),
    // 热门搜索列表
    getHotSearchList: (params) => instanceQuiet.get('/riskmanagement/company/selectCompany', { params }),
    // 我的订阅列表
    getReportList: (params) => instanceQuiet.get('/partner/khws/report/pages', { params }),
    // 新增产品
    applyReport: (data) => instanceQuiet.post('/partner/khws/report/add', data),
  }
}

export default getApis
