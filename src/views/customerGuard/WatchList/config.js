// list form & table
export const lFormData = {
  companyName: undefined,
  address: undefined,
  provinceName: undefined
}
export const lGetFormConfig = [
  {
    type: 'input',
    key: 'companyName',
    label: '企业名称',
    clearable: true
  },
  {
    type: 'cascader',
    key: 'address',
    label: '省区',
    options: [],
    props: { label: 'name', value: 'name' },
    clearable: true
  }
]
export const lCollectionColumns = [
  { label: '企业名称', key: 'companyName' },
  { label: '省区', key: 'provinceName' },
  { label: '新闻舆情配置', key: 'news', slotName: 'news' },
  { label: '操作', key: 'operate', slotName: 'operate', width: 130 }
]
