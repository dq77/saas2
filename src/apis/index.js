import instanceQuiet from '@/utils/request'
import getCommonApis from './common'
// 赊销管家
import getCreditApis from './creditSystem'
// 客户卫士
import getCustomerGuardApis from './customerGuard'
import getFactoryServiceApis from './factoryService'
import getMessageApis from './message'
import getProcessApis from './process'
// 应收管家
import getReceiveApis from './receiveAdmin'
import getRiskApis from './risk'
// 风险专家
import getRiskExpertsApis from './riskExperts'
// 订货大师
// 经销商
import getDealerApis from './supplyChain/Dealer'
// 厂家端
import getFactoryApis from './supplyChain/Factory'

const ajaxStore = {
  common: getCommonApis(instanceQuiet),
  // // 首页
  // home: getHomeApis(instanceQuiet),
  // // 账务
  // account: getAccountApis(instanceQuiet),
  // 流程
  process: getProcessApis(instanceQuiet),
  // 消息
  message: getMessageApis(instanceQuiet),
  // 风险
  risk: getRiskApis(instanceQuiet),
  // 客户卫士
  customer: getCustomerGuardApis(instanceQuiet),
  // 赊销管家
  credit: getCreditApis(instanceQuiet),
  // 订货大师
  factory: getFactoryApis(instanceQuiet),
  dealer: getDealerApis(instanceQuiet),
  // 厂服平台
  factoryService: getFactoryServiceApis(instanceQuiet),
  // 应收管家
  receive: getReceiveApis(instanceQuiet),
  // 风险专家
  riskExperts: getRiskExpertsApis(instanceQuiet)
}

Vue.prototype.$http = ajaxStore

export default ajaxStore
