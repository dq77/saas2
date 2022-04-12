const projectApis = (instanceQuiet) => {
  return {
    getProjectTotalInfo: (params) => instanceQuiet.get('/saas-boss/org/v1/boss/project/getProjectCount', { params }),
    getRepayList: (params) => instanceQuiet.get('/partner/repayment/query-page-list', { params }),
    geRepayDetail: (params) => instanceQuiet.get('/partner/repayment/detail-list', { params }),
    // 创建项目
    createProject: (data) => instanceQuiet.post('/saas-boss/org/v1/boss/project/create', data),
    // 编辑项目
    editProject: (data) => instanceQuiet.post('/saas-boss/org/v1/boss/project/update', data),
    // 项目详情列表分页
    getProjectDetailList: params => instanceQuiet.get('/saas-boss/org/v1/boss/projectPayment/page', { params }),
    // 启用或禁用项目
    changeProjectStatus: data => instanceQuiet.post('/saas-boss/org/v1/boss/project/updateStatus', data),
    // 项目相关合同列表
    getContractList: data => instanceQuiet.post('/saas-contract/contract/contract/list', data),
    // 获取组织下的客户列表
    getCustomerList: data => instanceQuiet.post('/saas-boss/customer/getCustomerByPersonForSaaS', data),
    // 查询项目列表接口
    getProjectList: (params) => instanceQuiet.get('/saas-boss/org/v1/boss/project/list', { params }),
    // 查询跟进人列表
    chooseAssignFollower: data => instanceQuiet.post('/saas-boss/org/v1/boss/project/chooseAssignFollower', data),
    // 创建跟进人
    orgprojectmemberCreate: data => instanceQuiet.post('/saas-boss/v1/boss/orgprojectmember/create', data),
    // 操作记录
    getRecord: (params) => instanceQuiet.get('/saas-boss/v1/boss/bossoperatelogs/page', { params }),
  }
}

export default projectApis
