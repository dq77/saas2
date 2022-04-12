const getApis = (instanceQuiet) => {
  return {
    // 当前厂家分配的合同数量
    getRadarList: params => instanceQuiet.get('/partner/consensus/page', { params }),
    getExecuteeList: params => instanceQuiet.get('/partner/consensus/zx/page', { params }),
    getBreakPromiseList: params => instanceQuiet.get('/partner/consensus/sx/page', { params }),
    getHeightLimitList: params => instanceQuiet.get('/partner/consensus/xg/page', { params }),
    getAbnormalOperationList: params => instanceQuiet.get('/partner/consensus/jyyc/page', { params }),
    getChattelMortgageList: params => instanceQuiet.get('/partner/consensus/dcdy/page', { params }),
    getAdministrativeSanctionList: params => instanceQuiet.get('/partner/consensus/xzcf/page', { params }),
    getStatistics: params => instanceQuiet.get('/partner/consensus/statistics', { params })
  }
}

export default getApis
