const getApis = (instanceQuiet) => {
  return {
    finance: {
      // --- 基础设置-账户类型管理
      // 账户类型分页查询
      getAccountTypeList: (params) => instanceQuiet.get('/saas-account/v1/account/accounttype/page', { params }),
      // 账户类型（不分页）
      getAccountTypeAllList: (params) => instanceQuiet.get('/saas-account/v1/account/accounttype/getList', { params }),
      // 创建账户类型
      createAccountType: (data) => instanceQuiet.post('/saas-account/v1/account/accounttype/create', data),
      // 更新账户类型
      updateAccountType: (data) => instanceQuiet.post('/saas-account/v1/account/accounttype/update', data),
      // 更新账户类型状态
      updateAccountTypeStatus: (params) => instanceQuiet.get('/saas-account/v1/account/accounttype/updateStatus', { params }),

      // --- 基础设置-产品标签管理
      // 获取标签列表
      getProductSignList: (params) => instanceQuiet.get('/saas-ofc/org/label/page', { params }),
      // 新建产品标签
      createProductSign: (data) => instanceQuiet.post('/saas-ofc/org/label/create', data),
      // 更新产品标签
      updateProductSign: (data) => instanceQuiet.post('/saas-ofc/org/label/update', data),
      // 更新产品标签状态
      updateProductSignStatus: (params) => instanceQuiet.get('/saas-ofc/org/label/updateStatus', { params }),

      // ---- 财务管理-下游账户管理
      // 下游账户管理列表页的统计数据
      getSumAccount: (params) => instanceQuiet.get('/saas-account/v1/account/account/getStatisticsAccountTotalBalanceList', { params }),
      // 下游账户管理列表分页查询
      getPagedAccount: (params) => instanceQuiet.get('/saas-account/v1/account/account/getStatisticsAccountBalancePage', { params }),

      // ---- 财务管理-账户明细
      // 某个经销商的账号明细的列表
      getPagedAccountDetail: (params) => instanceQuiet.get('/saas-ofc/org/accountdetail/page', { params }),
      // 查询某个经销商的各类型账号统计数据
      getAccountDetailSum: (params) => instanceQuiet.get('/saas-account/v1/account/account/getStatisticsAccountBalance', { params }),
      // 查看付款单
      getRepaymentDetail: (params) => instanceQuiet.get('/saas-ofc/org/payment/getPaymentByPaymentSns', { params }),
      // 查看退款单
      getRefundDetail: (params) => instanceQuiet.get('/saas-ofc/org/refund/getRefundByRefundSn', { params }),
      // 查看冻结详情
      getPagedFrozenDetail: (params) => instanceQuiet.get('/saas-account/v1/account/accountjournal/page', { params }),

      // ---- 财务管理-账户配置
      // 获取账户配置列表
      getAccountConfigList: (params) => instanceQuiet.get('/saas-account/v1/account/account/getAccountConfigList', { params }),
      // 开通账号
      openAccount: (params) => instanceQuiet.get('/saas-account/v1/account/account/openAccount', { params }),
      // 更新账户信息，比如禁用、启用
      updateAccountStatus: (params) => instanceQuiet.get('/saas-account/v1/account/account/updateStatus', { params }),
      // 更新账户，比如余额不足时下单
      updateAccount: (data) => instanceQuiet.post('/saas-account/v1/account/account/update', data),

      // ---- 财务管理-出入账管理
      // 创建入账单
      creatEnterBill: (data) => instanceQuiet.post('/saas-ofc/org/inoutbill/createInBill', data),
      // 出入账列表查询
      getBillPaged: (params) => instanceQuiet.get('/saas-ofc/org/inoutbill/page', { params }),
      // 关闭出入账
      closeBill: (params) => instanceQuiet.get('/saas-ofc/org/inoutbill/closeInAOutAccount', { params }),
      // 确认出入账
      sureBill: (params) => instanceQuiet.get('/saas-ofc/org/inoutbill/confirmInAOutAccount', { params }),
      // 查询出入账单详情
      getBillDetail: (params) => instanceQuiet.get('/saas-ofc/org/inoutbill/getDetailByBillNo', { params }),
      // 创建出账单
      creatExpenseBill: (data) => instanceQuiet.post('/saas-ofc/org/inoutbill/createOutBill', data),
      // 账户类型（不分页）（只有启用的账户类型）
      getOpenAccountTypeAllList: (params) => instanceQuiet.get('/saas-account/v1/account/account/getAccountTypeList', { params }),
      // 查询出入账列表页的统计数据
      getEnterExpenseSum: (params) => instanceQuiet.get('/saas-ofc/org/inoutbill/getInOutBillStatistics', { params }),

      // ---- 账务管理-应收管理
      // 应收列表查询
      getPagedReceivables: (data) => instanceQuiet.post('/saas-ofc/org/ofc/income/pageForSumIncome', data),
      // 设置经销商对账周期
      updateReceivableDate: (data) => instanceQuiet.post('/saas-boss/customer/updateReceivableDate', data),
      // 查看某个客户的应收明细
      getPagedReceivablesByCustomer: (data) => instanceQuiet.post('/saas-ofc/org/ofc/income/pageByCustomerId', data),
      // 查看所有客户或某个客户的应收统计信息
      getSumReceivables: (data) => instanceQuiet.post('/saas-ofc/org/ofc/income/sumIncome', data),
      // 查看某一笔应收单详情
      getReceivablesDetail: (params) => instanceQuiet.get('/saas-ofc/org/ofc/income/getDetail', { params }),
      // 查看某一笔应收单详情的基本信息
      getReceivablesBaseInDetail: (data) => instanceQuiet.post('/saas-ofc/org/ofc/income/getDetail', data),
      // 查看某一笔应收单详情的列表数据
      getReceivablesListInDetail: (data) => instanceQuiet.post('/saas-ofc/org/ofc/income/page', data),
      // 应收对账列表查询
      getPagedAccountCheck: (params) => instanceQuiet.get('/saas-ofc/org/customerReceivablebill/page', { params }),
    }
  }
}

export default getApis
