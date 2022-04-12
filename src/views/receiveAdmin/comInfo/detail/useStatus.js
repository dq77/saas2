import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default ({
  formApis,
  key = 'status'
}) => {
  // ajax
  const { receive: { getStatus } } = ajaxStore
  // 应收总状态
  const { result, doResult } = useAsync({
    request: getStatus,
    successCallBack: res => {
      const { code, data } = res ?? {}
      code === '0' && formApis && formApis.setConfig(key, 'options', data ?? [])
    }
  })

  return {
    result,
    doResult
  }
}
