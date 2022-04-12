import moment from 'moment'
// 融资历程表格
export const financesColumns = [
  { label: '事件日期', key: 'pubTime' },
  { label: '融资轮次', key: 'round' },
  { label: '估值', key: 'money' },
  { label: '投资方', key: 'investorName' },
]
// 股东表格
export const holdersColumns = [
  { label: '股东名称', key: 'name' },
  { label: '持股比例', key: 'percent' },
  { label: '认缴出资额', key: 'amount' },
  { label: '认缴出资日期', key: 'time' },
]
// 高管信息表格
export const mainPersonsColumns = [
  { label: '成员', key: 'name' },
  { label: '职务', key: 'job' },
]
// 企业年报表格
export const reportColumns = [
  { label: '报送年度', key: 'releaseTime' },
  { label: '营业总收入', key: 'totalSales' },
  { label: '净利润', key: 'retainedProfit' },
  { label: '纳税总额', key: 'totalTax' },
  { label: '从业人数', key: 'employeeNum' },
]
// 工商信息表格
export const businessColumns = [
  [
    { label: '法人姓名', key: 'legalPersonName' },
    { label: '经营开始时间', key: 'estiblishTime', render: (row, val) => { return val ? moment(val).format('yyyy-MM-DD') : '-' } },
  ],
  [
    { label: '所属行业', key: 'industry' },
    { label: '注册资本', key: 'regCapital' },
  ],
  [
    { label: '实缴资本', key: 'actualCapital' },
    { label: '参保人数', key: 'socialStaffNum' },
  ],
  [
    { label: '人员规模', key: 'staffNumRange' },
  ],
  [
    { label: '经营范围', key: 'businessScopeMore' },
  ]
]
