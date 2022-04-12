const getProcessApis = (instanceQuiet) => {
  return {
    // 获取待办列表
    getBackLogList: data => instanceQuiet.post('/saas-flow/task/list', data),
    getHandleEndList: data => instanceQuiet.post('/saas-flow/task/handledList', data),
    // 审批流程配置-菜单查询
    getWorkflowProcessMenu: params => instanceQuiet.get('/saas-boss/org/v1/boss/workflow/getWorkflowBusiness', { params }),
    // 审批流程配置-节点通过后操作列表
    getWorkflowConfigTaskEvent: params => instanceQuiet.get('/saas-boss/org/v1/boss/workflow/getWorkflowConfigTaskEvent', { params }),
    // 审批流程配置-节点驳回后操作列表
    getWorkflowConfigEndEvent: params => instanceQuiet.get('/saas-boss/org/v1/boss/workflow/getWorkflowConfigEndEvent', { params }),
    // 审批流程配置-获取员工列表
    getMemberList: params => instanceQuiet.get('/saas-boss/member/getMemberList', { params }),
    // 审批流程配置-获取角色列表
    getRoleList: params => instanceQuiet.get('/saas-boss/v1/boss/role/listAll', { params }),
    // 审批流程配置-配置详情
    getWorkflowData: params => instanceQuiet.get('/saas-boss/org/v1/boss/workflow/getWorkflowSimpleData', { params }),
    // 创建流程
    createWorkflow: data => instanceQuiet.post('/saas-boss/org/v1/boss/workflow/create', data),
    // 编辑流程
    editWorkflow: data => instanceQuiet.post('/saas-boss/org/v1/boss/workflow/update', data),
    // 获取流程事件说明
    getWorkflowTips: params => instanceQuiet.get('/saas-boss/org/v1/boss/workflow/getWorkflowConfigEventContext', { params }),
    // 禁用流程
    disableWorkflow: data => instanceQuiet.post('/saas-boss/org/v1/boss/workflow/disable', data),
    // 启用流程
    enableWorkflow: data => instanceQuiet.post('/saas-boss/org/v1/boss/workflow/enable', data),
    publishWorkflow: data => instanceQuiet.post('/saas-boss/org/v1/boss/workflow/createWorkflowBpmnData', data)
  }
}

export default getProcessApis
