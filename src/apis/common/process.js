const getApis = (instanceQuiet) => {
  return {
    // 获取待办列表
    getBackLogList: data => instanceQuiet.post('/saas-flow/task/list', data),
    // 获取办结列表
    getHandleEndList: data =>
      instanceQuiet.post('/saas-flow/task/handledList', data),
    // 获取流程上传管理列表
    getUploadList: params =>
      instanceQuiet.get('/saas-flow/deployment/list', { params }),
    // 获取审批单详情
    getApprovalDetail: params =>
      instanceQuiet.get('/saas-flow/task/info', { params }),
    // 获取审批单节点列表
    getApprovalNodes: params =>
      instanceQuiet.get('/saas-flow/task/stack', { params }),
    // 审批流程提交
    submitProcess: data => instanceQuiet.post('/saas-flow/task/submit', data)
  }
}

export default getApis
