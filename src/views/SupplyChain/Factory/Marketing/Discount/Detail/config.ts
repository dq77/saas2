export interface infoTypes {
  statusCn: string;
  status: string;
  quantity: number;
  transAmount: number;
  reducedAmount: number;
  particapateCustomerNum: number;
}
export interface formDataTypes {
  name: String;
  startTime: string;
  endTime: string;
  isAllCustomerQualified: string;
  customerSimpleDetaiList: Array<any> | null;
  isPurchaseRestricted: string;
  overRestrictedStrategy: string;
  overRestrictedStrategyCn: string;
  restrictedQuantity: number;
}
export const detailColums: Array<{[key: string]: any}> = [
  { label: '活动状态', key: 'statusCn', color: '#3B68F0' },
  { label: '折扣产品购买数量', key: 'quantity' },
  { label: '折扣产品购买金额', key: 'transAmount', transform: true },
  { label: '优惠总金额', key: 'reducedAmount', transform: true },
  { label: '参与客户数', key: 'particapateCustomerNum' }
]

export const formData: object = {
  name: '',
  startTime: '',
  isPurchaseRestricted: '',
  customerSimpleDetaiList: ''
}
export const formConfig = [
  { type: 'text', key: 'name', label: '活动名称:' },
  { slotName: 'startTime', key: 'startTime', label: '活动时间:' },
  { slotName: 'isPurchaseRestricted', key: 'isPurchaseRestricted', label: '单品限购:' },
  { slotName: 'customerSimpleDetaiList', key: 'customerSimpleDetaiList', label: '活动客户:' },
]

export const columns = [
  { label: '图片', key: 'mainPicPath', minWidth: 125 },
  { label: '产品名称', key: 'name', minWidth: 125 },
  { label: '产品型号', key: 'productSn', minWidth: 125 },
  { label: '销售单位', key: 'unit', minWidth: 80 },
  { label: '规格', key: 'specification', minWidth: 125 },
  { label: '折扣', key: 'discount', minWidth: 80, render: (row, item) => item ? `${item}折` : '- -' }
]
