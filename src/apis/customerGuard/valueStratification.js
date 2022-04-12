const getApis = (instanceQuiet) => {
  return {
    /** 价值详情 */
    // 缓存接口
    saveAll: data => instanceQuiet.post('/riskmanagement/value/saveAll', data),
    // 模型基础分数
    enterpriseScore: (params) => instanceQuiet.get('/partner/pcompany/enterpriseScore', { params }),
    // 红线触发次数
    redCountByProcessId: (params) => instanceQuiet.get('/partner/pcompany/redCountByProcessId', { params }),
    // tab1 基础信息
    tycCompanyBase: data => instanceQuiet.post('/riskmanagement/value/tycCompanyBase', data),
    // tab1 股权穿透
    tycGqct: data => instanceQuiet.post('/riskmanagement/value/tycGqct', data),
    // tab2 经营状况
    stateOfBusiness: data => instanceQuiet.post('/riskmanagement/value/stateOfBusiness', data),
    // tab3 司法风险
    law: data => instanceQuiet.post('/riskmanagement/value/law', data),
    // tab4 履约行为
    credit: data => instanceQuiet.post('/riskmanagement/value/credit', data),
    // tab5
    // 获取公司所在行业
    getIndustry: (params) => instanceQuiet.get('/partner/finance/getIndustry', { params }),
    // 查询季度的时间
    getReportDate: (params) => instanceQuiet.get('/partner/finance/getReportDate', { params }),
    // 查询半年度的时间
    getMainBusinessDate: (params) => instanceQuiet.get('/partner/finance/getMainBusinessDate', { params }),
    // 行业对比
    // 根据年月查询行业平均值
    getAvgByTime: (params) => instanceQuiet.get('/partner/finance/getAvgByTime', { params }),
    // 行业排名趋势
    getTabAll: (params) => instanceQuiet.get('/partner/finance/getTabAll', { params }),
    // 查询某一个公司的主营指标
    getByDealerTime: (params) => instanceQuiet.get('/partner/finance/getByDealerTime', { params }),
    // 核心指标
    // 查询行业季度财务报表
    getByQuarter: (params) => instanceQuiet.get('/partner/finance/getByQuarter', { params }),
    // 查询季度某一公司财务报表
    getOneDealerByQuarter: (params) => instanceQuiet.get('/partner/finance/getOneDealerByQuarter', { params }),
    /** 客户画像 */
    // 主营构成
    getMainBusiness: (params) => instanceQuiet.get('/partner/finance/getMainBusiness', { params }),
    // 财务报表
    // 查询资产负债
    getBalanceByQuarter: (params) => instanceQuiet.get('/partner/finance/getBalanceByQuarter', { params }),
    // 现金流量表摘要
    getCashFlowByQuarter: (params) => instanceQuiet.get('/partner/finance/getCashFlowByQuarter', { params }),
    // 利润表摘要
    getIncomeByQuarter: (params) => instanceQuiet.get('/partner/finance/getIncomeByQuarter', { params })
  }
}

export default getApis
