import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default () => {
  // ajax
  const { factory: { confirmTransfers, closeTransfers } } = ajaxStore
  // 出库 or 入库 - 接口
  const { doResult: confirmHandle, loading: confirmLoding } = useAsync({ request: confirmTransfers, init: false })
  // 关闭
  const { doResult: closeHandle, loading: closeLoading } = useAsync({ request: closeTransfers, init: false })

  return {
    confirmHandle,
    closeHandle,
    confirmLoding,
    closeLoading
  }
}
