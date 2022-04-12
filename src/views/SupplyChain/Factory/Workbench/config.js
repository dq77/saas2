// 快捷入口
export const quickEnterConfig = [
  { title: '新建订单', content: '手工录入新的客户订单', menuTag: 'PTN:SUPPLIER:CHAIN_ORDER:MANAGE', name: 'orderCreate', background: '#E8F0FB', hoverBgName: 'workbench-1', _id: 1, isHover: false },
  { title: '创建发货', content: '根据订单创建发货单', menuTag: 'PTN:SUPPLIER:CHAIN_DELIVER:MANAGE', name: 'deliverOrderList', background: '#FFF8E7', hoverBgName: 'workbench-2', _id: 2, isHover: false },
  { title: '退货管理', content: '查看和处理客户的退货申请', menuTag: 'PTN:SUPPLIER:CHAIN_REVERSE:MANAGE', name: 'reverseOrderList', background: '#EDF8F1', hoverBgName: 'workbench-3', _id: 3, isHover: false },
  { title: '开票管理', content: '查看和处理客户的开票申请', menuTag: 'PTN:SUPPLIER:CHAIN_INVOICING:MANAGE', name: 'billingManage', background: '#E6E5FA', hoverBgName: 'workbench-4', _id: 4, isHover: false },
]

// 任务卡片
export const taskCardConfig = [
  {
    title: '订单',
    handleGroup: [
      {
        key: 'awaitOrderCount',
        renderFn: (num) => `待处理 ${num || 0} 笔`,
        goto: {
          name: 'orderManage',
        }
      }
    ]
  },
  {
    title: '发货单',
    handleGroup: [
      {
        key: 'awaitDeliverOrderCount',
        renderFn: (num) => `待发货 ${num || 0} 笔`,
        goto: {
          name: 'deliveryManage',
        }
      }
    ]
  },
  {
    title: '退货单',
    handleGroup: [
      {
        key: 'awaitReverseOrderCount',
        renderFn: (num) => `待审核 ${num || 0} 笔`,
        goto: {
          name: 'reverseOrderList',
        }
      },
      {
        key: 'awaitConfirmReverseCount',
        renderFn: (num) => `待确认 ${num || 0} 笔`,
        goto: {
          name: 'reverseOrderList',
        }
      }
    ]
  },
  {
    title: '入账单',
    handleGroup: [
      {
        key: 'awaitInCount',
        renderFn: (num) => `待入账 ${num || 0} 笔`,
        goto: {
          name: 'supplyChain_factory_finance_enterAccountList'
        }
      },
      {
        key: 'awaitOutCount',
        renderFn: (num) => `待出账 ${num || 0} 笔`,
        goto: {
          name: 'supplyChain_factory_finance_expenseAccountList'
        }
      }
    ]
  },
  {
    title: '开票申请',
    handleGroup: [
      {
        key: 'awaitInvoiceOrderCount',
        renderFn: (num) => `待处理 ${num || 0} 笔`,
        goto: {
          name: 'billingManage',
        }
      }
    ]
  },
]

// 业务总览
export const businessOverview = [
  { value: '', key: 'orderTotalCount', title: '年度订单总数', unit: '(笔)' },
  { value: '', key: 'orderTotalPrice', title: '年度订单总金额', unit: '(元)' },
  { value: '', key: 'deliverOrderTotalCount', title: '年度发货总笔数', unit: '(元)' },
  { value: '', key: 'deliverOrderTotalPrice', title: '年度发货总金额', unit: '(元)' }
]

// 财务总览
export const financeOverview = [
  { value: '', key: 'sumIncomeNumber', title: '待核销总应收笔数', unit: '(笔)' },
  { value: '', key: 'sumIncomeBalance', title: '待核销应收余额', unit: '(元)' },
  { value: '', key: 'sumCustomer', title: '待核销应收的客户数', unit: '(个)' },
]
// 下游账户总览
export const accountOverview = [
  { value: '', key: 'totalAmountAvailable', title: '总可用余额', unit: '(元)' },
  { value: '', key: 'totalAmountInFreeze', title: '冻结中总金额', unit: '(元)' },
  { value: '', key: 'totalAmountBalance', title: '下游账户总余额', unit: '(元)' },
]

// 本月新增
export const newIncreased = [
  { value: '', key: 'orderCount', title: '本月新增订单数', unit: '(笔)' },
  { value: '', key: 'deliverOrderCount', title: '本月新增发货单数', unit: '(笔)' },
  { value: '', key: 'reverseOrderCount', title: '本月新增退货单数', unit: '(笔)' },
  { value: '', key: 'invoiceOrderCount', title: '本月新增开票申请数', unit: '(笔)' },
  { value: '', key: 'inTotalAmount', title: '本月新增入账金额', unit: '(元)' },
  { value: '', key: 'outTotalAmount', title: '本月新增出账金额', unit: '(元)' }
]
