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
  6: '已关闭',
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
  AAA: 'AAA',
  AA: 'AA',
  A: 'A',
  BBB: 'BBB',
  BB: 'BB',
  B: '触发红线',
  0: '生成中'
}
// 风险类型
export const riskType = {
  sfss: '司法诉讼',
  zx: '被执行人',
  xg: '限制高消费',
  sx: '失信被执行人',
  xzcf: '行政处罚',
  jyyc: '经营异常',
  dcdy: '动产抵押'
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

// 省数据
export const provinceData = [
  {
    name: '云南省',
    code: 530000,
    value: 0
  },
  {
    name: '黑龙江省',
    code: 230000,
    value: 0
  },
  {
    name: '贵州省',
    code: 520000,
    value: 0
  },
  {
    name: '北京市',
    code: 110000,
    value: 0
  },
  {
    name: '河北省',
    code: 130000,
    value: 0
  },
  {
    name: '山西省',
    code: 140000,
    value: 0
  },
  {
    name: '吉林省',
    code: 220000,
    value: 0
  },
  {
    name: '宁夏回族自治区',
    code: 640000,
    value: 0
  },
  {
    name: '辽宁省',
    code: 210000,
    value: 0
  },
  {
    name: '海南省',
    code: 460000,
    value: 0
  },
  {
    name: '内蒙古自治区',
    code: 150000,
    value: 0
  },
  {
    name: '天津市',
    code: 120000,
    value: 0
  },
  {
    name: '新疆维吾尔自治区',
    code: 650000,
    value: 0
  },
  {
    name: '上海市',
    code: 310000,
    value: 0
  },
  {
    name: '陕西省',
    code: 610000,
    value: 0
  },
  {
    name: '甘肃省',
    code: 620000,
    value: 0
  },
  {
    name: '安徽省',
    code: 340000,
    value: 0
  },
  {
    name: '香港特别行政区',
    code: 810000,
    value: 0
  },
  {
    name: '广东省',
    code: 440000,
    value: 0
  },
  {
    name: '河南省',
    code: 410000,
    value: 0
  },
  {
    name: '湖南省',
    code: 430000,
    value: 0
  },
  {
    name: '江西省',
    code: 360000,
    value: 0
  },
  {
    name: '四川省',
    code: 510000,
    value: 0
  },
  {
    name: '广西壮族自治区',
    code: 450000,
    value: 0
  },
  {
    name: '江苏省',
    code: 320000,
    value: 0
  },
  {
    name: '澳门特别行政区',
    code: 820000,
    value: 0
  },
  {
    name: '浙江省',
    code: 330000,
    value: 0
  },
  {
    name: '山东省',
    code: 370000,
    value: 0
  },
  {
    name: '青海省',
    code: 630000,
    value: 0
  },
  {
    name: '重庆市',
    code: 500000,
    value: 0
  },
  {
    name: '福建省',
    code: 350000,
    value: 0
  },
  {
    name: '湖北省',
    code: 420000,
    value: 0
  },
  {
    name: '西藏自治区',
    code: 540000,
    value: 0
  },
  {
    name: '台湾省',
    code: 710000,
    value: 0
  }
]

export const provinceShort = {
  云南省: '云南',
  黑龙江省: '黑龙江',
  贵州省: '贵州',
  北京市: '北京',
  河北省: '河北',
  山西省: '山西',
  吉林省: '吉林',
  宁夏回族自治区: '宁夏',
  辽宁省: '辽宁',
  海南省: '海南',
  内蒙古自治区: '内蒙古',
  天津市: '天津',
  新疆维吾尔自治区: '新疆',
  上海市: '上海',
  陕西省: '陕西',
  甘肃省: '甘肃',
  安徽省: '安徽',
  香港特别行政区: '香港',
  广东省: '广东',
  河南省: '河南',
  湖南省: '湖南',
  江西省: '江西',
  四川省: '四川',
  广西壮族自治区: '广西',
  江苏省: '江苏',
  澳门特别行政区: '澳门',
  浙江省: '浙江',
  山东省: '山东',
  青海省: '青海',
  重庆市: '重庆',
  福建省: '福建',
  湖北省: '湖北',
  西藏自治区: '西藏',
  台湾省: '台湾'
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
  localhost: 'https://saas-mobile-testa.qjdchina.com/',
  'saas-mobile-testa.qjdchina.com': 'https://saas-mobile-testa.qjdchina.com/',
  'test-project-factory.qjdidc.com': 'https://test-project-saas-mobile.qjdidc.com/',
  'fuwu-pre.qjdchina.com': 'https://saas-mobile-pre.qjdchina.com/',
  'fuwu-pre2.qjdchina.com': 'https://saas-mobile-pre.qjdchina.com/',
  'fuwu-yanshi.qjdchina.com': 'https://saas-mobile-yanshi.qjdchina.com/',
  'fuwu.qjdchina.com': 'https://saas-mobile.qjdchina.com/',
  'fuwu-beta.qjdchina.com': 'https://saas-mobile-beta.qjdchina.com/',
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
  0: '企业',
  1: '个人'
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
  4: '已驳回',
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

// 客户卫士-精准分层
// 评估等级
export const preciseLevel = {
  A: '(70-100]',
  B: '(55-70]',
  C: '(40-55]',
  D: '(30-40]',
  E: '(0-30]',
}
// 资料是否完整
export const preciseComplete = {
  1: '是',
  2: '否'
}
// 评估状态
export const preciseStatus = {
  0: '未申请',
  1: '申请中',
  2: '退回',
  3: '拒绝',
  4: '通过'
}
