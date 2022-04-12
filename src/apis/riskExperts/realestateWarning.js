const getApis = (instanceQuiet) => {
  return {
    // 每周公告
    getWeeklyBulletin: (params) => instanceQuiet.get('/riskmanagement/warn/weeklyBulletin', { params }),
    // 预警信息
    getWarnInfo: data => instanceQuiet.post('/riskmanagement/warn/warnInfo', data),
    // 债券到期
    getBondMaturity: data => instanceQuiet.post('/riskmanagement/warn/bondMaturity', data),
    // 历史公告
    getHistoryWeeklyBulletin: data => instanceQuiet.post('/riskmanagement/warn/historyWeeklyBulletin', data),
    // 黑名单
    getBlacklist: data => instanceQuiet.post('/riskmanagement/warn/blacklist', data),
  }
}

export default getApis
