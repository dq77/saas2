export const columns = [
  { label: '类型ID', key: 'businessTypeCode', customHeader: 'businessTypeCodeHeader' },
  { label: '业务类型名称', key: 'businessTypeName'},
  { label: '配置营销策略', key: 'ruleConfigIdStr' },
  { label: '操作', key: 'operate', width: 200 },
]

export const dataSample = { ruleConfigIdStr: '', businessTypeName: '', businessTypeCode: '', customType: 'edit', loading: false }
