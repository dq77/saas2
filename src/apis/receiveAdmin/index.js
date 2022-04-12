// 操作i指引
import getGuideApis from './guide'
// 应收工作台
import getWorkSpaceApis from './workSpace'
// 添加计划
import getAddPlainApis from './addPlain'
// 添加款项
import getAddPayApis from './addPay'
// 应收信息查询
import getInfoSearchApis from './infoSearch'
// 应收系统配置
import getSystemConfigApis from './systemConfig'
// 企业应收查询
import getComInfoApis from './comInfo'
// 催收策略
import getCollectionApis from './collection'
// 款项信息查询
import getPayInfoApis from './payInfo'
// 收款信息查询
import getReceiveInfoApis from './receiveInfo'
// 逾期信息查询
import getOverInfoApis from './overInfo'

// 应收
const getReceiveApis = (instanceQuiet) => {
  return {
    ...getGuideApis(instanceQuiet),
    ...getWorkSpaceApis(instanceQuiet),
    ...getAddPlainApis(instanceQuiet),
    ...getAddPayApis(instanceQuiet),
    ...getInfoSearchApis(instanceQuiet),
    ...getSystemConfigApis(instanceQuiet),
    ...getComInfoApis(instanceQuiet),
    ...getCollectionApis(instanceQuiet),
    ...getPayInfoApis(instanceQuiet),
    ...getReceiveInfoApis(instanceQuiet),
    ...getOverInfoApis(instanceQuiet)
  }
}

export default getReceiveApis
