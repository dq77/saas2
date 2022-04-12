export const publicTableHeader = [{ label: '财务指标类型', key: 'title', width: 160, fixed: 'left' }]
// 资产负债摘要表
export const currentAssetsList = [
  { title: '货币资金', key: 'monetaryfunds' },
  { title: '交易性金融资产', key: 'tradeFinassetNotfvtpl' },
  { title: '衍生金融资产', key: 'deriveFinasset' },
  { title: '应收票据及应收账款', key: 'noteAccountsRece' },
  { title: '其中：应收票据', key: 'noteRece' },
  { title: '应收账款', key: 'accountsRece' },
  { title: '预付款项', key: 'prepayment' },
  { title: '其他应收款合计', key: 'totalOtherRece' },
  { title: '其中：应收利息', key: 'interestRece' },
  { title: '应收股利', key: 'dividendRece' },
  { title: '存货', key: 'inventory' },
  { title: '合同资产', key: 'contractAsset' },
  { title: '其他流动资产', key: 'otherCurrentAsset' },
  { title: '流动资产合计', key: 'totalCurrentAssets' }
]
export const noncurrentAssetsList = [
  { title: '发放贷款及垫款', key: 'loanAdvance' },
  { title: '长期股权投资', key: 'longEquityInvest' },
  { title: '其他权益工具投资', key: 'otherEquityInvest' },
  { title: '其他非流动金融资产', key: 'otherNoncurrentFinasset' },
  { title: '投资性房地产', key: 'investRealestate' },
  { title: '固定资产', key: 'fixedAsset' },
  { title: '在建工程', key: 'cip' },
  { title: '使用权资产', key: 'userightAsset' },
  { title: '无形资产', key: 'intangibleAsset' },
  { title: '商誉', key: 'goodwill' },
  { title: '长期待摊费用', key: 'longPrepaidExpense' },
  { title: '递延所得税资产', key: 'deferTaxAsset' },
  { title: '非流动资产合计', key: 'totalNoncurrentAssets' },
  { title: '资产总计', key: 'totalAssets' }
]
export const currentLiabList = [
  { title: '短期借款', key: 'shortLoan' },
  { title: '衍生金融负债', key: 'shortLoan' },
  { title: '应付票据及应付账款', key: 'noteAccountsPayable' },
  { title: '其中：应付票据', key: 'notePayable' },
  { title: '应付账款', key: 'accountsPayable' },
  { title: '预收款项', key: 'advanceReceivables' },
  { title: '合同负债', key: 'contractLiab' },
  { title: '应付职工薪酬', key: 'staffSalaryPayable' },
  { title: '应交税费', key: 'taxPayable' },
  { title: '其他应付款合计', key: 'totalOtherPayable' },
  { title: '其中：应付利息', key: 'dividendPayable' },
  { title: '应付股利', key: 'dividendPayable' },
  { title: '一年内到期的非流动负债', key: 'noncurrentLiab1year' },
  { title: '其他流动负债', key: 'otherCurrentLiab' },
  { title: '流动负债合计', key: 'totalCurrentLiab' }
]
export const noncurrentLiabList = [
  { title: '长期借款', key: 'longLoan' },
  { title: '应付债券', key: 'bondPayable' },
  { title: '租赁负债', key: 'leaseLiab' },
  { title: '递延收益', key: 'deferIncome' },
  { title: '递延所得税负债', key: 'deferTaxLiab' },
  { title: '非流动负债合计', key: 'totalNoncurrentLiab' },
  { title: '负债合计', key: 'totalLiabilities' },
]
export const equityList = [
  { title: '实收资本（或股本）', key: 'shareCapital' },
  { title: '其他权益工具', key: 'otherEquityTool' },
  { title: '其中：永续债', key: 'perpetualBond' },
  { title: '资本公积', key: 'capitalReserve' },
  { title: '其他综合收益', key: 'otherCompreIncome' },
  { title: '盈余公积', key: 'surplusReserve' },
  { title: '未分配利润', key: 'unassignRpofit' },
  { title: '归属于母公司股东权益总计', key: 'totalParentEquity' },
  { title: '少数股东权益', key: 'minorityEquity' },
  { title: '股东权益合计', key: 'totalEquity' },
  { title: '负债和股东权益总计', key: 'totalLiabEquity' }
]

