import moment from 'moment'
const getTime = (row, val) => {
  return val ? moment(new Date(parseFloat(val))).format('yyyy-MM-DD') : '-'
}
// 工商变更
export const changesColumns = [
  { label: '时间', key: 'changeTime' },
  { label: '变更项目', key: 'changeItem' },
  { label: '变更前', key: 'contentBefore' },
  { label: '变更后', key: 'contentAfter' },
]
// 竞争分析
export const competitionAnalysisColumns = [
  { label: '竞争对手', key: 'companyName' },
  { label: '地区', key: 'location' },
  { label: '融资轮次', key: 'round' },
  { label: '成立时间', key: 'date', render: (row, val) => { return getTime(row, val) } },
  { label: '估值', key: 'value' },
]
// 动产抵押
export const chattelMortgageColumns = [
  { label: '登记时间', key: 'regDate', render: (row, val) => { return getTime(row, val) } },
  { label: '交易业务类型', key: 'type' },
  { label: '履行期限', key: 'term' },
  { label: '登记编号', key: 'regNum' },
  { label: '状态', key: 'status' },
  { label: '当事人', key: 'peopleInfo' },
]
// 股权出质
export const equityPledgeColumns = [
  { label: '公示日期', key: 'regDate', render: (row, val) => { return getTime(row, val) } },
  { label: '登记编号', key: 'regNumber' },
  { label: '出质股权数额', key: 'equityAmount' },
  { label: '状态', key: 'state' },
  { label: '当事人', key: 'pledgorList' },
]
// 行政处罚
export const administrativeSanctionColumns = [
  { label: '处罚决定日期', key: 'decisionDate' },
  { label: '处罚事由', key: 'reason' },
  { label: '处罚内容', key: 'content' },
  { label: '处罚决定书文号', key: 'punishNumber' },
  { label: '处罚决定机关', key: 'departmentName' },
]
// 行政许可
export const administrativeLicensingColumns = [
  { label: '许可决定日期', key: 'decisionDate', render: (row, val) => { return getTime(row, val) } },
  { label: '许可事项名称', key: 'licenceName' },
  { label: '许可内容', key: 'licenceContent' },
  { label: '许可机关', key: 'licenceDepartment' },
]
// 税务评级
export const taxRatingColumns = [
  { label: '评价年度', key: 'year' },
  { label: '纳税人识别号', key: 'idNumber' },
  { label: '纳税信用等级', key: 'grade' },
  { label: '评价单位', key: 'evalDepartment' },
]
// 重大税收违法
export const taxViolationColumns = [
  { label: '发布时间', key: 'publish_time' },
  { label: '纳税人名称', key: 'taxpayer_name' },
  { label: '案件性质', key: 'case_type' },
  { label: '所属税务机关', key: 'department' },
]
// 欠税
export const taxArrearsColumns = [
  { label: '发布日期', key: 'publishDate' },
  { label: '税务机关', key: 'department' },
  { label: '识别号', key: 'taxIdNumber' },
  { label: '税种', key: 'type' },
  { label: '金额', key: 'ownTaxAmount' },
]
// 经营异常
export const abnormalOperationColumns = [
  { label: '列入日期', key: 'putDate' },
  { label: '异常原因', key: 'putReason' },
  { label: '决定机关', key: 'putDepartment' },
  { label: '移出日期', key: 'removeDate' },
  { label: '移出原因', key: 'removeReason' },
  { label: '移出机关', key: 'removeDepartment' },
]
// 立案信息
export const courtRegisterColumns = [
  { label: '立案日期', key: 'filingDate', render: (row, val) => { return getTime(row, val) } },
  { label: '案号', key: 'caseNo' },
  { label: '法院', key: 'court' },
  { label: '案由', key: 'caseReason' },
  { label: '当事人', key: 'litigant' },
]
// 开庭公告
export const ktannouncementColumns = [
  { label: '开庭时间', key: 'startDate', render: (row, val) => { return getTime(row, val) } },
  { label: '案号', key: 'caseNo' },
  { label: '法院', key: 'court' },
  { label: '案由', key: 'caseReason' },
  { label: '当事人', key: 'litigant' },
]
// 裁判文书
export const lawSuitColumns = [
  { label: '判决时间', key: 'judgeTime' },
  { label: '标题', key: 'title' },
  { label: '案由', key: 'caseReason' },
  { label: '结果', key: 'casePersons' },
  { label: '涉及给付金额', key: 'caseMoney' },
]
// 失信人
export const dishonestColumns = [
  { label: '立案时间', key: 'regdate', render: (row, val) => { return getTime(row, val) } },
  { label: '案号', key: 'casecode' },
  { label: '失信人名称', key: 'iname' },
  { label: '失信被执行人行为具体情形', key: 'disrupttypename' },
  { label: '履行情况', key: 'performance' },
  { label: '已履行部分', key: 'performedPart' },
]
// 被执行人
export const zhixinginfoColumns = [
  { label: '立案时间', key: 'caseCreateTime', render: (row, val) => { return getTime(row, val) } },
  { label: '案号', key: 'caseCode' },
  { label: '执行标的', key: 'execMoney' },
  { label: '执行法院', key: 'execCourtName' },
]
// 终本案件
export const endCaseColumns = [
  { label: '案号', key: 'caseCode' },
  { label: '执行法院', key: 'execCourtName' },
  { label: '立案日期', key: 'caseCreateTime', render: (row, val) => { return getTime(row, val) } },
  { label: '终本日期', key: 'caseFinalTime', render: (row, val) => { return getTime(row, val) } },
  { label: '执行标的', key: 'execMoney' },
  { label: '未履行标的', key: 'noExecMoney' },
]
// 限制消费令
export const consumptionRestrictionColumns = [
  { label: '案号', key: 'caseCode' },
  { label: '限消人员名称', key: 'xname' },
  { label: '申请执行人', key: 'applicant' },
  { label: '立案日期', key: 'caseCreateTime', render: (row, val) => { return getTime(row, val) } },
  { label: '公示日期', key: 'publishDate', render: (row, val) => { return getTime(row, val) } },
]
// 页面所有模块名称
export const pageModuleTitle = [
  { title: '立案信息', result: false },
  { title: '开庭公告', result: false },
  { title: '裁判文书', result: false },
  { title: '失信人', result: false },
  { title: '被执行人', result: false },
  { title: '终本案件', result: false },
  { title: '限制消费令', result: false },
]
