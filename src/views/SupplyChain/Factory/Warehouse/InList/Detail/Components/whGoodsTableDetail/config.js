export const prefixFileUrl = '/saas-ofc/org/goodsAlbum/getAttachment?fileKey='

export const getColumns = (txt) => {
  return [
    { label: '图片', key: 'mainPicPath' },
    { label: '产品名称', key: 'goodsName' },
    { label: '产品型号', key: 'productSn' },
    // { label: '产品属性', key: 'extendData' },
    { label: '产品规格', key: 'specification' },
    { label: '销售单位', key: 'unitName' },
    { label: `${txt}数量`, key: 'goodsQuantity' },
  ]
}
