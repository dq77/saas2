import { toAmountStr } from '@/utils/util'

export const develiverOrderStatus = {
  1: '已审核',
  2: '进行中',
}
export const develiverStatus = {
  '-1': '待发货',
  0: '待签收',
  1: '已签收',
  2: '开票中',
  3: '已开票',
  99: '已关闭',
}
export const deliverModuleColumns = [
  { label: '发货单号', key: 'deliverSn' },
  { label: '订单号', key: 'orderSn' },
  { label: '发货时间', key: 'deliverTime' },
  { label: '客户', key: 'customerName' },
  { label: '发货总金额', key: 'deliveryAmount', align: 'right', render: (row, key) => row.deliveryAmount ? `¥${toAmountStr(row.deliveryAmount, 2, true)}` : '--'},
  { label: '业务员', key: 'createByName' },
  { label: '发货单状态', key: 'receiptStatus', render: (row, key) => develiverStatus[row.receiptStatus] },
  { label: '承运商名称', key: 'logisticsCompany' },
  { label: '物流单号', key: 'logisticsCode' },
  {
    label: '操作',
    key: 'operate',
    width: '180px',
    options: [
      { label: '查看'},
      { label: '编辑', render: (row) => row.receiptStatus === -1 ? '编辑' : ''},
      { label: '关闭', render: (row) => row.receiptStatus === -1 ? '关闭' : ''},
      { label: '确认发货', render: (row) => row.receiptStatus === -1 ? '确认发货' : ''}
    ]
  },
]
export const deliverModuleFormConfig = (remoteMethod) => {
  return [
    { type: 'input', key: 'deliverSn', label: '发货单号', span: 6},
    { type: 'input', key: 'orderSn', label: '订单号', span: 6},
    {
      type: 'select',
      key: 'customerId',
      label: '客户名称',
      filterable: true,
      span: 6,
      remote: true,
      otherKeys: { label: 'customerName', value: 'id' },
      remoteMethod,
      options: []
    },
    { type: 'select', key: 'receiptStatus', label: '发货单状态', span: 6, options: Object.keys(develiverStatus).map(key => ({ label: develiverStatus[key], value: key })) },
  ]
}
export const deliverOrderColumns = [
  { label: '订单号', key: 'orderSn' },
  { label: '项目', key: 'projectName' },
  { label: '客户', key: 'customerName' },
  { label: '业务员', key: 'salesMan' },
  { label: '总金额', key: 'payAmount', render: (row, key) => row.payAmount ? `¥${toAmountStr(row.payAmount, 2, true)}` : '--'},
  { label: '订单状态', key: 'status', render: (row, key) => develiverOrderStatus[key]},
  { label: '订单创建时间', key: 'createdTime' },
  {
    label: '操作',
    key: 'operate',
    options: [
      { label: '新建发货'},
    ]
  },
]
export const deliverOrderFormConfig = (remoteMethod) => {
  return [
    { type: 'input', key: 'orderSn', label: '订单号', span: 6},
    { type: 'input', key: 'projectName', label: '项目名称', span: 6},
    {
      type: 'select',
      key: 'customerId',
      label: '客户名称',
      filterable: true,
      span: 6,
      remote: true,
      otherKeys: { label: 'customerName', value: 'id' },
      remoteMethod,
      options: []
    },
    { type: 'select', key: 'status', label: '订单状态', span: 6, options: Object.keys(develiverOrderStatus).map(key => ({ label: develiverOrderStatus[key], value: key })) },
  ]
}
export const develiverProductColumns = [
  { label: '商品', key: 'deliverProduct', minWidth: 120 },
  { label: '单价', key: 'price', render: (row, key) => row.price ? `¥${toAmountStr(row.price, 2, true)}` : '--' },
  { label: '附加费(单价)', key: 'addCostPriceList'},
  { label: '未发货数量', key: 'noDeliverCount', render: (row, key) => row.noDeliverCount ? `${row.noDeliverCount} ${row.unitName}` : 0 },
  { label: '未发货金额', key: 'noDeliverTotalPrice', render: (row, key) => row.noDeliverTotalPrice ? `¥${toAmountStr(row.noDeliverTotalPrice, 2, true)}` : 0},
  // { label: '库存数量', key: 'warehouseQuantity'},
  { label: '本次发货数量', key: 'currentDeliverCount', width: '250px'},
  { label: '本次发货总价', key: 'currentDeliverTotalPrice', render: (row, key) => row.currentDeliverTotalPrice ? `¥${toAmountStr(row.currentDeliverTotalPrice, 2, true)}` : '--'},
  { label: '剩余应发总价', key: 'residueTotalPrice', render: (row, key) => row.residueTotalPrice ? `¥${toAmountStr(row.residueTotalPrice, 2, true)}` : '--'},
]

