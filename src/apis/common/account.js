const getAccountApis = (instanceQuiet) => {
  return {
    getAllRoleList: params => instanceQuiet.get('/saas-boss/v1/boss/role/listAll', { params }),
    getOrganTree: params => instanceQuiet.get('/saas-boss/department/getTree', { params }),
    createOrgan: data => instanceQuiet.post('/saas-boss/department/create', data),
    updateOrgan: data => instanceQuiet.post('/saas-boss/department/update', data),
    delOrgan: params => instanceQuiet.get('/saas-boss/department/delete', { params }),
    // 绑定主管
    bindManager: data => instanceQuiet.post('/saas-boss/department/bind', data),
    getAllPermissionListTree: () => instanceQuiet.get('/saas-boss/v1/boss/role/listPermissionsTree'),
    getAccountInfo: params => instanceQuiet.get('/saas-boss/member/getInfo', { params }),
    unBindSubUserWechat: id => instanceQuiet.post(`/saas-boss/member/unbindWechat?id=${id}`, {}),
    getPermissionsByRoleCodes: data => instanceQuiet.post('/saas-boss/v1/boss/role/getPermissionsByRoleCodes', data),
    // 手动同步组织架构  /saas-boss/dingtalk/sync
    setDingUser: (params) => instanceQuiet.get('/saas-boss/dingtalk/sync', { params }),
    // 销区列表带分页 /saas-boss/v1/boss/salesarea/list
    getSaleList: (params) => instanceQuiet.get('/saas-boss/v1/boss/salesarea/list', { params }),
    // 销区列表无分页 /saas-boss/v1/boss/salesarea/getList
    getSaleAll: (params) => instanceQuiet.get('/saas-boss/v1/boss/salesarea/getList', { params }),
    // 添加销区 /saas-boss/v1/boss/salesarea/create
    addSale: (data) => instanceQuiet.post('/saas-boss/v1/boss/salesarea/create', data),
    // 修改销区 /saas-boss/v1/boss/salesarea/update
    changeSale: (data) => instanceQuiet.post('/saas-boss/v1/boss/salesarea/update', data),
    // 删除销区 /saas-boss/v1/boss/salesarea/delete
    deleteSale: (data) => instanceQuiet.post('/saas-boss/v1/boss/salesarea/delete', data),
    // 账号管理
    getSubAccountList: data => instanceQuiet.post('/saas-boss/member/list', data),
    createSubAccount: data => instanceQuiet.post('/saas-boss/member/create', data),
    updateSubAccount: data => instanceQuiet.post('/saas-boss/member/update', data),
    getManagerImportPermissionList: () => instanceQuiet.get('/partner/manager/import/permission/list'),
    getRoleList: params => instanceQuiet.get('/saas-boss/v1/boss/role/list', { params }),
    delRole: data => instanceQuiet.post('/saas-boss/v1/boss/role/delete', data),
    getRoleDetail: params => instanceQuiet.get('/saas-boss/v1/boss/role/get', { params }),
    getMenuTreeList: params => instanceQuiet.get('/saas-boss/v1/boss/role/listPermissionsAndMenuTree', { params }),

    // -获取企业信息
    getCustomerAuth: data => instanceQuiet.post('/user/corp/getCorpAndPersonAndCorpInfo', data),
    // 查看办理人
    getHandlerPerson: params => instanceQuiet.get('/process/process/info', { params }),
    // -发起企业实名流程
    startCorpAuth: data => instanceQuiet.post('/process/process/start', data),
    // 实名人认证短信验证码接口
    getMessageCheck: data => instanceQuiet.post('/saas-contract/contract/authenticate/check', data),
    // 实名认证-各个流程信息查询 processInstanceId
    getProcessInfo: params => instanceQuiet.get('/process/process/info', { params }),
    // 查询个人实名认证
    getProcessStack: params => instanceQuiet.get('/process/task/stack', { params }),
    // 发起个人实名认证
    startPersonAuth: data => instanceQuiet.post('/process/process/start', data),
    // 自然人认证
    processSubmit: data => instanceQuiet.post('/process/task/submit', data),
    // 查看打款进度
    getPaymentStatus: params => instanceQuiet.get('/process/saasCustomerIdentity/transferProcessByCorporationId', { params }),
    // 结束流程
    processDelete: params => instanceQuiet.post(`/process/process/delete/${params.processId}?memberName=${params.memberName}&deleteReason=${params.deleteReason}`),
    // 企查查第三方接口-模糊查询公司关联银行列表
    getSubbranch: params => instanceQuiet.get('/proof/face/subbranch', { params }),
    // 获取组织下员工列表
    getMemberByDepartment: data => instanceQuiet.post('/saas-boss/department/findMemberByDepartment', data),
  }
}

export default getAccountApis
