const getWorkSpaceApis = (instanceQuiet) => {
  return {
    // 应收日历
    calendarDetailList: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableCalendarDataView', { params }),
    // 应收任务
    getReceivableTaskDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableTaskDataView', { params }),
    // 应收预警 计划 - 款项
    getBadDebtsByReceivablePlanDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getBadDebtsByReceivablePlanDataView', { params }),
    getBadDebtsByFundTypeDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getBadDebtsByFundTypeDataView', { params }),
    // 应收总览 未到期 - 已到期
    getReceivableNotDueDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableNotDueDataView', { params }),
    getReceivableDueDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableDueDataView', { params }),
    // 应收项目总览 未到期 - 已到期
    getReceivableNotDueDataProView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableNotDueDataProView', { params }),
    getReceivableDueProjectDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableDueProjectDataView', { params }),
    // 其他应收总览 未到期 - 已到期
    getReceivableNotDueDataOtherView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableNotDueDataOtherView', { params }),
    getReceivableDueOtherDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableDueOtherDataView', { params }),
    // 应收排名 项目应收总金额TOP5
    getReceivableProTopFiveDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableProTopFiveDataView', { params }),
    // 应收排名 应收计划总金额TOP 10
    getReceivableTopTenDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableTopTenDataView', { params }),
    // 应收排名 应收计划收款方总金额TOP 10
    getReceivableCustomerTopTenDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableCustomerTopTenDataView', { params }),
    // 应收健康状况 当前逾期金额，天数 排名TOP5
    getReceivableHealthOverdueView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlanItem/getPlanItemInfoByCustomer', { params }),
    // 应收健康状况 近5年应收逾期信息
    getReceivableHealthYearView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlanItem/getPlanItemYearLineChartInfoVO', { params }),
    // 应收健康状况 近12个月逾期信息
    getReceivableHealthMonthView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlanItem/getPlanItemMonthLineChartInfoVO', { params }),
    // 未到期总览 receivableType：0:全部 1:项目回款 2：其他回款， 99：赊销回款
    getNotDueDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableNotDueDataView', { params }),
    // 已到期总览 receivableType：0:全部 1:项目回款 2：其他回款， 99：赊销回款
    getDueDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableDueDataView', { params }),
    // 健康总览
    getHealthDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getReceivableHealthDataView', { params }),
    // 催收还款总览
    getCollectionDataView: params => instanceQuiet.get('/saas-arm/org/saArmRepaymentItem/getOverduePaymentDataView', { params }),
  }
}

export default getWorkSpaceApis
