export const status = [
  [
    {label: '已开启', value: 1 },
    {label: '已关闭', value: 0 },
  ],
  [
    {label: '允许', value: 1 },
    {label: '不允许', value: 0 },
  ],
  [
    {label: '显示', value: 1 },
    {label: '不显示', value: 0 },
  ]
]

export const list = [
  {
    key: 'isUsed',
    title: '是否启用库存管理',
    info: '开启后，实际业务将会影响产品库存量，包含业务订单、发货以及退货都将会导致库存量的增加或减少；关闭后，实际业务将不会影响库存量的变化。',
  },
  {
    key: 'negativeInventoryFlag',
    title: '是否允许超可用库存量下单',
    info: '开启后，在下单时，不对可用库存量进行验证，可支持负库存下单；关闭后，在下单时，若可用库存量不足，则不允许下单。',
  },
  {
    key: 'isShowQuantity',
    title: '客户下单时是否显示库存数量',
    info: '若选择显示，则在客户下单选中产品后，将会显示产品可用库存量；若选择不显示，则不会显示。',
  }
]
