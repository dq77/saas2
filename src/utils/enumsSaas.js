// 赊销状态
export const creditStatus = {
  DONE: '生效',
  INVALID: '失效'
}
// 授信状态
export const creditStatusAll = {
  in_credit: '授信中',
  cancelled: '已取消',
  rejected: '已驳回',
  credit_granted: '已授信',
  expired: '已过期',
  invalidation: '已失效'
}

// 经销商状态
export const creditUsing = {
  1: '已赊销经销商',
  0: '未赊销经销商'
}
// 订单状态
export const orderStatus = {
  0: '待确认',
  1: '待复核',
  2: '已下单',
  3: '订单驳回',
  4: '已付款',
}
// 支付状态
export const payStatus = {
  TODO: '待支付货款',
  CHECKING: '审批中',
  REJECTED: '审批未通过',
  RELAUNCHED: '已重新发起',
  DONE: '已支付货款',
  REPAYMENT_DONE: '还款已完成'
}

// 账号状态
export const accountStatus = {
  0: '生效中',
  1: '冻结中'
}

// 还款状态
export const repayStatus = {
  1: '待还款',
  2: '已还款',
  // 3: '已逾期',
  4: '部分还款'
}

// 逾期状态
export const overdueStatus = {
  1: '正常',
  2: '已逾期',
}

// 仟金顶状态
export const qjdStatus = {
  0: '未注册',
  1: '未实名',
  2: '已实名'
}

// 额度状态
export const qjdCreditStatus = {
  // TODO: '未审批',
  // PROCESS: '审批中',
  // REJECT: '审批不通过',
  // DONE: '审批通过',
  // INVALID: '失效',
  // SLEEP: '休眠',
  1: '正常',
  2: '失效',
  3: '作废',
}

// 诚信等级
export const modelCreditGrade = {
  B: '触发红线',
  BB: 'BB',
  BBB: 'BBB',
  A: 'A',
  AA: 'AA',
  AAA: 'AAA',
}

// 异常类型
export const abnormalType = {
  信息系统服务费违约: '信息系统服务费违约',
  赊销货款违约: '赊销货款违约'
}

// 当前还款状态
export const currentRepaymentStatus = {
  未完成: '未完成',
  完成: '完成'
}

// 批量任务状态
export const jobStatus = {
  0: '上传文件生成完成',
  1: '上传文件正在生成中'
}

// 额度匹配批量任务状态
export const quotaJobStatus = {
  0: '上传文件正在生成中',
  1: '上传文件生成完成'
}

// 授信类型
export const creditTypeObj = {
  project_credit: '项目授信',
  dealer_credit: '经销商授信',
}

export const creditTypes = [
  {
    label: '厂家渠道类',
    options: [
      { label: '项目授信', value: 'project_credit' },
      { label: '经销商授信', value: 'dealer_credit' },
      { label: '直签授信', value: 'direct_sign_credit' },
      { label: '临时授信', value: 'temporary_credit' }
    ]
  }, {
    label: '直签业务类',
    options: [
      { label: '直签使用授信', value: 'direct_sign_use_credit' },
    ]
  }
]

// 授信项目类型
export const creditProjectObj = {
  retail_project: '零售项目',
  engineering_project: '工程项目',
}

// 实名认证状态
export const authStatus = {
  0: '未认证',
  1: '认证中',
  2: '认证成功',
  3: '认证失败',
  4: '认证失效',
}
// 实名认证方式
export const authType = {
  QCC: '企查查',
  CORPFACE: '人脸识别',
  CORPPAY: '对公打款',
  0: '人脸识别',
  1: '对公打款',
  PERSONFOUR: '银行卡四要素',
}
// 个人实名认证方式
export const authPersonType = {
  0: '银行卡四要素'
}
// 实名认证方式
export const agentStatus = {
  SIGN_FAILURE: '签署失败',
  SIGN: '待签署',
  DO: '已签署',
  OVER: '已失效',
}
// 合同签约状态
// -1,作废;0.失效;1,拟定中;2.审批中;3.待签约;4.审批未通过;5.签约中,6.签约成功,7.存证中,10,签约失败',
export const contractStatus = {
  '-1': '作废',
  0: '失效',
  1: '拟定中',
  2: '审批中',
  3: '待签约',
  4: '审批未通过',
  5: '签约中',
  6: '签约成功',
  7: '存证中',
  10: '签约失败'
}

