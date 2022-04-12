const getApis = (instanceQuiet) => {
  return {
    // 当前厂家分配的合同数量
    getContractAmountDetail: data => instanceQuiet.post('/saas-contract/contract/contract/amountDetail', data),
    getContractList: data => instanceQuiet.post('/saas-contract/contract/contract/list', data),
    getContractCreate: data => instanceQuiet.post('/saas-contract/contract/contract/create', data),
    getContractUpdate: data => instanceQuiet.post('/saas-contract/contract/contract/update', data),
    // 实名人认证短信验证码接口
    getMessageCheck: data => instanceQuiet.post('/saas-contract/contract/authenticate/check', data),
    // 企查查企业自动填充
    autoCompanyFill: data => instanceQuiet.post('/saas-contract/contract/authenticate/get', data),
    // 实名认证注册企业
    getVerifiedSaveCorpAndPerson: data => instanceQuiet.post('/user/common/verified/saveCorpAndPerson', data),
    // 实名认证注册个人
    getVerifiedSavePerson: data => instanceQuiet.post('/user/common/verified/savePerson', data),
  }
}

export default getApis
