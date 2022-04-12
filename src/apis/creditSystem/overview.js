const getOverview = (instanceQuiet) => {
  return {
    // 授信总览 /saas-credit/v1/credit/creditstatistics/getCreditAccountOverview
    getViewInfo: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/getCreditAccountOverview', { params }),
    // 业务员额度使用排名 /saas-credit/v1/credit/creditstatistics/getMemberRank
    getMemberRank: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/getMemberRank', { params }),
    // 经销商授信额度排名 /saas-credit/v1/credit/creditstatistics/getAccountRank
    getAccountRank: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/getAccountRank', { params }),
    // 放款明细列表 /saas-credit/v1/credit/creditstatistics/getLoanDetailsList
    getLoanDetailsList: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/getLoanDetailsList', { params }),
    // 待收欠款占比 /saas-credit/v1/credit/creditstatistics/dealerDebtTotal
    dealerDebtTotal: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/dealerDebtTotal', { params }),
    // 经销商欠款排名 /saas-credit/v1/credit/creditstatistics/dealerDebtRanking
    dealerDebtRanking: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/dealerDebtRanking', { params }),
    // 催收明细 /saas-credit/v1/credit/creditstatistics/debtDetailList
    debtDetailList: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/debtDetailList', { params }),
    // 待业务员催收的逾期额度排名 /saas-credit/v1/credit/creditstatistics/memberRelDealerOverdueRanking
    overdueRanking: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/memberRelDealerOverdueRanking', { params }),
    // 经销商授信额度排名top10 /saas-credit/v1/credit/creditstatistics/dealerOverdueRanking
    dealerOverdueRanking: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/dealerOverdueRanking', { params }),
    // 经销商逾期明细表 /saas-credit/v1/credit/creditstatistics/dealerOverdueDetailList
    dealerOverdueDetailList: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditstatistics/dealerOverdueDetailList', { params }),
    // 任务卡片
    getCountProcessKey: data => instanceQuiet.post('/saas-flow/task/countProcessKey', data)
  }
}

export default getOverview