export const roleCategoryMap = {
  1: '用户中心',
  2: '客户中心'
}

export const roleStatusMap = {
  1: '启用',
  0: '禁用'
}

export const dataAuthorityTypeMap = {
  1: '全部',
  2: '仅自己',
  3: '自己/下属部门',
  4: '自己/下属部门/未分配'
}

// 业务类型
export const businessType = {
  engineering_project: '工程',
  retail_project: '零售',
}
// saas 订单状态  0-待审核 1-已审核 2-进行中 3-订单关闭 4-订单取消 5-订单完结,
export const saasOrderStatus = {
  0: '待审核',
  1: '已审核',
  2: '进行中',
  3: '已关闭',
  4: '已取消',
  5: '已完成',
}
// 开票流程 --- 开票状态
export const billStatus = {
  1: '开票中',
  2: '已开票',
  3: '已关闭',
}
// 开票流程 --- 发票类型
export const invoiceTypes = {
  1: '纸质发票',
  2: '电子发票',
}
// 对应手机端域名转换
export const toMobileUrl = {
  localhost: 'https://test-project-saas-mobile.qjdidc.com/',
  'test-project-factory.qjdidc.com': 'https://test-project-saas-mobile.qjdidc.com/',
  'fuwu-pre.qjdchina.com': 'https://saas-mobile-pre.qjdchina.com/',
  'fuwu-pre2.qjdchina.com': 'https://saas-mobile-pre.qjdchina.com/',
  'fuwu.qjdchina.com': 'https://saas-mobile.qjdchina.com/'
}

// 经销商创建方式
export const customerCreateTypeMap = {
  1: '人工创建',
  2: '系统同步'
}

// 经销商状态
export const customerStatusMap = {
  0: '启用',
  1: '不启用'
}

// 经销商类型
export const customerTypeMap = {
  0: '经销商',
  1: '自然人'
}

// 经销商会员等级
export const customerLevelMap = {
  1: 'S',
  2: 'AAA',
  3: 'AA',
  4: 'A',
  5: 'C',
}

// 数据权限
export const roleAuthorityTypeMap = {
  1: '全部',
  2: '自身和下级'
}

// 开发商大盘 我的报告 申请状态
export const applyStatusMap = {
  DOING: '评估中',
  DONE: '已完成',
  CANCAL: '已取消',
  REJECT: '驳回申请',
}
// 开发商评估报告-股东性质
export const shareholderType = {
  1: '上市公司',
  2: '普通公司',
}
// 开发商评估报告-项目方类型
export const projectPartyType = {
  1: '直签项目',
  2: '总包项目',
  3: '挂靠项目',
}
// 开发商评估报告-项目类型
export const projectType = {
  1: '居住建筑',
  2: '市政建筑',
  3: '企事业建筑',
  4: '商业娱乐建筑',
  5: '生产性建筑',
}
// 开发商评估报告-评估状态
export const projectStatus = {
  0: '草稿',
  1: '评估中',
  2: '已取消',
  3: '已完成',
}
// 司法诉讼-身份
export const identity = {
  0: '全部',
  1: '原告',
  2: '被告',
  3: '其他'
}
// 客户批量导入 任务状态
export const taskStatus = {
  0: '导入中',
  1: '导入成功',
  2: '导入失败'
}
// 成熟度
export const maturity = {
  '-1': '无',
  1: '客户暂不配合、意愿未定',
  2: '获取KP联系人及联系方式',
  3: '客户认可有意愿',
  4: '客户有需求',
  5: '确认授信额度申请意向',
  6: '申请资料准备',
  7: '收到客户申请资料',
  8: '授信额度申请审核通过',
  9: '项目准入中',
  10: '资料准备',
  11: '下单',
  12: '签约',
  13: '支付货款',
  14: '还款',
  15: '开票'
}
// 意向程度
export const intentionDegree = {
  '-1': '无',
  0: 'S0：新客户，未接通',
  1: 'S1：确定授信额度申请意向，资料已收到',
  2: 'S2：确定授信额度申请意向，7天内提供资料',
  3: 'S3+：确定授信额度申请意向，15天内提供资料',
  4: 'S3：客户认可，且有意愿需要再次跟进',
  5: 'S4：客户认可，但暂无需求',
  6: 'S5：客户不认可/毁单',
  7: 'S6：不准入'
}
// 项目股东性质
export const projectShareholderType = {
  1: '国企',
  2: '央企',
  3: '事业企',
  4: '知名非上市公司',
  5: '上市公司',
  6: '普通企业'
}
// 项目来源
export const projectSourceType = {
  1: '仟金顶',
  2: '厂家'
}
// 项目公司类型
export const projectPartnerType = {
  1: '项目公司',
  2: '总包公司',
  3: '挂靠公司'
}
// 付款节点
export const paymentNodeType = {
  1: '预付款',
  2: '货到款',
  3: '验收款',
  4: '质保金'
}
// 付款方式
export const paymentWayType = {
  1: '现金',
  2: '银票',
  3: '商票',
  4: '以房抵票'
}
// 下单方式
export const placeOrderType = {
  0: '代客下单',
  1: '自主下单',
}

