const getApis = (instanceQuiet) => {
  return {
    // 催收策略配置
    configuration: {
      // 根据还款日类型、催收方式获取整体详情，对应详情页
      getDetail: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/list', data),
      // 获取消息模板options
      getMsgTempateList: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/getMessagesTemplate', data),
      // 获取作用对象options
      getActionObjectList: (params) => instanceQuiet.get('/saas-arm/org/saArmUrgeStrategy/getObjectReference', { params }),
      // 创建模型
      createModel: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/addStrategyModel', data),
      // 修改模型
      modifyModel: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/modifyStrategyModel', data),
      // 修改模型状态
      modifyModelStatus: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/changeModelStrategyStatus', data),
      // 删除策略模型
      delModel: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/deleteStrategyModel', data),
      // 添加时间段
      addTime: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/addTimePhase', data),
      // 添加时间段s
      modifyTime: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/modifyTimePhase', data),
      // 删除时间段
      delTime: (data) => instanceQuiet.post('/saas-arm/org/saArmUrgeStrategy/deleteTimePhase', data),
    },
    // 获取款项类型和付款方式
    // getPayInfo: data => instanceQuiet.post('/saas-arm/org/systemConfiguration/getMenuList', data),
    // 获取应收方案下拉列表
    // getReceiveList: params => instanceQuiet.get('/saas-arm/org/saArmReceivableSolution/list', { params }),
    // 催收概览统计数据
    getCollectionOverviewData: params => instanceQuiet.get('/saas-arm/org/saArmUrgeData/urgeDataOverview', { params }),
    // 催收数据明细分页列表
    getCollectionList: data => instanceQuiet.post('/saas-arm/org/saArmUrgeData/page', data),
    // 获取联系人
    getContractList: data => instanceQuiet.post('/saas-arm/org/armUrgeContracts/getContractList', data),
    // 新增联系人
    createContract: data => instanceQuiet.post('/saas-arm/org/armUrgeContracts/create', data),
    // 新增记录
    createRecord: data => instanceQuiet.post('/saas-arm/org/armUrgeRecords/create', data),
    // 新增阶段回款记录
    createStageReturn: data => instanceQuiet.post('/saas-arm/org/armUrgeStageReturn/create', data),
    // 获取催收数据详情
    getStageReturnDtl: params => instanceQuiet.get('/saas-arm/org/armUrgeStageReturn/get', { params }),
    // 催收联系方式
    getCollectionContactWay: data => instanceQuiet.post('/saas-arm/org/armUrgeContracts/page', data),
    // 应收详情
    getReceivableDetail: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getReceivablePaymentDataView', data),
    // 催收记录
    getCollectionRecords: data => instanceQuiet.post('/saas-arm/org/saArmUrgeData/getUrgeRecords', data),
    // 阶段回款记录
    getCollectionStageReturn: params => instanceQuiet.get('/saas-arm/org/armUrgeStageReturn/page', { params }),
    // 催收数据详情
    getCollectionListDtl: data => instanceQuiet.post('/saas-arm/org/saArmUrgeData/getUrgeDetails', data),
  }
}

export default getApis
