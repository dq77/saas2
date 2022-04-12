import { toAmountStr, toDateStr } from '@/utils/util'
// 方法
const renderAmount = (row, item) => item || item === 0 ? toAmountStr(item, 2, true) : '- -'
const renderDate = (row, item) => item ? toDateStr(item, 'yyyy-MM-dd') : '- -'
/** 折叠配置 */
export const collapseColumns = [
  { key: 'base', label: '报告信息' },
  { key: 'credit', label: '信贷记录概要' },
  { key: 'open', label: '未结清信贷及授信信息概要' },
  { key: 'repayment', label: '相关还款责任信息概要' },
  { key: 'debt', label: '负债历史' },
  { key: 'public', label: '公共记录明细' },
  { key: 'repaymentDetail', label: '信贷记录明细' },
]
export const activeCollapse = ['base', 'credit', 'open', 'repayment', 'debt', 'public', 'repaymentDetail']
/** 报告信息 */
export const baseConfig = [
  { label: '企业名称', key: 'companyName' },
  { label: '中征码', key: 'strikeCode' },
  { label: '流水文件', key: 'fileName', type: 'file' },
  { label: '查询机构', key: 'queryAgency' },
  { label: '报告时间', key: 'reportTime', type: 'date' }
]
/** 信贷记录概要 */
// 信贷交易概要
const creditTradeColumn = [
  { label: '业务类型', key: 'businessType' },
  { label: '总余额', key: 'totalBalance', render: renderAmount },
  { label: '被迫追偿余额', key: 'recoveredBalance', render: renderAmount },
  { label: '关注类余额', key: 'concernedBalance', render: renderAmount },
  { label: '不良类余额', key: 'badBalance', render: renderAmount }
]
// 非信贷交易概要
const unCreditTradeColumn = [
  { label: '非信贷交易账户数', key: 'nonCreditTradeAccountNum' },
  { label: '欠税记录条数', key: 'taxRecordNum'},
  { label: '民事判决记录条数', key: 'civilJudgmentRecordNum' },
  { label: '强制执行记录条数', key: 'enforceRecordNum' },
  { label: '行政处罚记录条数', key: 'administrativePunishmentRecordNum' }
]
export const creditConfig = [
  { title: '信贷交易概要', columns: creditTradeColumn, dataSource: [], key: 'companyCreditCreditRecordSummaryList' },
  { title: '非信贷交易概要', columns: unCreditTradeColumn, dataSource: [], key: 'companyCreditNonCreditRecordSummaryList' }
]
/** 未结清信贷及授信信息概要 */
// 未结清资产
const openAssetsColumn = [
  { label: '业务类型', key: 'businessType' },
  { label: '账户数', key: 'accountNum'},
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '最近一次处置/结清日期', key: 'cleared', render: renderDate }
]
// 未结清逾期
const openOverdueColumn = [
  { label: '业务类型', key: 'businessType' },
  { label: '本金', key: 'principal'},
  { label: '利息及其他', key: 'interestAndOther', render: renderAmount },
  { label: '总额', key: 'total_amount', render: renderAmount }
]
// 未结清贷款交易
const openTradeColumn = [
  { label: '业务类型', key: 'businessType' },
  { label: '正常类账户数', key: 'normalAccountNum'},
  { label: '正常类账余额', key: 'normalAccountBalance', render: renderAmount },
  { label: '关注类账户数', key: 'concernedAccountNum' },
  { label: '关注类账余额', key: 'concernedAccountBalance', render: renderAmount },
  { label: '不良类账户数', key: 'badAccountNum' },
  { label: '不良类余额', key: 'badAccountBalance', render: renderAmount },
  { label: '合计账户数', key: 'totalAccountNum' },
  { label: '合计余额', key: 'totalAccountBalance', render: renderAmount },
]
// 未结清票据交易
const openBillColumn = openTradeColumn
// 未结清担保交易
const openSecuredColumn = openTradeColumn
export const openConfig = [
  { title: '未结清资产', columns: openAssetsColumn, dataSource: [], key: 'companyCreditUnclearedCreditSummaryAssetsList' },
  { title: '未结清逾期', columns: openOverdueColumn, dataSource: [], key: 'companyCreditUnclearedCreditSummaryOverdueList' },
  { title: '未结清贷款交易', columns: openTradeColumn, dataSource: [], key: 'companyCreditUnclearedCreditSummaryLoanTradeList' },
  { title: '未结清票据交易', columns: openBillColumn, dataSource: [], key: 'companyCreditUnclearedCreditSummaryTicketTradeList' },
  { title: '未结清担保交易', columns: openSecuredColumn, dataSource: [], key: 'companyCreditUnclearedCreditSummaryGuaranteeTradeList' }
]
/** 相关还款责任信息概要 */
// 被迫偿业务
const repaymentForcedColumn = [
  { label: '责任类型', key: 'recoveredBusiness' },
  { label: '还款责任金额', key: 'repaymentLiabilityAmount' },
  { label: '账户数', key: 'accountNum' },
  { label: '余额', key: 'balance', render: renderAmount }
]
// 其他借贷交易
const repaymentOtherColumn = [
  { label: '责任类型', key: 'recoveredBusiness' },
  { label: '还款责任金额', key: 'repaymentLiabilityAmount' },
  { label: '账户数', key: 'accountNum' },
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '关注类账余额', key: 'concernedAccountBalance', render: (row, item) => renderAmount(row, item) },
  { label: '不良类账余额', key: 'badAccountBalance', render: (row, item) => renderAmount(row, item) }
]
export const repaymentConfig = [
  { title: '被追偿业务', columns: repaymentForcedColumn, dataSource: [], key: 'companyCreditRelatedRepaymentSummaryList', type: '被追偿业务' },
  { title: '其他借贷交易', columns: repaymentOtherColumn, dataSource: [], key: 'companyCreditRelatedRepaymentSummaryList', type: '其他借贷交易' }
]
/** 负债历史 */
// 全部负债
const debtAllColumn = [
  { label: '期数', key: 'period' },
  { label: '账户数', key: 'accountNum' },
  { label: '余额', key: 'balance', render: (row, item) => renderAmount(row, item) }
]
// 关注类负债
const debtFocusColumn = debtAllColumn
// 不良类负债
const debtBadColumn = debtAllColumn
// 逾期类负债
const debtOverdueColumn = [
  { label: '期数', key: 'period' },
  { label: '逾期账户数', key: 'accountNum' },
  { label: '逾期总额', key: 'balance', render: (row, item) => renderAmount(row, item) },
  { label: '本金逾期账户数', key: 'overduePrincipalAccountNum' },
  { label: '本金逾期', key: 'overduePrincipal' },
]
export const debtConfig = [
  { title: '全部负债', columns: debtAllColumn, dataSource: [], key: 'companyCreditDebtHistoryList', type: '全部负债' },
  { title: '关注类负债', columns: debtFocusColumn, dataSource: [], key: 'companyCreditDebtHistoryList', type: '关注类负债' },
  { title: '不良类负债', columns: debtBadColumn, dataSource: [], key: 'companyCreditDebtHistoryList', type: '不良类负债' },
  { title: '逾期类负债', columns: debtOverdueColumn, dataSource: [], key: 'companyCreditDebtHistoryList', type: '逾期类负债' }
]
/** 公共记录明细 */
// 民事判决记录
const publicCivilColumn = [
  { label: '立案法院', key: 'court' },
  { label: '案由', key: 'caseReason'},
  { label: '立案日期', key: 'filingDate', render: renderDate },
  { label: '结案方式', key: 'closeWay' }
]
// 强制执行记录
const publicMandatoryColumn = publicCivilColumn
// 欠税记录
const publicOwnColumn = [
  { label: '主管税务机关', key: 'reportType' },
  { label: '欠税总额（元）', key: 'taxAuthority', render: renderAmount },
  { label: '欠税统计日期', key: 'taxOwedTotalStatisticsDate', render: renderDate }
]
// 行政处罚记录
const publicAdministrativeColumn = [
  { label: '处罚决定书文号', key: 'penaltyDecisionDocNum' },
  { label: '处罚机构', key: 'punishmentAgency'},
  { label: '违法行为', key: 'illegalBehavior' },
  { label: '处罚决定', key: 'penaltyDecision' },
  { label: '处罚日期', key: 'penaltyDate', render: renderDate },
  { label: '处罚金额（元）', key: 'penaltyAmount', render: renderAmount }
]
export const publicConfig = [
  { title: '民事判决记录', columns: publicCivilColumn, dataSource: [], key: 'enforceList' },
  { title: '强制执行记录', columns: publicMandatoryColumn, dataSource: [], key: 'enforceList' },
  { title: '欠税记录', columns: publicOwnColumn, dataSource: [], key: 'commonCreditTaxArrearsList' },
  { title: '行政处罚记录', columns: publicAdministrativeColumn, dataSource: [], key: 'commonCreditAdministrativePunishmentList' },
]
/** 借贷记录 */
// 被迫偿业务
const RDForcedColumn = [
  { label: '账户编号', key: 'accountNum', minWidth: 180 },
  { label: '债权机构', key: 'creditor'},
  { label: '业务种类', key: 'businessType' },
  { label: '借款金额', key: 'loanAmount', render: renderAmount, minWidth: 110 },
  { label: '余额', key: 'balance', render: renderAmount, minWidth: 110 },
  { label: '关闭日期', key: 'closeDate', render: renderDate },
  { label: '五级分类', key: 'fiveClassify' },
  { label: '最近一次还款日期', key: 'lastRepaymentDate', render: renderDate, minWidth: 130 },
  { label: '最近一次还款总额', key: 'lastRepaymentAmount', render: renderAmount, minWidth: 130 },
  { label: '最近一次还款形式', key: 'lastRepaymentForm', minWidth: 130 },
  { label: '初始债权人名称', key: 'initialCreditor', minWidth: 120 },
  { label: '信息报告日期', key: 'infoReportDate', render: renderDate, minWidth: 110 }
]
// 未结清借贷-欠息
const RDInterestColumn = [
  { label: '授权机构', key: 'creditAgency' },
  { label: '欠息类型', key: 'type'},
  { label: '币种', key: 'currency' },
  { label: '欠息余额', key: 'balance' },
  { label: '余额变化日期', key: 'balanceChangeDate', render: renderDate },
  { label: '信息报告日期', key: 'infoReportDate', render: renderDate }
]
// 未结清借贷-中长期借贷
const RDLongColumn = [
  { label: '账户编号', key: 'accountNum', minWidth: 180 },
  { label: '授信机构', key: 'creditAgency', minWidth: 160 },
  { label: '业务种类', key: 'businessType' },
  { label: '开立日期', key: 'openDate', render: renderDate, minWidth: 90 },
  { label: '到期日', key: 'expireDate', render: renderDate, minWidth: 90 },
  { label: '借据金额', key: 'loanAmount', render: renderAmount, minWidth: 110 },
  { label: '发放形式', key: 'distributionForm' },
  { label: '担保形式', key: 'guaranteeForm', minWidth: 100 },
  { label: '余额', key: 'balance', render: renderAmount, minWidth: 110 },
  { label: '五级分类', key: 'fiveClassify' },
  { label: '最近一次还款日期', key: 'lastRepaymentDate', render: renderDate, minWidth: 130 },
  { label: '最近一次还款总额', key: 'lastRepaymentAmount', minWidth: 130 },
  { label: '最近一次还款形式', key: 'lastRepaymentForm', minWidth: 130 },
  { label: '特定交易提示', key: 'specificTradeTip', minWidth: 110 },
  { label: '信息报告日期', key: 'infoReportDate', render: renderDate, minWidth: 110 },
]
// 未结清借贷-短期借贷
const RDShortColumn = RDLongColumn
// 未结清借贷-循环透支
const RDOverdraftColumn = [
  { label: '账户编号', key: 'accountNum', minWidth: 180 },
  { label: '授信机构', key: 'creditAgency', minWidth: 160 },
  { label: '业务种类', key: 'businessType' },
  { label: '开立日期', key: 'openDate', render: renderDate, minWidth: 90 },
  { label: '到期日', key: 'expireDate', render: renderDate, minWidth: 90 },
  { label: '币种', key: 'currency' },
  { label: '信用额度', key: 'creditAmount', render: renderAmount, minWidth: 110 },
  { label: '发放形式', key: 'distributionForm' },
  { label: '担保形式', key: 'guaranteeForm' },
  { label: '余额', key: 'balance', render: renderAmount, minWidth: 110 },
  { label: '五级分类', key: 'fiveClassify' },
  { label: '逾期总额', key: 'overdueAmount', render: renderAmount, minWidth: 110 },
  { label: '逾期本金', key: 'overduePrincipal', render: renderAmount, minWidth: 110 },
  { label: '逾期月数', key: 'overdueMonth' },
  { label: '最近一次还款日期', key: 'lastRepaymentDate', render: renderDate, minWidth: 130 },
  { label: '最近一次还款总额', key: 'lastRepaymentAmount', render: renderAmount, minWidth: 130 },
  { label: '最近一次还款形式', key: 'lastRepaymentForm', minWidth: 130 },
  { label: '剩余还款月数', key: 'remainingRepaymentMonth', minWidth: 110 },
  { label: '特定交易提示', key: 'specificTradeTip', minWidth: 110 },
  { label: '信息报告日期', key: 'infoReportDate', render: renderDate, minWidth: 110 }
]
export const repaymentDetailConfig = [
  { title: '被迫偿业务', columns: RDForcedColumn, dataSource: [], key: 'companyCreditRecoveredBusinessList' },
  { title: '未结清借贷-欠息', columns: RDInterestColumn, dataSource: [], key: 'companyCreditUnclearedCreditOwedInterestList' },
  { title: '未结清借贷-中长期借贷', columns: RDLongColumn, dataSource: [], key: 'companyCreditUnclearedCreditLoanLongTermList' },
  { title: '未结清借贷-短期借贷', columns: RDShortColumn, dataSource: [], key: 'companyCreditUnclearedCreditLoanShortTermList' },
  { title: '未结清借贷-循环透支', columns: RDOverdraftColumn, dataSource: [], key: 'companyCreditUnclearedCreditCyclicOverdraftList' }
]
