import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { normalizeOrderRow } from '@/utils/qjd/supplyChain/tools'
import { transformBaseInfoToDetail, transformProductDataToDetail } from './util'

export default async function ({
  orderId,
  baseInfoRef,
  tableRef,
}) {
  let baseInfo = null
  let productInfo = null

  const { doResult: getBaseInfo } = useAsync({
    init: false,
    params: { id: orderId },
    request: ajaxStore.factory.getOrderBasicInfo,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        baseInfo = transformBaseInfoToDetail(res.data)
        getProductInfo()
      }
    }
  })

  const { doResult: getProductInfo } = useAsync({
    init: false,
    params: { orderId },
    request: ajaxStore.factory.getOrderProductInfo,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data?.length) {
        const tableData = transformProductDataToDetail(res.data)
        tableData.forEach(item => normalizeOrderRow(item))
        productInfo = tableData
        cb()
      }
    }
  })

  const cb = () => {
    baseInfoRef.value[0].initEditBaseInfo(baseInfo)
    tableRef.value[0].initEditTableData(productInfo)
  }

  getBaseInfo()
}
