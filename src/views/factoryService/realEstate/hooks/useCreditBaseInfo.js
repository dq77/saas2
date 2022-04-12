import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { getCreditCompanyBase } = ajaxStore.factoryService.realEstate

  // 接口
  const { loading, doResult, result } = useAsync({
    request: getCreditCompanyBase,
    init: false
  })

  return {
    loading,
    doResult,
    result
  }
}
