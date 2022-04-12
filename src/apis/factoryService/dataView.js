const getApis = (instanceQuiet) => {
  return {
    getRiskBasic: (params) => instanceQuiet.get('/partner/risk/basic', { params }),
    getRiskSummary: (params) => instanceQuiet.get('/partner/risk/market', { params }),
    getBusinessSummary: (params) => instanceQuiet.get('/partner/business/market', { params }),
    getBusinessCompanyTop: (params) => instanceQuiet.get('/partner/business/market/company/top', { params }),
    getQuotaSummary: (params) => instanceQuiet.get('/partner/quota/market', { params }),
    getQuotaHistory: (params) => instanceQuiet.get('/partner/quota/getMarketHistory', { params }),
    getRiskArea: (params) => instanceQuiet.get('/partner/risk/market/area', { params }),
    getBusinessArea: (params) => instanceQuiet.get('/partner/business/market/area', { params }),
    getShipmentSummary: (params) => instanceQuiet.get('/partner/business/market/shipment', { params }),
    getRiskTop: (params) => instanceQuiet.get('/partner/risk/consensus/top', { params }),
    getStatistics: params => instanceQuiet.get('/partner/consensus/statistics', { params }),
  }
}

export default getApis
