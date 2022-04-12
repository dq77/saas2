const commonApis = (instanceQuiet) => {
  return {
    // 获取城市数据
    getCountryList: () => instanceQuiet.get('/partner/common/getCountryList'),
    // 获取物流公司列表
    getLogisticsListEnum: params => instanceQuiet.get('/saas-boss/v1/boss/dict/getList', { params }),
    // 切换租户，写入cookie
    switchTenant: (data) => instanceQuiet.post('/partner/user/switchTenant', data),
    // 获取当前租户下，用户的身份信息。本身应该在调用/partner/user/switchTenant接口时包含这个返回结果
    getUserInfoInTenant: params => instanceQuiet.get('/saas-boss/biz/customer/get', { params }),
    // 企查查查询开票公司列表
    getCompanyNameListByQCC: params => instanceQuiet.get('/partner/common/qcc/qymh', { params }),
  }
}

export default commonApis
