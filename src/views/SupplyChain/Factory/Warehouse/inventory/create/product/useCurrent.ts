import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import router from '@/router'
import { Message } from 'element-ui'
import { assetsBaseUrl } from '@/utils/config'
import { toPrefixUrl } from '@/utils/util'
import { uuid } from '@/utils/qjd'

const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')

export default ({
  productApis,
  tableApis,
  props
}) => {
  // ajax
  const { factory: { updateInvenTory, getInvenToryDetail } } = ajaxStore
  // 获取详情 - 接口
  const { loading: detailLoading } = useAsync({
    request: getInvenToryDetail,
    params: { wmStockCheckInfoId: props?.id },
    successCallBack: res => {
      const { code, data } = res ?? {}
      if (code === '0') {
        // 赋值备注
        props.formApis.setFormItem('reason', data?.reason)
        // 处理商品数据
        const dataSource = data?.detailResponses?.map(item => {
          return {
            _id: uuid(),
            id: item?.id,
            mainPicPath: `${downloadUrl}${item?.mainPicPath}`,
            errorUrlKey: `${assetsBaseUrl}/common/alt.png`,
            goodsId: item?.goodsName,
            productSnId: item?.productSn,
            goodsName: item?.goodsName,
            productSn: item?.productSn,
            extendData: item?.extendData?.map(item => {
              return {
                ...item,
                options: [{ id: item?.valueId, name: item?.valueName }]
              }
            }) ?? [],
            specification: item?.specification,
            unitName: item?.unitName,
            nameOptions: [],
            kindOptions: [],
            stockQuantity: item?.stockQuantity,
            realQuantity: item?.realQuantity,
            data: item
          }
        })
        tableApis.resetDataSource(dataSource ?? [])
        productApis.sumHandle()
      }
    }
  })
  // 提交接口
  const { doResult, loading } = useAsync({
    request: updateInvenTory,
    init: false,
    successCallBack: res => {
      if (res?.code === '0') {
        Message.success('保存成功')
        router.push({ name: 'inventory' })
      }
    }
  })
  // 获取提交参数
  const getParams = () => {
    const { formApis: { formData }, warehouseId, id } = props
    const updateDetailRequestList = tableApis.dataSource?.map(item => {
      const { data, extendData, realQuantity, stockQuantity } = item ?? {}
      return {
        id: item?.id,
        realQuantity,
        stockQuantity,
        stockCheckId: id,
        categoryId: data?.categoryId,
        goodsId: data?.goodsId,
        goodsName: data?.goodsName,
        productSn: data?.productSn,
        specification: data?.specification,
        unitName: data?.unitName,
        extendData: extendData?.map(data => {
          const { options, ...others } = data ?? {}
          return others
        })
      }
    })
    return {
      id,
      reason: formData?.reason,
      warehouseId,
      updateDetailRequestList
    }
  }
  // 返回
  const backHandle = () => router.go(-1)
  // 保存
  const sureHandle = () => {
    const { formApis } = props
    formApis.submitHandle().then(val => {
      if (val) {
        if (!tableApis.dataSource.length) return Message.warning('请添加产品')
        const { isError, info } = productApis.validateDatas(tableApis.dataSource)
        if (isError) {
          Message.warning(info)
        } else {
          const params = getParams()
          doResult(params)
        }
      }
    })
  }

  return {
    loading,
    detailLoading,
    backHandle,
    sureHandle
  }
}