// 利润表摘要
// attr 一级 二级菜单
export const incomeTableList = [
  { title: '营业总收入', key: 'totalOperateIncome' },
  { title: '营业总成本', key: 'totalOperateCost' },
  { title: '营业成本', key: 'operateCost' },
  { title: '税金及附加', key: 'operateTaxAdd' },
  { title: '期间费用', key: '', attr: 'first' },
  { title: '销售费用', key: 'saleExpense', attr: 'seccond' },
  { title: '管理费用', key: 'manageExpense', attr: 'seccond' },
  { title: '研发费用', key: 'researchExpense', attr: 'seccond' },
  { title: '财务费用', key: 'financeExpense', attr: 'seccond' },
  { title: '其他经营收益', key: '', attr: 'first' },
  { title: '其他收益', key: 'otherIncome', attr: 'seccond' },
  { title: '投资收益', key: 'investIncome', attr: 'seccond' },
  { title: '公允价值变动收益', key: 'fairvalueChangeIncome', attr: 'seccond' },
  { title: '信用减值损失', key: 'creditImpairmentIncome', attr: 'seccond' },
  { title: '资产减值损失', key: 'assetImpairmentIncome', attr: 'seccond' },
  { title: '资产处置收益', key: 'assetDisposalIncome', attr: 'seccond' },
  { title: '营业利润', key: 'operateProfit' },
  { title: '加：营业外收入', key: 'nonbusinessIncome' },
  { title: '减：营业外支出', key: 'nonbusinessExpense' },
  { title: '利润总额', key: 'totalProfit' },
  { title: '减：所得税费用', key: 'incomeTax' },
  { title: '净利润', key: 'netprofit' }
]
// 现金流量表摘要
export const operateTableList = [
  { title: '销售商品、提供劳务收到的现金', key: 'salesServices' },
  { title: '收到其他与经营活动有关的现金', key: 'receiveOtherOperate' },
  { title: '经营活动现金流入小计', key: 'totalOperateInflow' },
  { title: '购买商品、接受劳务支付的现金', key: 'buyServices' },
  { title: '支付给职工以及为职工支付的现金', key: 'payStaffCash' },
  { title: '支付的各项税费', key: 'payAllTax' },
  { title: '支付其他与经营活动有关的现金', key: 'payOtherOperate' },
  { title: '经营活动现金流出小计', key: 'totalOperateOutflow' },
  { title: '经营活动产生的现金流量净额', key: 'netcashOperate' }
]
export const investTableList = [
  { title: '收回投资收到的现金', key: 'withdrawInvest' },
  { title: '取得投资收益收到的现金', key: 'receiveInvestIncome' },
  { title: '处置固定资产、无形资产和其他长期资产收回的现金净额', key: 'disposalLongAsset' },
  { title: '处置子公司及其他营业单位收到的现金', key: 'disposalSubsidiaryOther' },
  { title: '收到的其他与投资活动有关的现金', key: 'receiveOtherInvest' },
  { title: '投资活动现金流入小计', key: 'totalInvestInflow' },
  { title: '购建固定资产、无形资产和其他长期资产支付的现金', key: 'constructLongAsset' },
  { title: '投资支付的现金', key: 'investPayCash' },
  { title: '取得子公司及其他营业单位支付的现金净额', key: 'obtainSubsidiaryOther' },
  { title: '支付其他与投资活动有关的现金', key: 'payOtherInvest' },
  { title: '投资活动现金流出小计', key: 'totalInvestOutflow' },
  { title: '投资活动产生的现金流量净额', key: 'netcashInvest' }
]
export const financeTableList = [
  { title: '吸收投资收到的现金', key: 'acceptInvestCash' },
  { title: '其中：子公司吸收少数股东投资收到的现金', key: 'subsidiaryAcceptInvest' },
  { title: '取得借款收到的现金', key: 'receiveLoanCash' },
  { title: '发行债券收到的现金', key: 'issueBond' },
  { title: '筹资活动现金流入小计', key: 'totalFinanceInflow' },
  { title: '偿还债务所支付的现金', key: 'payDebtCash' },
  { title: '分配股利、利润或偿付利息支付的现金', key: 'assignDividendPorfit' },
  { title: '其中：子公司支付给少数股东的股利、利润', key: 'subsidiaryPayDividend' },
  { title: '支付的其他与筹资活动有关的现金', key: 'payOtherFinance' },
  { title: '筹资活动现金流出的其他项目', key: 'financeOutflowOther' },
  { title: '筹资活动现金流出小计', key: 'totalFinanceOutflow' },
  { title: '筹资活动产生的现金流量净额', key: 'netcashFinance' },
  { title: '汇率变动对现金及现金等价物的影响', key: 'rateChangeEffect' },
  { title: '现金及现金等价物净增加额', key: 'cceAdd' },
  { title: '加：期初现金及现金等价物余额', key: 'beginCce' },
  { title: '期末现金及现金等价物余额', key: 'endCce' }
]
export const replenishTableList = [
  { title: '净利润', key: 'netprofit' },
  { title: '资产减值准备', key: 'assetImpairment' },
  { title: '固定资产和投资性房地产折旧', key: 'faIrDepr' },
  { title: '无形资产摊销', key: 'iaAmortize' },
  { title: '处置固定资产、无形资产和其他长期资产的损失', key: 'disposalLongassetLoss' },
  { title: '公允价值变动损失', key: 'fairvalueChangeLoss' },
  { title: '财务费用', key: 'financeExpense' },
  { title: '投资损失', key: 'investLoss' },
  { title: '递延所得税', key: 'deferTax' },
  { title: '其中：递延所得税资产减少', key: 'dtAssetReduce' },
  { title: '递延所得税负债增加', key: 'dtLiabAdd' },
  { title: '存货的减少', key: 'inventoryReduce' },
  { title: '经营性应收项目的减少', key: 'operateReceReduce' },
  { title: '经营性应付项目的增加', key: 'operatePayableAdd' },
  { title: '经营活动产生的现金流量净额其他项目', key: 'operateNetcashOthernote' },
  { title: '经营活动产生的现金流量净额', key: 'netcashOperatenote' },
  { title: '现金的期末余额', key: 'endCash' },
  { title: '减：现金的期初余额', key: 'beginCash' },
  { title: '现金及现金等价物的净增加额', key: 'cceAddnote' }
]
