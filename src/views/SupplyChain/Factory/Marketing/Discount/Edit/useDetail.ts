import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { transformField } from './util'
import { Ref } from '@vue/composition-api'
interface submitTypes {
  tableRef: Ref;
  createActivityRef: Ref;
  type: string;
  activityId: string | undefined;
}
export default ({
  tableRef,
  createActivityRef,
  type = '',
  activityId = undefined
}: submitTypes) => {
  // ajax
  const { factory: { getActivityDtl, listByGoods } } = ajaxStore
  // methods
  // 获取详情
  if (type) {
    useAsync({
      init: true,
      request: getActivityDtl,
      params: { activityId },
      successCallBack: ({code, data }) => {
        if (code === '0') cb(data)
      }
    })
  }
  // 回填产品数据 回填中文,isFirst为true绑定中文，false绑定英文
  const initTable = (data: any, isFirst: boolean): void => {
    const goodsSimplDetail = transformField(data?.activityGoodsSimplDetailDTOS ?? [], isFirst)
    tableRef.value.initCacheTableData(goodsSimplDetail)
  }
  const cb = (data: any): void => {
    // 拼装活动信息数据
    const dataSource = {
      name: data?.activityResponseDTO?.name ?? '',
      startTime: data?.activityResponseDTO?.startTime ?? '',
      endTime: data?.activityResponseDTO?.endTime ?? '',
      isAllCustomerQualified: data?.activityResponseDTO?.isAllCustomerQualified ?? '',
      customerSimpleDetaiList: data?.customerSimpleDetaiList ?? [], // 经销商列表
      isPurchaseRestricted: data?.discountActivityDetailDTO?.isPurchaseRestricted,
      overRestrictedStrategy: data?.discountActivityDetailDTO?.overRestrictedStrategy,
      restrictedQuantity: data?.discountActivityDetailDTO?.restrictedQuantity
    }
    createActivityRef.value.initEditInfo(dataSource)
    // 拼装产品数据
    if (data?.activityGoodsSimplDetailDTOS?.length) {
      initTable(data, true)
      useAsync({
        request: listByGoods,
        successCallBack: ({ code, data: goodsList }) => {
          if (code === '0') {
            // 获取到产品名称、产品型号所需数据
            const goods = goodsList?.map(item => {
              return {
                value: {
                  goodsId: item.id,
                  goodsName: item.name,
                  mainPicPath: item.mainPicPath,
                  productSn: item.productSn, // 型号
                  specification: item.specification, // 规格
                  unitName: item.unitName,
                  discountRate: undefined
                }
              }
            })
            data.activityGoodsSimplDetailDTOS = data?.activityGoodsSimplDetailDTOS?.map(item => {
              return {
                ...item,
                goodsName: item.goodsId,
                productSn: item.goodsId,
                productOptions: goods
              }
            })
            initTable(data, false)
          }
        }
      })
    }
  }
}
