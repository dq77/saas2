const getCommonApis = (instanceQuiet) => {
  return {
    // 检测业务规则触发配置
    checkBusinessRules: (params) => instanceQuiet.get('/saas-credit/v1/credit/ruleCheck/checkBusinessRules', { params }),
  }
}

export default getCommonApis
