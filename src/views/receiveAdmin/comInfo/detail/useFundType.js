import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default ({
  formApis,
  key = 'fundType'
}) => {
  // ajax
  const { receive: { getPayInfo } } = ajaxStore
  // 设置款项类型
  const { result, doResult } = useAsync({
    request: getPayInfo,
    params: { dictCategoryCode: 'arm_receivable_accounts', dictStatus: 1 },
    successCallBack: res => {
      const { code, data } = res ?? {}
      code === '0' && formApis.setConfig(key, 'options', data ?? [])
    }
  })

  return {
    result,
    doResult
  }
}
