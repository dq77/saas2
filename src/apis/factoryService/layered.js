const getApis = (instanceQuiet) => {
  return {
    getCompanyListInFactory: (params) => instanceQuiet.get('/partner/pcompany/name/list', { params }),
    getSincerityList: params => instanceQuiet.get('/partner/pcompany/page', { params }),
    getQuotaMatchList: params => instanceQuiet.get('/partner/companyCredit/list', { params }),
    checkCompanyInfoByRegNo: params => instanceQuiet.get('/partner/pcompany/regNO/info', { params }),
    checkCompanyQuotaByRegNo: params => instanceQuiet.get('/partner/companyCredit/getRegCode', { params }),
    checkCompanyInfoById: params => instanceQuiet.get('/partner/pcompany/id/info', { params }),
    checkCompanyRiskSummary: params => instanceQuiet.get('/partner/integrity/consensus/info', { params }),
    addCompanySincerity: data => instanceQuiet.post('/partner/pcompany/add', data),
    editCompanySincerity: data => instanceQuiet.post(`/partner/pcompany/update/${data.id}`, data.params),
    quotaAdd: data => instanceQuiet.post('/partner/companyCredit/addAll', data),
    quotaModify: data => instanceQuiet.post('/partner/companyCredit/update', data),
    getPerformInfo: params => instanceQuiet.get('/partner/integrity/perform', { params }),
    getAbnormalList: params => instanceQuiet.get('/partner/integrity/abnormal/page', { params }),
    getTaskList: params => instanceQuiet.get('/partner/pcompany/import', { params }),
    getQuotaTaskList: params => instanceQuiet.get('/partner/creditImport/page', { params }),
    getTaskDetailList: params => instanceQuiet.get('/partner/pcompany/importDetails', { params }),
    getQuotaTaskDetailList: params => instanceQuiet.get('/partner/creditImport/getById', { params }),
    getTaskCount: params => instanceQuiet.get('/partner/pcompany/import/runingJob/count', { params }),
    getQuotaTaskCount: params => instanceQuiet.get('/partner/creditImport/proceedCount', { params }),
    getHistory: params => instanceQuiet.get('/partner/creditHistory/page', { params }),
    getProductList: params => instanceQuiet.get('/partner/product/factoryEntrust', { params }),
    getStatisticsDetailList: params => instanceQuiet.get('/partner/pcompany/excel/statistics/result', { params }),
    checkCompanyModelResult: data => instanceQuiet.post('/partner/pcompany/model/result', data),
    getRedLineCount: params => instanceQuiet.get('/partner/pcompany/redCount', { params }),
    getRedLineSummary: params => instanceQuiet.get('/partner/redLine/getOneByCompanyName', { params }),
  }
}

export default getApis