// 物流包裹状态
export const receiptStatusObj = {
  '-1': '待发货',
  0: '待签收',
  1: '已签收',
  2: '开票中',
  3: '已开票',
  99: '已关闭',
}

// 采购方式
export const purchaseTypeMode = {
  1: '工程业务',
  2: '零售业务',
}

// 订货大师-财务管理：结算方式
export const settlementTypes = {
  1: '银行转账',
  2: '现金'
}

// 订货大师-财务管理：账户类型
export const accountType = {
  0: '基本账户',
  1: '自定义账户'
}
// 订货大师-财务管理：账户类型状态
export const accountTypeStatus = {
  0: '未开通',
  1: '启用',
  2: '停用',
}
// 订货大师-财务管理：余额不足时下单规则
export const accountOrderRule = {
  1: '允许下单',
  2: '不允许下单',
  3: '使用基本账户付款',
}
// 订货大师-财务管理：产品标签状态
export const productSignStatus = {
  1: '启用',
  2: '停用'
}

// 订货大师-财务管理：入账的账单状态
export const enterAccountBillStatus = {
  0: '待入账',
  1: '已入账',
  2: '已关闭'
}

// 订货大师-财务管理：出账的账单状态
export const expenseAccountBillStatus = {
  0: '待出账',
  1: '已出账',
  2: '已关闭'
}

// 订货大师-财务管理：账户明细的业务类型
export const accountBusinessType = {
  1: '账户入账',
  2: '账户出账',
  3: '账户付款',
  4: '账户退款'
}

// 订货大师-财务管理：账户明细的单据类型
export const accountInvoiceType = {
  1: '入账单',
  2: '出账单',
  3: '付款单',
  4: '退款单'
}

// 订货大师-财务管理：应收账单的状态
export const receivableStatus = {
  0: '待核销',
  1: '已核销',
}
// 订货大师-财务管理：应收的业务类型
export const receivableBusinessType = {
  1: '销售发货',
  2: '销售收款',
  3: '销售退货',
  4: '销售退款'
}
// 订货大师-财务管理：应收的单据类型
export const receivableInvoiceType = {
  1: '应收账单', // 应收
  2: '收款单', // 实收
}
// 订货大师-财务管理：应收对账单的状态
export const accountCheckStatus = {
  0: '未对账',
  1: '已对账',
  2: '有异议',
}

// 仓库 - 入库状态
export const whInStatus = {
  1: '待确认',
  2: '已确认',
  3: '已关闭',
}
// 仓库 - 入库类型
export const whStorageType = {
  11: '手动入库', // 新增
  12: '销售退货',
  13: '调拨入库',
  14: '盘盈入库',
  // 15: '采购入库',
  // 16: '生产入库',
  // 20: '其他入库',
}
// 仓库 - 出库类型
export const whOutboundType = {
  21: '手动出库', // 新增
  23: '销售出库',
  22: '调拨出库',
  27: '其他出库',
  24: '盘亏出库',
}
// 催收策略-比较符号
export const compareSymbol = {
  '=': '=',
  '>': '>',
  '>=': '>=',
  '<': '<',
  '<=': '<=',
}

// 催收策略-触发渠道
export const collectionChannel = {
  SMS: '短信',
  EMAIL: '邮件',
  DING_DING: '钉钉',
  WE_CHAT: '微信',
}
