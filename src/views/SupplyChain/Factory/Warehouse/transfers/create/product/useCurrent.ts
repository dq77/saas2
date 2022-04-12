import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import router from '@/router'
import { Message } from 'element-ui'

export default ({
  productApis,
  tableApis,
  props
}) => {
  // ajax
  const { factory: { createTransfers } } = ajaxStore
  // 提交接口
  const { doResult, loading } = useAsync({
    request: createTransfers,
    init: false,
    successCallBack: res => {
      if (res?.code === '0') {
        Message.success('保存成功')
        router.push({ name: 'transfers' })
      }
    }
  })
  // 返回
  const backHandle = () => router.go(-1)
  // 获取提交参数
  const getParams = () => {
    const { formApis: { formData } } = props
    const addDetailRequestList = tableApis.dataSource?.map(item => {
      const { data, extendData, goodsQuantity } = item ?? {}
      return {
        goodsQuantity,
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
      ...formData,
      addDetailRequestList
    }
  }
  // 保存
  const sureHandle = () => {
    const { formApis } = props
    formApis.submitHandle().then(val => {
      if (val) {
        if (!tableApis.dataSource.length) return Message.warning('请添加产品')
        const { isError, info } = productApis.validateDatas(tableApis.dataSource, (item, index) => {
          if (!item.goodsQuantity) {
            return { isError: true, info: `第${index + 1}行调拨数据需大于0` }
          }
        })
        if (isError) {
          Message.warning(info)
        } else {
          const params = getParams()
          doResult(params)
        }
      }
    })
  }
  // 添加新行
  const addHandle = () => {
    const { formApis } = props
    const { formData: { fromWarehouseId } } = formApis
    formApis.validateField('fromWarehouseId')
    if (!fromWarehouseId) return Message.warning('请选择调出仓')
    productApis.addHandle()
  }

  return {
    loading,
    backHandle,
    sureHandle,
    addHandle
  }
}
