const projectApis = (instanceQuiet) => {
  return {
    getProjectPriceList: (data) => instanceQuiet.post('/saas-boss/org/v1/boss/projectPrice/list', data),
    getProjectPriceProductList: (data) => instanceQuiet.post('/saas-ofc/org/projectGoodsPrice/get', data),
    updateProjectPrice: (data) => instanceQuiet.post('/saas-ofc/org/projectGoodsPrice/createProjectPrice', data),
  }
}

export default projectApis
