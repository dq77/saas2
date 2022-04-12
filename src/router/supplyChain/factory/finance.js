// 应收管理列表页
const ReceivablesList = () => import('@/views/SupplyChain/Factory/Finance/receivables/receivablesList/index')
// 应收账簿列表页
const ReceivablesBookList = () => import('@/views/SupplyChain/Factory/Finance/receivables/receivablesBookList/index')
// 应收详情
const ReceivablesDetail = () => import('@/views/SupplyChain/Factory/Finance/receivables/receivablesDetail/index')
// 收款单
const ReceiptDetail = () => import('@/views/SupplyChain/Factory/Finance/receivables/receiptDetail/index')
// 应收对账列表页
const AccountCheckList = () => import('@/views/SupplyChain/Factory/Finance/receivables/accountCheckList/index')

// 账户管理列表
const AccountList = () => import('@/views/SupplyChain/Factory/Finance/accountManage/accountList/index')
// 账户明细
const AccountDetail = () => import('@/views/SupplyChain/Factory/Finance/accountManage/accountDetail/index')
// 账户配置
const AccountConfig = () => import('@/views/SupplyChain/Factory/Finance/accountManage/accountConfig/index')
// 入账管理列表
const EnterAccountList = () => import('@/views/SupplyChain/Factory/Finance/accountManage/enterAccountList/index')
// 登记入账 入账单
const EnterAccount = () => import('@/views/SupplyChain/Factory/Finance/accountManage/enterAccount/index')
// 出账管理列表
const ExpenseAccountList = () => import('@/views/SupplyChain/Factory/Finance/accountManage/expenseAccountList/index')
// 登记入账 出账单
const ExpenseAccount = () => import('@/views/SupplyChain/Factory/Finance/accountManage/expenseAccount/index')
// 付款单
const PaymentDetail = () => import('@/views/SupplyChain/Factory/Finance/accountManage/paymentDetail/index')
// 退款单
const RefundDetail = () => import('@/views/SupplyChain/Factory/Finance/accountManage/refundDetail/index')
// 冻结中详情
const FrozenDetail = () => import('@/views/SupplyChain/Factory/Finance/accountManage/frozenDetail/index')

const pages = [
  { path: 'finance/receivables/receivablesList', name: 'supplyChain_factory_finance_receivablesList', components: { default: ReceivablesList }, meta: { menuTag: 'supply_chain_account_checking', hasMenuTag: true, crumbs: ['订货大师', '应收管理'] } },
  { path: 'finance/receivables/receivablesBookList', name: 'supplyChain_factory_finance_receivablesBookList', components: { default: ReceivablesBookList }, meta: { menuTag: 'supply_chain_account_checking', crumbs: ['订货大师', '应收管理', '应收账簿'] } },
  { path: 'finance/receivables/receivablesDetail', name: 'supplyChain_factory_finance_receivablesDetail', components: { default: ReceivablesDetail }, meta: { menuTag: 'supply_chain_account_checking', crumbs: ['订货大师', '应收管理', '应收账簿', '应收详情'] } },
  { path: 'finance/receivables/receiptDetail', name: 'supplyChain_factory_finance_receiptDetail', components: { default: ReceiptDetail }, meta: { menuTag: 'supply_chain_account_checking', crumbs: ['订货大师', '应收管理', '收款单'] } },
  { path: 'finance/receivables/accountCheckList', name: 'supplyChain_factory_finance_accountCheckList', components: { default: AccountCheckList }, meta: { menuTag: 'supply_chain_account_checking', crumbs: ['订货大师', '应收管理', '应收对账'] } },
  { path: 'finance/accountManage/accountList', name: 'supplyChain_factory_finance_accountList', components: { default: AccountList }, meta: { menuTag: 'supply_chain_account', hasMenuTag: true, crumbs: ['订货大师', '下游账户管理'] } },
  { path: 'finance/accountManage/accountDetail', name: 'supplyChain_factory_finance_accountDetail', components: { default: AccountDetail }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '账户明细'] } },
  { path: 'finance/accountManage/accountConfig', name: 'supplyChain_factory_finance_accountConfig', components: { default: AccountConfig }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '账户配置'] } },
  { path: 'finance/accountManage/enterAccountList', name: 'supplyChain_factory_finance_enterAccountList', components: { default: EnterAccountList }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '入账管理'] } },
  { path: 'finance/accountManage/enterAccount', name: 'supplyChain_factory_finance_enterAccount', components: { default: EnterAccount }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '入账管理', '入账登记'] } },
  { path: 'finance/accountManage/enterAccountDetail', name: 'supplyChain_factory_finance_enterAccountDetail', components: { default: EnterAccount }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '入账管理', '入账登记详情'] } },
  { path: 'finance/accountManage/expenseAccountList', name: 'supplyChain_factory_finance_expenseAccountList', components: { default: ExpenseAccountList }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '出账管理'] } },
  { path: 'finance/accountManage/expenseAccount', name: 'supplyChain_factory_finance_expenseAccount', components: { default: ExpenseAccount }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '出账管理', '出账登记'] } },
  { path: 'finance/accountManage/expenseAccountDetail', name: 'supplyChain_factory_finance_expenseAccountDetail', components: { default: ExpenseAccount }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '出账管理', '出账登记详情'] } },
  { path: 'finance/accountManage/paymentDetail', name: 'supplyChain_factory_finance_paymentDetail', components: { default: PaymentDetail }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '账户明细', '付款单'] } },
  { path: 'finance/accountManage/refundDetail', name: 'supplyChain_factory_finance_refundDetail', components: { default: RefundDetail }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '账户明细', '退款单'] } },
  { path: 'finance/accountManage/frozenDetail', name: 'supplyChain_factory_finance_frozenDetail', components: { default: FrozenDetail }, meta: { menuTag: 'supply_chain_account', crumbs: ['订货大师', '下游账户管理', '账户明细', '冻结中详情'] } },
]

export default pages
