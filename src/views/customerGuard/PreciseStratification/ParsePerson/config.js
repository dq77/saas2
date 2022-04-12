import { deepCopy } from '@/utils/qjd'
import { toAmountStr, toDateStr } from '@/utils/util'
const renderAmount = (row, item) => item || item === 0 ? toAmountStr(item, 2, true) : '- -'
const renderDate = (row, item) => item ? toDateStr(item, 'yyyy-MM-dd') : '- -'
/** 折叠配置 */
export const collapseColumns = [
  { key: 'base', label: '基础信息' },
  { key: 'account', label: '信贷交易授信及负债信息概要' },
  { key: 'related', label: '相关还款责任信息概要' },
  { key: 'relatedDetail', label: '相关还款责任信息明细' },
  { key: 'default', label: '信贷交易违约信息' },
  { key: 'public', label: '公共信息明细' },
  { key: 'transaction', label: '信贷交易明细' }
]
export const activeCollapse = ['base', 'account', 'related', 'relatedDetail', 'default', 'public', 'transaction']
/** 基础信息 */
export const baseConfig = [
  { label: '报告编号', key: 'reportId' },
  { label: '报告时间', key: 'reportTime', type: 'date' },
  { label: '报告文件', key: 'fileName', type: 'file' },
  { label: '被查询者名称', key: 'name' },
  { label: '被查询者证件类型', key: 'idType' },
  { label: '被查询者证件号码', key: 'idNum' },
  { label: '配偶姓名', key: 'spouseName' },
  { label: '配偶证件类型', key: 'spouseIdType' },
  { label: '配偶证件号码', key: 'spouseIdNum' }
]
/** 信贷交易授信及负债信息概要 */
// 贷款账户
const accountLoanColumn = [
  { label: '账户类型', key: 'accountType' },
  { label: '管理机构数', key: 'manageAgencyNum' },
  { label: '授信总额', key: 'creditAmount', render: renderAmount },
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '最近6个月平均应还数', key: 'last6MonthAverageRepayment', render: renderAmount },
]
// 信用卡账户
const accountCreditCardColumn = [
  { label: '账户类型', key: 'accountType' },
  { label: '发卡机构数', key: 'cardIssuerNum'},
  { label: '账户数', key: 'accountNum' },
  { label: '授信总额', key: 'creditAmount', render: renderAmount },
  { label: '单家机构最高授信额', key: 'singleAgencyMaxCreditAmount', render: renderAmount },
  { label: '已用额度/透支额度', key: 'useAmount', render: renderAmount },
  { label: '最近6个月平均使用/透支额度', key: 'last6MonthAverageUse', render: renderAmount },
]
export const accountConfig = [
  { title: '贷款账户', columns: accountLoanColumn, dataSource: [], key: 'personCreditCreditDebtSummaryLoanList' },
  { title: '信用卡账户', columns: accountCreditCardColumn, dataSource: [], key: 'personCreditCreditDebtSummaryCreditCardList' }
]
/** 相关还款责任信息概要 */
const relatedRepaymentSummaryColumn = [
  { label: '对象', key: 'object' },
  { label: '责任类型', key: 'type'},
  { label: '其他相关还款/担保金额', key: 'otherRelatedRepayment', render: renderAmount },
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '账户数', key: 'accountNum' }
]
export const relatedConfig = [
  { title: '', columns: relatedRepaymentSummaryColumn, dataSource: [], key: 'personCreditRelatedRepaymentSummaryList' }
]
/** 相关还款责任信息明细 */
// export const relatedRepaymentType = {
//   1: '为个人',
//   2: '为企业'
// }
// 账户
const relatedRepaymentAccountColumn = [
  { label: '管理机构', key: 'manageAgency' },
  { label: '业务种类', key: 'businessType'},
  { label: '开立日期', key: 'openDate', render: renderDate },
  { label: '到期日期', key: 'expireDate', render: renderDate },
  { label: '责任人类型', key: 'responsibleType' },
  { label: '还款责任金额', key: 'repaymentLiabilityAmount', render: renderAmount },
  { label: '币种', key: 'currency' },
]
// 截止xxxx年xx月xx日
const relatedRepaymentDateColumn = [
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '五级分类', key: 'fiveClassify'},
  { label: '还款状态', key: 'repaymentStatus' },
]
// 一条配置
const relatedRepaymentDetailColumn = [
  { label: { value: '', key: 'index' }, columns: relatedRepaymentAccountColumn, dataSource: [], key: '' },
  { label: { value: '', key: 'description' }, columns: relatedRepaymentDateColumn, dataSource: [], key: '' }
]
// 多条配置
export const relatedDetailConfig = [
  { title: '为个人', columns: deepCopy(relatedRepaymentDetailColumn), dataSource: [], key: 'personCreditRelatedRepaymentDetailList', type: '1' },
  { title: '为企业', columns: deepCopy(relatedRepaymentDetailColumn), dataSource: [], key: 'personCreditRelatedRepaymentDetailList', type: '2' }
]
/** 信贷交易违约信息 */
// 被追偿信息汇总
const defaultRecoveredColumn = [
  { label: '业务种类', key: 'businessType' },
  { label: '账户数', key: 'accountNum' },
  { label: '余额', key: 'balance', render: renderAmount }
]
// 逾期（透支）信息汇总
const defaultOverdraftColumn = [
  { label: '账户类型', key: 'accountType' },
  { label: '账户数', key: 'accountNum' },
  { label: '月份数', key: 'monthNum' },
  { label: '单笔最高逾期/透支金额', key: 'singleMaxOverdue', render: renderAmount },
  { label: '最长逾期/透支月数', key: 'longestOverdue' },
]
export const defaultConfig = [
  { title: '被追偿信息汇总', columns: defaultRecoveredColumn, dataSource: [], key: 'personCreditRecoveredSummaryList' },
  { title: '逾期（透支）信息汇总', columns: defaultOverdraftColumn, dataSource: [], key: 'personCreditOverdraftSummaryList' }
]
/** 公共信息明细 */
// export const publicType = { // 案件类型
//   1: '民事判决',
//   2: '强制执行记录'
// }
// 民事判决
const publicJudgmentColumn = [
  { label: '立案法院', key: 'court' },
  { label: '案由', key: 'caseReason'},
  { label: '立案日期', key: 'filingDate', render: renderDate },
  { label: '结案方式', key: 'closeWay' },
]
// 强制执行记录
const publicEnforceColumn = [
  { label: '执行法院', key: 'court' },
  { label: '执行案由', key: 'caseReason'},
  { label: '立案日期', key: 'filingDate', render: renderDate },
  { label: '结案方式', key: 'closeWay' }
]
// 机构查询明细
const publicAgencyColumn = [
  { label: '查询日期', key: 'date', render: renderDate },
  { label: '查询机构', key: 'agency'},
  { label: '查询原因', key: 'reason' }
]
export const publicConfig = [
  { title: '民事判决', columns: publicJudgmentColumn, dataSource: [], key: 'civilJudgmentList' },
  { title: '强制执行记录', columns: publicEnforceColumn, dataSource: [], key: 'enforceList' },
  { title: '机构查询明细', columns: publicAgencyColumn, dataSource: [], key: 'personCreditAgencyQueryDetailList' },
]
/** 信贷交易明细 */
// 非循环贷账户 循环贷账户
// -账户
const transactionCycleAccountColumn = [
  { label: '管理机构', key: 'manageAgency' },
  { label: '账户标识', key: 'accountId' },
  { label: '开立日期', key: 'openDate', render: renderDate },
  { label: '到期日期', key: 'expireDate', render: renderDate },
  { label: '借贷金额', key: 'loanAmount', render: renderAmount },
  { label: '业务种类', key: 'businessType'},
  { label: '担保方式', key: 'guaranteeMethod' },
  { label: '还款期数', key: 'repaymentPeriod' },
  { label: '还款方式', key: 'repaymentMethod' },
  { label: '还款频率', key: 'repaymentFrequency' },
  { label: '共同借款标志', key: 'jointLoanSign' },
  { label: '币种', key: 'currency' }
]
// -账户描述：截止xxxx年xx月xx日
export const transactionCycleStatusColumn = [
  { label: '账户状态', key: 'accountStatus' },
  { label: '账户关闭日期', key: 'accountCloseDate', render: renderDate, minWidth: 100 },
  { label: '五级分类', key: 'fiveClassify' },
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '剩余还款期数', key: 'remainingRepaymentPeriod', minWidth: 100 },
  { label: '本月应还款', key: 'repaymentThisMonth', render: renderAmount, minWidth: 100 },
  { label: '应还款日', key: 'repaymentDate' },
  { label: '本月实还款', key: 'actualRepaymentThisMonth', render: renderAmount, minWidth: 100 },
  { label: '最近一次还款日期', key: 'lastRepaymentDate', minWidth: 120 },
  { label: '当前逾期数', key: 'currentOverdueNum', minWidth: 100 },
  { label: '当前逾期总额', key: 'currentOverdueAmount', render: renderAmount, minWidth: 110 },
  { label: '逾期31-60天未还本金', key: 'overdue31To60DayPrincipal', render: renderAmount, minWidth: 140 },
  { label: '逾期61-90天未还本金', key: 'overdue61To90DayPrincipal', render: renderAmount, minWidth: 140 },
  { label: '逾期91-180天未还本金', key: 'overdue91To180DayPrincipal', render: renderAmount, minWidth: 160 },
  { label: '逾期180天以上未还本金', key: 'overdueMoreThan180DayPrincipal', render: renderAmount, minWidth: 160 }
]
// -最新还款记录：xxxx年xx月xx日以后的最新还款记录
// export const transactionCycleNewColumn = [
//   { label: '五级分类', key: 'fiveClassify' },
//   { label: '余额', key: 'balance' },
//   { label: '还款日期', key: 'repaymentDate' },
//   { label: '还款金额', key: 'repaymentAmount'},
//   { label: '当前还款状态', key: 'repaymentStatus' }
// ]
// -还款明细：xxxx年xx月xx日至xxxx年xx月xx日还款明细
export const transactionCycleDetailColumn = [
  { label: '期数', key: 'period' },
  { label: '状态', key: 'status' },
  { label: '还款金额', key: 'amount', render: renderAmount }
]
// -其他情况说明
export const transactionCycleOtherColumn = [
  { label: '特殊交易类型', key: 'specialTradeType' },
  { label: '发生日期', key: 'occurDate', render: renderDate },
  { label: '变更月数', key: 'changeMonth' },
  { label: '发生金额', key: 'changeAmount', render: renderAmount },
  { label: '明细记录', key: 'detailRecord' },
]
export const transactionCycleColumn = [
  { label: { value: '', key: 'index' }, columns: transactionCycleAccountColumn, dataSource: [], key: 'personCreditCreditTradeCycleSummary' },
  { label: { value: '', key: 'a_description' }, columns: transactionCycleStatusColumn, dataSource: [], key: 'personCreditCreditTradeCycleRepaymentStatus' },
  { label: { value: '', key: 'detail' }, columns: transactionCycleDetailColumn, dataSource: [], key: 'personCreditCreditTradeRepaymentDetailList', isVertical: true },
  { label: { value: '其他情况说明', key: 'default' }, columns: transactionCycleOtherColumn, dataSource: [], key: 'personCreditCreditTradeOtherInfo' }
]
// 贷记卡账户 准贷记卡账户
// -账户
export const transactionCardAccountColumn = [
  { label: '发卡机构', key: 'cardIssuer' },
  { label: '账户标识', key: 'accountId' },
  { label: '开立日期', key: 'openDate', render: renderDate },
  { label: '账户授信额度', key: 'accountCreditAmount', render: renderAmount },
  { label: '共享授信额度', key: 'sharedCreditAmount', render: renderAmount },
  { label: '业务种类', key: 'businessType'},
  { label: '担保方式', key: 'guaranteeMethod' },
  { label: '币种', key: 'currency' }
]
// 贷记卡账户-还款状态描述：截止xxxx年xx月xx日
export const transactionCardStatusColumn = [
  { label: '账户状态', key: 'accountStatus' },
  { label: '销户日期', key: 'accountCloseDate', render: renderDate },
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '已用额度', key: 'useAmount', render: renderAmount },
  { label: '未出单的大额专项分期余额', key: 'unissuedBalanceOfLargeSpecialInstalment', render: renderAmount, minWidth: 170 },
  { label: '剩余分期期数', key: 'remainingInstallmentPeriod', minWidth: 120 },
  { label: '最近6个月平均使用额度', key: 'last6MonthAverageUseAmount', render: renderAmount, minWidth: 160 },
  { label: '最大使用额度', key: 'maxUseAmount', render: renderAmount, minWidth: 100 },
  { label: '账单日', key: 'billDate', render: renderDate },
  { label: '本月应还款', key: 'repaymentThisMonth', render: renderAmount, minWidth: 100 },
  { label: '本月实还款', key: 'actualRepaymentThisMonth', render: renderAmount, minWidth: 100 },
  { label: '最近一次还款日期', key: 'lastRepaymentDate', render: renderDate, minWidth: 120 },
  { label: '当前逾期期数', key: 'currentOverdueNum', minWidth: 100 },
  { label: '当前逾期总额', key: 'currentOverdueAmount', render: renderAmount, minWidth: 100 }
]
// 准贷记卡账户-还款状态描述：截止xxxx年xx月xx日
export const transactionQuasiCardStatusColumn = [
  { label: '账户状态', key: 'accountStatus' },
  { label: '销户日期', key: 'accountCloseDate', render: renderDate },
  { label: '透支余额', key: 'useAmount', render: renderAmount },
  { label: '最近6个月平均透支额度', key: 'last6MonthAverageUseAmount', render: renderAmount, minWidth: 160 },
  { label: '最大透支余额', key: 'maxUseAmount', render: renderAmount, minWidth: 120 },
  { label: '账单日', key: 'billDate', render: renderDate },
  { label: '本月实还款', key: 'actualRepaymentThisMonth', render: renderAmount, minWidth: 100 },
  { label: '最近一次还款日期', key: 'lastRepaymentDate', render: renderDate, minWidth: 120 },
  { label: '透支180天以上未付余额', key: 'overdraft180UnpaidAmount', render: renderAmount, minWidth: 160 }
]
// -大额专项分期信息
export const transactionCardLargeColumn = [
  { label: '大额专项分期额度', key: 'largeSpecialInstallmentAmount', render: renderAmount },
  { label: '分期额度生效日期', key: 'installmentAmountEffectiveData', render: renderDate },
  { label: '分期额度到期日期', key: 'installmentAmountDueData', render: renderDate },
  { label: '已用分期金额', key: 'useInstallmentAmount', render: renderAmount }
]
// -还款明细：xxxx年xx月xx日至xxxx年xx月xx日还款明细
export const transactionCardDetailColumn = [
  { label: '期数', key: 'period' },
  { label: '状态', key: 'status' },
  { label: '还款金额', key: 'amount', render: renderAmount }
]
// -其他情况说明
export const transactionCardOtherColumn = [
  { label: '特殊交易类型', key: 'specialTradeType' },
  { label: '发生日期', key: 'occurDate', render: renderDate },
  { label: '变更月数', key: 'changeMonth' },
  { label: '发生金额', key: 'changeAmount', render: renderAmount },
  { label: '明细记录', key: 'detailRecord' },
]
// 贷记卡账户配置
export const transactionCardColumn = [
  { label: { value: '', key: 'index' }, columns: transactionCardAccountColumn, dataSource: [], key: 'personCreditCreditTradeCreditCardSummary' },
  { label: { value: '', key: 'r_description' }, columns: transactionCardStatusColumn, dataSource: [], key: 'personCreditCreditTradeCreditCardRepaymentStatus' },
  { label: { value: '大额专项分期信息', key: 'default' }, columns: transactionCardLargeColumn, dataSource: [], key: 'personCreditCreditTradeCreditCardLargeSpecial' },
  { label: { value: '', key: 'detail' }, columns: transactionCardDetailColumn, dataSource: [], key: 'personCreditCreditTradeRepaymentDetailList', isVertical: true },
  { label: { value: '其他情况说明', key: 'default' }, columns: transactionCardOtherColumn, dataSource: [], key: 'personCreditCreditTradeOtherInfo' }
]
// 准贷记卡账户配置
export const transactionQuasiCardColumn = [
  { label: { value: '', key: 'index' }, columns: transactionCycleAccountColumn, dataSource: [], key: 'personCreditCreditTradeCreditCardSummary' },
  { label: { value: '', key: 'r_description' }, columns: transactionQuasiCardStatusColumn, dataSource: [], key: 'personCreditCreditTradeCreditCardRepaymentStatus' },
  { label: { value: '', key: 'detail' }, columns: transactionCycleDetailColumn, dataSource: [], key: 'personCreditCreditTradeRepaymentDetailList', isVertical: true },
  { label: { value: '其他情况说明', key: 'default' }, columns: transactionCycleOtherColumn, dataSource: [], key: 'personCreditCreditTradeOtherInfo' }
]
export const transactionConfig = [
  { title: '非循环贷账户', columns: deepCopy(transactionCycleColumn), dataSource: [], key: 'acyclicCreditVOList' },
  { title: '循环贷账户', columns: deepCopy(transactionCycleColumn), dataSource: [], key: 'cycleCreditVOList' },
  { title: '贷记卡账户', columns: deepCopy(transactionCardColumn), dataSource: [], key: 'creditCardVOList' },
  { title: '准贷记卡账户', columns: deepCopy(transactionQuasiCardColumn), dataSource: [], key: 'quasiCreditCardVOList' },
]
