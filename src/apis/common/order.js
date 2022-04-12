const getOrderApis = (instanceQuiet) => {
  return {
    // 获取城市数据
    getCountryList: () => instanceQuiet.get('/partner/common/getCountryList'),
    // 获取物流公司列表
    getLogisticsListEnum: params => instanceQuiet.get('/saas-boss/v1/boss/dict/getList', { params }),
    // 企查查查询开票公司列表
    getCompanyNameListByQCC: params => instanceQuiet.get('/partner/common/qcc/qymh', { params }),
    // 获取签收人的信息列表
    getVerifiedAndAuthorize: data => instanceQuiet.post('/user/common/verified/getVerifiedAndAuthorize', data),
    // 菜单权限
    checkMenuAuth: data => instanceQuiet.post('/saas-boss/user/checkMenuAuth', data),
    // 获取常用联系人和联系方式和地址
    getCommonlyUsedList: (params) => instanceQuiet.get('/saas-ofc/org/order/getCommonlyUsedList', {params}),
  }
}

export default getOrderApis
