const regStatus = {
  存续: '存续',
  在营: '在营',
  开业: '开业',
  在册: '在册',
}

export const baseConfig = [
  { key: 'creditCode', label: '统一社会信用代码', },
  { key: 'estiblishTime', label: '成立日期', },
  { key: 'regStatus', label: '经营状态', render: (val) => regStatus[val] },
  { key: 'companyType', label: '公司类型' },
  { key: 'regCapital', label: '注册资本(万)', },
  { key: 'actualCapital', label: '实缴资本(万)', },
  { key: 'time', label: '营业期限', },
  { key: 'regInstitute', label: '登记机关', },
  { key: 'cooperatePeriod', label: '合作年限(年)', },
  { key: 'businessAddressOwnership', label: '经营地址所属', },
  {
    key: 'regLocation', label: '注册地址', // type: 'address', detailKey: 'registAddressDetail'
  },
  {
    key: 'businessAddress', label: '经营地址', render: (val) => val // type: 'address', detailKey: 'mangerAddressDetail'
  },
]

export const columns = [
  { label: '姓名', key: 'name', type: 'text', },
  { label: '持股比例', key: 'capitalPercent', type: 'text' },
  { label: '认缴出资额(万元)', key: 'capitalAmomon', type: 'text', align: 'center' },
  { label: '实缴出资额(万元)', key: 'capitalActlAmomon', type: 'text', align: 'center' },
]
