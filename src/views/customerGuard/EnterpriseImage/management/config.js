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
  { label: '登记时间', key: 'regDate', render: (row, val) => { return row.baseInfo && row.baseInfo.regDate ? row.baseInfo.regDate : '-' } },
  { label: '交易业务类型', key: 'type', render: (row, val) => { return row.baseInfo && row.baseInfo.type ? row.baseInfo.type : '-' } },
  { label: '履行期限', key: 'term', render: (row, val) => { return row.baseInfo && row.baseInfo.term ? row.baseInfo.term : '-' } },
  { label: '登记编号', key: 'regNum', render: (row, val) => { return row.baseInfo && row.baseInfo.regNum ? row.baseInfo.regNum : '-' } },
  { label: '状态', key: 'status', render: (row, val) => { return row.baseInfo && row.baseInfo.status ? row.baseInfo.status : '-' } },
  { label: '当事人', key: 'personList' },
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
// 对外担保
export const externalGuaranteeColumns = [
  { label: '交易日期', key: 'announcementDate', render: (row, val) => { return getTime(row, val) } },
  { label: '担保方', key: 'grntCorpName' },
  { label: '被担保方', key: 'securedOrgName' },
  { label: '担保金额', key: 'grntAmt' },
  { label: '担保类型', key: 'grntType' },
  { label: '是否履行完毕', key: 'isFulfillment' },
]
// 页面所有模块名称
export const pageModuleTitle = [
  { title: '竞争分析', result: false },
  { title: '动产抵押', result: false },
  { title: '股权出质', result: false },
  { title: '行政处罚', result: false },
  { title: '行政许可', result: false },
  { title: '税务评级', result: false },
  { title: '重大税收违法', result: false },
  { title: '欠税', result: false },
  { title: '经营异常', result: false },
  { title: '对外担保', result: false },
]
