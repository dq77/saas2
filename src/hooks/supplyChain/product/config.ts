import { assetsBaseUrl } from '@/utils/config'
// 默认产品配置
export const getColumns = (remoteMethod: Function) => {
  return [
    { label: '图片', key: 'mainPicPath', type: 'img', imgUrlKey: 'mainPicPath', errorUrlKey: 'errorUrlKey', width: 100 },
    { label: '产品名称', key: 'goodsId', type: 'select', clearable: true, customOption: true, filterable: true, remote: true, optionSpecifier: 'nameOptions', remoteMethod },
    { label: '产品型号', key: 'productSnId', type: 'select', clearable: true, customOption: true, filterable: true, remote: true, optionSpecifier: 'kindOptions', remoteMethod },
    { label: '产品属性', key: 'extendData', width: 200 },
    { label: '产品规格', key: 'specification' },
    { label: '销售单位', key: 'unitName' }
  ]
}

// 默认产品数据
export const defaultDataSample: object = {
  mainPicPath: `${assetsBaseUrl}/common/alt.png`,
  errorUrlKey: `${assetsBaseUrl}/common/alt.png`,
  goodsId: undefined,
  productSnId: undefined,
  extendData: [],
  specification: '',
  unitName: '',
  nameOptions: [],
  kindOptions: [],
  data: {}
}
