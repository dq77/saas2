import { assetsBaseUrl } from './config'
/*
* 常用服务的icon配置
* icon 图标文件名
* routeName 点击跳转的路由名字
*/
const enumsServiceTag = {
  data_view_business: { iconName: '业务看板', routeName: 'businessMarket' },
  data_view_risk: { iconName: '风险看板', routeName: 'riskMarket' },
  supply_chain_order: { iconName: '订单管理', routeName: 'orderManage' },
  supply_chain_project: { iconName: '项目管理', routeName: 'projectManege' },
  supply_chain_product: { iconName: '产品管理', routeName: 'productManage' },
  smart_contract: { iconName: '智能合同', routeName: 'contractList' },
  layered_manage: { iconName: '分层管理', routeName: 'sinceritySearch' },
  credit_system_quota: { iconName: '授信管理', routeName: 'quota' },
  credit_system_use_credit: { iconName: '用信管理', routeName: 'useCredit' },
  credit_system_repayment: { iconName: '还款管理', routeName: 'creditRepay' },
  credit_system_config: { iconName: '授信设置', routeName: 'setConfig' },
  risk_radar: { iconName: '舆情雷达', routeName: 'riskRadar' },
  qianjinyan: { iconName: '仟金眼', routeName: 'qjy' },
  real_estate: { iconName: '开发商大盘', routeName: 'realEstateMarket' },
  qjd_white_list: { iconName: '白名单管理', routeName: 'whiteLead' },
  qjd_credit_view: { iconName: '赊销政策总览', routeName: 'quotaMarket' },
  qjd_credit_detail: { iconName: '赊销政策明细', routeName: 'creditSearch' },
  qjd_policy: { iconName: '政策管理', routeName: 'quotaMatchSearch' },
  qjd_order: { iconName: '订单查询', routeName: 'orderSearch' },
  qjd_repayment: { iconName: '履约管理', routeName: 'repaymentList' },
  qjd_loan: { iconName: '支付查询', routeName: 'loanSearch' },
  open_platform_developer: { iconName: '开发者模式', routeName: 'processUpload' },
  credit_system_overview: { iconName: '赊销总览', routeName: 'creditOverview' },
  open_platform_base: {iconName: '开发者模式', routeName: 'processUpload'}
}

for (const key in enumsServiceTag) {
  enumsServiceTag[key].iconUrl = `${assetsBaseUrl}/factoryService/serviceIcons/` + enumsServiceTag[key].iconName + '.jpg'
}

const processEnums = {
  orderProcessVersion: {name: 'orderDetail', keys: ['id', 'processInstanceId']}, // 订单待办流程---兼容老流程，已无用
  orderProcess: {name: 'orderDetail', keys: ['id', 'processInstanceId', 'editFlag']}, // 订单待办流程
  reverseOrderProcess: {name: 'reverseOrderderDetail', keys: ['id']}, // 退货待办流程
  billingProcess: {name: 'billingDetail', keys: ['id']}, // 开票待办流程
  whitelistProcess: {name: 'whiteLead', keys: ['default'], defaultParams: 'search'}, // 白名单待办流程
  uploadConfirmLetter: {name: 'whiteLead', keys: ['default'], defaultParams: 'upload'}, // 白名单上传确认函
  supplementaryAssessRisk: {}, // 赊销精准评估补充资料
  creditAccurateRisk: {}, // 赊销精准评估驳回
}

export { enumsServiceTag, processEnums }
