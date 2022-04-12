const getOverInfoApis = (instanceQuiet) => {
  return {
    // 逾期总额
    getOverdueStaticDataByTime: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getOverdueStaticDataByTime', data),
    // 逾期信息查询列表
    getOverdueAllDataList: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getOverdueAllDataList', data),
  }
}

export default getOverInfoApis
