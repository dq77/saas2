import router from '@/router/index'

export default function () {
  // 点击账户明细
  const clickAccountDetail = (row) => router.push({
    name: 'supplyChain_factory_finance_accountDetail',
    query: {
      customerId: row.customerId,
      customerName: row.customerName
    }
  })
  // 点击账户配置
  const clickAccountConfig = (row) => router.push({
    name: 'supplyChain_factory_finance_accountConfig',
    query: {
      customerId: row.customerId,
      customerName: row.customerName
    }
  })
  // 点击入账管理
  const clickEnterAccount = (row) => router.push({
    name: 'supplyChain_factory_finance_enterAccountList',
    query: {
      customerId: row.customerId,
      customerName: row.customerName
    }
  })
  // 点击出账管理
  const clickExpenseAccount = (row) => router.push({
    name: 'supplyChain_factory_finance_expenseAccountList',
    query: {
      customerId: row.customerId,
      customerName: row.customerName
    }
  })
  return {
    clickAccountDetail,
    clickAccountConfig,
    clickEnterAccount,
    clickExpenseAccount,
  }
}