export const develiverDetailProductColumns = [
  { label: '商品', key: 'deliverProduct' },
  { label: '单价', key: 'price', render: (row, key) => row.price ? `¥${toAmountStr(row.price, 2, true)}` : '--' },
  { label: '附加费(单价)', key: 'addCostPriceList'},
  { label: '发货数量', key: 'deliverQuantity', render: (row, key) => row.deliverQuantity ? `${row.deliverQuantity} ${row.unitName}` : 0 },
  // { label: '发货总价', key: 'deliverPrice', render: (row, key) => row.deliverPrice ? `¥${toAmountStr(row.deliverPrice, 2, true)}` : 0},
  { label: '发货总价', key: 'deliverPrice', align: 'right'},
]
const areaProps = {
  value: 'code',
  label: 'name',
}
export const deliverInfoFormConfig = [
  { type: 'input', key: 'receiptPerson', label: '收货人', span: 12, clearable: true },
  { type: 'input', key: 'receiptPhone', label: '收货电话', span: 12, clearable: true },
  { type: 'cascader', key: 'receiptAddress', label: '收货地址', options: [], props: areaProps, span: 24, render: (row) => row.province + row.city + row.area, clearable: true },
  { type: 'input', key: 'address', label: '详细地址', span: 24, clearable: true },
  { type: 'select', key: 'logisticsCompany', label: '物流公司', span: 12, otherKeys: { label: 'dictName', value: 'dictCode' }, options: [], clearable: true },
  { type: 'input', key: 'logisticsCode', label: '物流单号', span: 12, clearable: true },
  { type: 'inputNumber', key: 'logisticsAmount', label: '物流费总额（元）', precision: 2, step: 0.1, min: 0, span: 12},
  { type: 'select', key: 'warehouseId', label: '发货仓库', options: [], otherKeys: { label: 'name', value: 'id' }, span: 12, clearable: true, isHidden: true, slotName: 'warehouseId', width: '80%' },
  { type: 'text', key: 'warehouseName', label: '发货仓库', span: 12, clearable: true, isHidden: true },
  { type: null, key: 'fileArrayList', label: '资料上传', span: 24, slotName: 'fileList', isHidden: true },
  { type: 'input', kind: 'textarea', key: 'remarkContent', label: '备注', span: 24, ploaceholder: '产品描述' },
]
export const deliverInfoFormData = {
  receiptPerson: undefined,
  receiptPhone: undefined,
  receiptAddress: undefined,
  address: undefined,
  logisticsCompany: undefined,
  logisticsCode: undefined,
  deliveryAmount: undefined,
  remarkContent: undefined,
  warehouseId: undefined,
  warehouseName: undefined,
}
export const cformRules = {
  receiptPerson: [
    { required: true, message: '请输入收货人', trigger: 'blur' }
  ],
  receiptPhone: [
    { required: true, message: '请输入收货电话', trigger: 'blur' }
  ],
  receiptAddress: [
    { required: true, message: '请选择收货地址', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ],
  warehouseId: [
    { required: true, message: '请选择发货仓库' }
  ],
}

export const collapseItems = [
  { key: 'a1', label: '发货信息' },
  { key: 'a2', label: '货物明细' },
]
