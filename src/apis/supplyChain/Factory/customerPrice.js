const projectApis = (instanceQuiet) => {
  return {
    getCustomerPriceList: (data) => instanceQuiet.post('/saas-boss/org/v1/boss/userPrice/list', data),
    getCustomerPriceProductList: (data) => instanceQuiet.post('/saas-ofc/org/userGoodsPrice/get', data),
    updateCustomerPrice: (data) => instanceQuiet.post('/saas-ofc/org/userGoodsPrice/createUserPrice', data),
  }
}

export default projectApis
