// 详情产品字段转换成创建对应的字段
export const transformField = (goods: any, isFirst?: boolean): Array<any> => {
  return goods.map(item => {
    return {
      id: item.id || undefined,
      goodsId: item.goodsId || '',
      goodsName: isFirst ? (item.name ?? '') : (item.goodsId ?? ''),
      mainPicPath: item.mainPicPath || '',
      productSn: isFirst ? (item.productSn ?? '') : (item.goodsId ?? ''), // 型号
      specification: item.specification || '', // 规格
      unitName: item.unit || '',
      discountRate: item.discount,
      productOptions: item.productOptions || []
    }
  })
}
