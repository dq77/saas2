const getApis = (instanceQuiet) => {
  return {
    creditList: params => instanceQuiet.get('/partner/credit/company', { params }),
    orderList: params => instanceQuiet.get('/partner/order/listHead', { params }),
    // 订单查询-产品订货单-查询放款id
    getOrderLoanIds: params => instanceQuiet.get('/partner/order/productOrders', { params }),
    paymentList: params => instanceQuiet.get('/partner/payment/query-page-list', { params }),
    paymentListDetail: params => instanceQuiet.get('/partner/payment/listDetail', { params }),
    orderListDetail: params => instanceQuiet.get('/partner/order/listDetail', { params }),
    getProductList: params => instanceQuiet.get('/partner/order/products', { params }),
    getProduct: orderCode => instanceQuiet.get('/partner/order/products/' + orderCode),
    getRiskList: (params) => instanceQuiet.get('/partner/riskControl/getBasicInfo', { params }),
    getExcludeBlack: (params) => instanceQuiet.get('/partner/riskControl/getExcludeBlack', { params }),
    getCreditApproval: (params) => instanceQuiet.get('/partner/riskControl/getCreditApproval', { params }),
    getProjectApproval: (params) => instanceQuiet.get('/partner/riskControl/getProjectApproval', { params }),
    getSaleSummary: params => instanceQuiet.get('/partner/sale/profile', { params }),
    getQuotaSummary: params => instanceQuiet.get('/partner/sale/quota', { params }),
    getRiskSummary: params => instanceQuiet.get('/partner/risk/overview', { params }),
    getRiskTotalInfo: params => instanceQuiet.get('/partner/risk/view', { params }),
    getTopSummary: params => instanceQuiet.get('/partner/sale/top', { params }),

    getRepayList: (params) => instanceQuiet.get('/partner/repayment/query-page-list', { params }),
    geRepayDetail: (params) => instanceQuiet.get('/partner/repayment/detail-list', { params }),
    auditAudit: params => instanceQuiet.get('/saas-ofc/org/order/advice', { params }),

    white: {
      // 白名单导入列表 /partner/white/getImportPage
      getWhiteList: (params) => instanceQuiet.get('/partner/white/getImportPage', { params }),
      // 取消 /partner/white/cancelTask
      cancelTask: (data) => instanceQuiet.post('/partner/white/cancelTask', data),
      // 提交审核 /partner/white/submitReview
      submitReview: (params) => instanceQuiet.get('/partner/white/submitReview', { params }),
      // 上传确认函任务编号 /partner/white/list/info
      getTasks: (params) => instanceQuiet.get('/partner/white/list/info', { params }),
      // 上传确认函 /partner/white/letter/submit
      submitSure: (data) => instanceQuiet.post('/partner/white/letter/submit', data),
      // 白名单查询列表 /partner/white/getDetailPage
      getSearchList: (params) => instanceQuiet.get('/partner/white/getDetailPage', { params }),
      // 确认或驳回 /partner/white/second/confirm
      decisionHandle: (data) => instanceQuiet.post('/partner/white/second/confirm', data),
      // 查看进度 /partner/white/getWhiteListSchedule
      getProcess: (params) => instanceQuiet.get('/partner/white/getWhiteListSchedule', { params }),

      // 电子确认函签署的验证码
      esignSendMsgNew: data => instanceQuiet.post('/proof/face/sendSignMobileCode', data),
      // 电子确认函签署
      electSign: data => instanceQuiet.post('/partner/white/letter/electSign', data),
      // 电子签确认函预览
      electPreview: (params) => instanceQuiet.get('/partner/white/letter/electPreview', { params }),

      // 修改备注
      modifyRemark: data => instanceQuiet.post('/partner/white/up/infoData', data),
      // 查询某个客户的历史额度列表
      getHistoryCredit: (params) => instanceQuiet.get('/creditx/credit/findBySupplierIdAndCompanyId', { params }),
    },

    // 退款抵扣查询-销售维度
    getLoanDeduction: (params) => instanceQuiet.get('/partner/refund/page/saleOrders', { params }),
    // 退款抵扣查询-退款抵扣维度
    getRefundDeduction: (params) => instanceQuiet.get('/partner/refund/page/deductions', { params }),
    // 退款抵扣-订单抵扣详情
    getRefundOrderFlow: (params) => instanceQuiet.get('/partner/refund/refund/flow', { params }),
    getLoanDeductionInfo: (params) => instanceQuiet.get('/partner/refund/loanDeductionSummary', { params }),
    getRefundDeductionInfo: (params) => instanceQuiet.get('/partner/refund/refundDeductionSummary', { params }),
  }
}

export default getApis
