import moment from 'moment'
// 企业速览-股东表格字段
export const holdersColumns = [
  { label: '股东名称', key: 'name' },
  { label: '持股比例', key: 'percent' },
]
// 企业速览-基本信息
export const baseColumns = [
  { label: '法人代表', key: 'legalPersonName' },
  { label: '注册资本', key: 'regCapital' },
  { label: '登记状态', key: 'regStatus' },
  { label: '所属行业', key: 'industry' },
  { label: '成立日期', key: 'estiblishTime', render: (val) => { return val ? moment(val).format('yyyy-MM-DD') : '-' } },
  { label: '所属集团', key: '' },
]
