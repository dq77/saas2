const getApis = (instanceQuiet) => {
  return {
    /** 精准分层基础列表、添加经销商 */
    // 当前厂家的统计信息
    getBoard: (params) => instanceQuiet.get('/riskmanagement/jzfc/board', { params }),
    // 查询精准分层厂家列表
    getCompanyList: data => instanceQuiet.post('/riskmanagement/jzfc/companyList', data),
    // 添加经销商
    addCompany: data => instanceQuiet.post('/riskmanagement/jzfc/addCompany', data),

    /** 经销商 初始化信息查询 */
    // 查询经销商基础信息
    getCompanyBasic: (params) => instanceQuiet.get('/riskmanagement/jzfc/companyBasic', { params }),
    // 查询经销商下个人列表信息（法人、实控人、配偶）
    getPersonBasicList: (params) => instanceQuiet.get('/riskmanagement/jzfc/personBasicList', { params }),
    // 查询经销商的股东列表
    getCompanyStockholder: (params) => instanceQuiet.get('/riskmanagement/jzfc/companyStockholder', { params }),
    // 查询资料列表(企业、个人)
    getMaterialList: (params) => instanceQuiet.get('/riskmanagement/jzfc/materialList', { params }),
    // 查询房产列表
    getHouseList: (params) => instanceQuiet.get('/riskmanagement/jzfc/houseList', { params }),
    // 评估记录
    getApplyList: data => instanceQuiet.post('/riskmanagement/jzfc/applyList', data),
    // 根据companyBasicCode查询的评估结果
    getEvaluateResult: (params) => instanceQuiet.get('/riskmanagement/jzfc/evaluateResult', { params }),
    getRejectResult: (params) => instanceQuiet.get('/riskmanagement/jzfc/rejectResult', { params }),
    // 剩余次数
    getResidualNumber: (params) => instanceQuiet.get('/riskmanagement/jzfc/residualNumber', { params }),
    /** 经销商 信息保存 && 发起评估 */
    // 发起评估
    apply: params => instanceQuiet.get('/riskmanagement/jzfc/apply', { params }),
    // 重新发起
    reapply: data => instanceQuiet.post('/riskmanagement/jzfc/reapply', data),
    // 保存经销商基础信息
    updateCompanyBasic: data => instanceQuiet.post('/riskmanagement/jzfc/updateCompanyBasic', data),
    // 保存股东列表
    updateCompanyStockholder: data => instanceQuiet.post('/riskmanagement/jzfc/updateCompanyStockholder', data),
    // 解析单个资料
    uploadMaterial: data => instanceQuiet.post('/riskmanagement/jzfc/uploadMaterial', data),
    // 删除单个资料
    deleteMaterial: data => instanceQuiet.post('/riskmanagement/jzfc/deleteMaterial', data),
    // 保存房产列表
    addHouse: data => instanceQuiet.post('/riskmanagement/jzfc/addHouse', data),
    // 单个添加法人、实控人、配偶信息
    addPeronBasic: data => instanceQuiet.post('/riskmanagement/jzfc/addPeronBasic', data),

    /** 解析 */
    // 个人解析
    personCreditReport: (params) => instanceQuiet.get('/riskmanagement/jzfc/personCreditReport', { params }),
    // 企业解析
    companyCreditReport: (params) => instanceQuiet.get('/riskmanagement/jzfc/companyCreditReport', { params }),
    // 银行流水解析
    bankFlow: (params) => instanceQuiet.get('/riskmanagement/jzfc/bankFlow', { params }),
  }
}

export default getApis
