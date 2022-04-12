// tab导航
export const financeTabs = [
  { label: '主营构成', value: 'mainBusiness' },
  { label: '财务报表', value: 'financeReport' },
]
// 偿债能力
export const industryChartLegend = ['行业分类(亿元)', '累计占比(%)']
export const productChartLegend = ['地区分类(亿元)', '累计占比(%)']
export const areaChartLegend = ['产品分类(亿元)', '累计占比(%)']
// 行业分类
const million_100 = 100000000
const renderMillion_100 = (val) => { return val === 0 ? 0 : (val ? `${(val / million_100).toFixed(2)}` : '-') }
const renderPercent = (val) => { return val === 0 ? 0 : (val ? (val * 100).toFixed(2) : '-') }
export const tableColumns = [
  { label: '行业', key: 'itemName', minWidth: 120 },
  { label: '营业总收入(亿元)', key: 'mainBusinssIncome', minWidth: 120, render: (row, val) => renderMillion_100(val) },
  { label: '收入比例(%)', key: 'mbiRatio', minWidth: 100, render: (row, val) => renderPercent(val) },
  { label: '主营成本(亿元)', key: 'mainBusinssCost', minWidth: 100, render: (row, val) => renderMillion_100(val) },
  { label: '成本比例(%)', key: 'mbcRatio', minWidth: 100, render: (row, val) => renderPercent(val) },
  { label: '主营利润(亿元)', key: 'mainBusinssProfit', minWidth: 100, render: (row, val) => renderMillion_100(val) },
  { label: '利润比例(%)', key: 'mbrRatio', minWidth: 100, render: (row, val) => renderPercent(val) },
  { label: '毛利率(%)', key: 'grossProfitRatio', minWidth: 100, render: (row, val) => renderPercent(val) },
]
// 财务报表
export const reportButtonGroupLists = ['全部', '一季报', '半年报', '三季报', '年报']
export const monthEnums = {
  全部: null,
  一季报: '03',
  半年报: '06',
  三季报: '09',
  年报: '12'
}
// 资产负债摘要表
export const publicTableHeader = [{ label: '财务指标类型', key: 'title', width: 160, fixed: 'left' }]
export const balanceTableList = [
  { title: '流动资产合计', key: 'totalCurrentAssets' },
  { title: '非流动资产合计', key: 'totalNoncurrentAssets' },
  { title: '资产总额', key: 'totalAssets' },
  { title: '流动负债合计', key: 'totalCurrentLiab' },
  { title: '非流动负债合计', key: 'totalNoncurrentLiab' },
  { title: '负债总额', key: 'totalLiabilities' },
  { title: '归属于母公司股东权益', key: 'totalParentEquity' },
  { title: '股东权益合计', key: 'totalEquity' }
]
// 利润表摘要
export const incomeTableList = [
  { title: '营业总收入', key: 'totalOperateIncome' },
  { title: '营业总成本', key: 'totalOperateCost' },
  { title: '营业利润', key: 'operateProfit' },
  { title: '利润总额', key: 'totalProfit' },
  { title: '净利润', key: 'netprofit' },
  { title: '归属于母公司股东的净利润', key: 'parentNetprofit' }
]
// 现金流量表摘要
export const cashFlowTableList = [
  { title: '经营活动产生的现金流量净额', key: 'netcashOperate' },
  { title: '投资活动产生的现金流量净额', key: 'netcashInvest' },
  { title: '筹资活动产生的现金流量净额', key: 'netcashFinance' },
  { title: '期末现金及现金等价物余额', key: 'endCce' }
]
