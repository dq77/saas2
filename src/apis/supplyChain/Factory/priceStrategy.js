const priceStrategyApis = (instanceQuiet) => {
  return {
    // 获取价格策略
    getPayCompute: (data) => instanceQuiet.post('/saas-ofc/org/payCompute/query', data),
    // 编辑价格策略
    editPayCompute: (data) => instanceQuiet.post('/saas-ofc/org/payCompute/modify', data),
    // 新增价格策略
    addPayCompute: (data) => instanceQuiet.post('/saas-ofc/org/payCompute/add', data),
    // 获取单个分类详情
    getCategoryDetail: (params) => instanceQuiet.get('/saas-ofc/org/category/get', {params}),
  }
}

export default priceStrategyApis
