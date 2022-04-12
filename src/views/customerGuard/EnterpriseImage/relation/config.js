import moment from 'moment'
// tab导航
export const relationTabs = [
  { label: '股东（多层级）', value: 'shareholder' },
  { label: '投资（多层级）', value: 'investment' },
  { label: '历史股东', value: 'historyShareholder' },
  { label: '历史投资', value: 'historyInvestment' },
  { label: '兄弟公司', value: 'brotherCompany' },
  { label: '分支机构', value: 'branch' },
  { label: '周边风险', value: 'peripheralRisk' },
]
// 股东（多层级）
export const investmentColumns = [
  { label: '名称', key: 'name' },
  { label: '投资层级', key: 'level' },
  { label: '穿透持股比', key: 'percent', render: (row, val) => { return val ? (val * 100).toFixed(2) + '%' : '-' } },
]
// 投资（多层级）
export const shareholderColumns = [
  { label: '名称', key: 'name' },
  { label: '股东层级', key: 'level' },
  { label: '穿透持股比', key: 'percent', render: (row, val) => { return val ? (val * 100).toFixed(2) + '%' : '-' } },
]
// 历史股东
export const historyShareholderColumns = [
  { label: '名称', key: 'name' },
  { label: '入股时间', key: 'startTime' },
  { label: '退出时间', key: 'endTime' },
  { label: '股权占比', key: 'capital', render: (row, val) => { return val && val.length ? val[0].percent : '- -' } },
]
// 历史投资
export const historyInvestmentColumns = [
  { label: '名称', key: 'name' },
  { label: '入股金额', key: 'amount' },
  { label: '注册资本', key: 'regCapital' },
  { label: '成立日期', key: 'estiblishTime', render: (row, val) => { return val ? moment(val).format('yyyy-MM-DD') : '- -' } },
  { label: '行业', key: 'category' },
]
// 分支机构
export const branchColumns = [
  { label: '公司名称', key: 'name' },
  { label: '开业时间', key: 'estiblishTime', render: (row, val) => { return val ? moment(val).format('yyyy-MM-DD') : '- -' }, width: 120 },
  { label: '开业状态', key: 'regStatus', width: 120 },
  { label: '注册资金', key: 'regCapital' },
  { label: '省份简称', key: 'base', width: 100 },
]
// 兄弟公司
export const brotherColumns = [
  { label: '名称', key: 'name' },
  { label: '母公司控制权', key: 'percent', render: (row, val) => { return val ? (val * 100).toFixed(2) + '%' : '-' } },
]
