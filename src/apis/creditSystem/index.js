// 操作指引
import getGuideApis from './guide'
// 授信设置
import getSaleConfigApis from './saleConfig'
// 还款周期设置
import getPayCycle from './payCycle'
// 授信管理
import getQuotaApis from './quota'
// 用信列表
import getUseCreditApis from './useCredit'
// 还款列表
import getRepayApis from './rePay'
// 还款操作
import getOperateApis from './operate'
// 赊销总览
import getOverview from './overview'
// 公共
import getCommonApis from './common'

const getCreditApis = (instanceQuiet) => {
  return {
    ...getGuideApis(instanceQuiet),
    ...getSaleConfigApis(instanceQuiet),
    ...getPayCycle(instanceQuiet),
    ...getQuotaApis(instanceQuiet),
    ...getUseCreditApis(instanceQuiet),
    ...getRepayApis(instanceQuiet),
    ...getOperateApis(instanceQuiet),
    ...getOverview(instanceQuiet),
    ...getCommonApis(instanceQuiet)
  }
}

export default getCreditApis
