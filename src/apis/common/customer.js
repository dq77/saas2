const getApis = (instanceQuiet) => {
  return {
    // 经销商列表
    getCustomerList: data => instanceQuiet.post('/saas-boss/customer/list', data),
    // 创建经销商
    createCustomer: data => instanceQuiet.post('/saas-boss/customer/create', data),
    // 更新经销商
    updateCustomer: data => instanceQuiet.post('/saas-boss/customer/update', data),
    // 删除经销商
    deleteCustomer: data => instanceQuiet.post('/saas-boss/customer/delete', data),
    // 获取经销商详情
    getCustomerInfo: params => instanceQuiet.get('/saas-boss/customer/get', { params }),
    // 绑定业务员和客服
    bindCustomer: data => instanceQuiet.post('/saas-boss/customer/bind', data),
    getSubAccountList: data => instanceQuiet.post('/saas-boss/member/list', data),
    // 获取客户列表导入记录
    getCustomerRecordList: data => instanceQuiet.post('/saas-boss/customer/excelDetailList', data),
    // 获取等级字典项
    getCustomerLevelEnum: params => instanceQuiet.get('/saas-boss/v1/boss/dict/getList', { params }),
  }
}

export default getApis
